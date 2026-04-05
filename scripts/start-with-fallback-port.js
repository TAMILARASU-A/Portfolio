const net = require("node:net");
const { spawn } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

const DEFAULT_PORT = Number(process.env.PORT || 3000);
const MAX_ATTEMPTS = 20;
const NEXT_COMMAND = process.argv[2] || "start";
const VALID_COMMANDS = new Set(["dev", "start"]);

function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();

        server.once("error", () => resolve(false));

        server.once("listening", () => {
            server.close(() => resolve(true));
        });

        server.listen(port, "::");
    });
}

async function findAvailablePort(startPort) {
    for (let offset = 0; offset < MAX_ATTEMPTS; offset += 1) {
        const candidate = startPort + offset;
        const available = await isPortAvailable(candidate);
        if (available) {
            return candidate;
        }
    }

    return 0;
}

function hasProductionBuild() {
    return fs.existsSync(path.join(process.cwd(), ".next", "BUILD_ID"));
}

function runNextCommand(command, args, envOverrides = {}) {
    return new Promise((resolve, reject) => {
        const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
        const child = spawn(process.execPath, [nextBin, command, ...args], {
            stdio: "inherit",
            shell: false,
            env: {
                ...process.env,
                ...envOverrides,
            },
        });

        child.on("exit", (code, signal) => {
            if (signal) {
                reject(new Error(`Next.js ${command} was terminated by signal ${signal}`));
                return;
            }

            if (code === 0) {
                resolve();
                return;
            }

            reject(new Error(`Next.js ${command} exited with code ${code ?? 1}`));
        });

        child.on("error", reject);
    });
}

async function main() {
    if (!VALID_COMMANDS.has(NEXT_COMMAND)) {
        console.error(`Invalid Next.js command: ${NEXT_COMMAND}. Use \"dev\" or \"start\".`);
        process.exit(1);
    }

    if (NEXT_COMMAND === "start") {
        if (hasProductionBuild()) {
            console.log("Refreshing production build before start...");
        } else {
            console.log("No production build found. Running next build first...");
        }
        await runNextCommand("build", []);
    }

    const port = await findAvailablePort(DEFAULT_PORT);
    if (!port) {
        throw new Error(
            `No available ports found between ${DEFAULT_PORT} and ${DEFAULT_PORT + MAX_ATTEMPTS - 1}`
        );
    }

    if (port !== DEFAULT_PORT) {
        console.log(`Port ${DEFAULT_PORT} is in use. Starting Next.js ${NEXT_COMMAND} on port ${port} instead.`);
    }

    const envOverrides = NEXT_COMMAND === "dev"
        ? { NEXT_DIST_DIR: `.next-dev-${port}` }
        : {};

    await runNextCommand(NEXT_COMMAND, ["-p", String(port)], envOverrides);
}

main().catch((error) => {
    console.error("Failed to start Next.js server:", error);
    process.exit(1);
});
