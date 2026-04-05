import fs from "node:fs";
import path from "node:path";

const DEFAULT_GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
];

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const ALLOW_GEMINI_FALLBACK = process.env.ALLOW_GEMINI_FALLBACK === "true";
const MIN_QUOTA_BACKOFF_MS = 30000;
let quotaBackoffUntil = 0;

function getRetryDelayMs(errorPayload) {
  const message = errorPayload?.error?.message || "";
  const match = message.match(/Please retry in\s+([\d.]+)s/i);
  if (!match) {
    return MIN_QUOTA_BACKOFF_MS;
  }
  const seconds = Number(match[1]);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return MIN_QUOTA_BACKOFF_MS;
  }
  return Math.max(Math.ceil(seconds * 1000), MIN_QUOTA_BACKOFF_MS);
}

function buildPortfolioContext() {
  try {
    const heroSource = fs.readFileSync(
      path.join(process.cwd(), "components/Hero.jsx"),
      "utf8"
    );
    const skillSource = fs.readFileSync(
      path.join(process.cwd(), "components/SkillGlobe.jsx"),
      "utf8"
    );
    const timelineSource = fs.readFileSync(
      path.join(process.cwd(), "components/MiniTimeline.jsx"),
      "utf8"
    );
    const homeSource = fs.readFileSync(
      path.join(process.cwd(), "pages/index.jsx"),
      "utf8"
    );

    return `
You are Tamilarasu A's portfolio chatbot. Answer ONLY questions about Tamilarasu's portfolio, skills, education, projects, and achievements. 

PORTFOLIO DATA:
- Name: Tamilarasu A
- Current: MCA Graduate (May 2026) from Coimbatore Institute of Technology (CIT)
- Roles: MCA Graduate, Python Developer, AI Enthusiast, Software Developer, Building AI-Integrated Applications
- Education:
  * SSLC (2018-2019): Kumutha Matriculation Higher Secondary School, Erode - 76.2%
  * HSC (2020-2021): Kumutha Matriculation Higher Secondary School, Erode - 83.6%
  * BCA (2021-2024): Gobi Arts and Science College, Gobichettipalayam - CGPA: 7.6 - Achievement: Proficiency in BCA for academic excellence
  * MCA (2024-May 2026): Coimbatore Institute of Technology, Coimbatore - CGPA: 7.76 (Completed)
  * Internship (Dec 2025-May 2026): Application Development and Support - ARGA Investment Management (India) Private Limited, Chennai (On-site)

- Skills: Python, Java, C, React, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, MySQL, MongoDB, Flask, Django, Node.js, Git, GitHub, PyCharm, Vercel, Firebase, PyTorch, TensorFlow, NumPy, Pandas

- Projects:
  * InterviewXpert - AI Interview Helper (Python, Kivy)
  * Personal Book Recommender - AI-powered reading system (Python, Flask)

- About: I am Tamilarasu A — MCA Graduate (May 2026), Python Developer, and AI Enthusiast. I love building intelligent apps, designing beautiful UI, and solving real-world problems with modern technologies.

- Links:
  * LinkedIn: https://www.linkedin.com/in/tamilarasu-a-74b936287/
  * GitHub: https://github.com/TAMILARASU-A
  * LeetCode: https://leetcode.com/u/Tamilarasu__A/
  * HackerRank: https://www.hackerrank.com/profile/arasu9725
  * Resume: /RESUME_MY.pdf

CONSTRAINTS:
1. Only answer questions about Tamilarasu's portfolio, skills, education, projects, and achievements
2. If asked something unrelated to Tamilarasu, politely decline and redirect to portfolio topics
3. Be conversational, friendly, and concise
4. If you don't know something, say "I don't have that information in the portfolio"
`;
  } catch (error) {
    console.error("Error building portfolio context:", error);
    return "You are a portfolio chatbot. Answer questions about Tamilarasu.";
  }
}

function buildFallbackReply(message) {
  const question = String(message || "").toLowerCase();

  if (question.includes("skill") || question.includes("tech stack") || question.includes("technology")) {
    return "Tamilarasu's main skills include Python, Java, C, React, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, MySQL, MongoDB, Flask, Django, Node.js, Git, GitHub, PyTorch, TensorFlow, NumPy, and Pandas.";
  }

  if (question.includes("project") || question.includes("work")) {
    return "Tamilarasu has built projects like InterviewXpert (AI Interview Helper using Python + Kivy) and Personal Book Recommender (AI-powered system using Python + Flask).";
  }

  if (question.includes("education") || question.includes("study") || question.includes("college") || question.includes("cgpa")) {
    return "Tamilarasu completed BCA (CGPA 7.6) at Gobi Arts and Science College and completed MCA in May 2026 (CGPA 7.76) at Coimbatore Institute of Technology (CIT). He also completed an Application Development and Support internship at ARGA Investment Management (India) Private Limited from Dec 2025 to May 2026.";
  }

  if (question.includes("linkedin")) {
    return "LinkedIn: https://www.linkedin.com/in/tamilarasu-a-74b936287/";
  }

  if (question.includes("github")) {
    return "GitHub: https://github.com/TAMILARASU-A";
  }

  if (question.includes("leetcode")) {
    return "LeetCode: https://leetcode.com/u/Tamilarasu__A/";
  }

  if (question.includes("hackerrank")) {
    return "HackerRank: https://www.hackerrank.com/profile/arasu9725";
  }

  if (question.includes("resume") || question.includes("cv")) {
    return "You can view Tamilarasu's resume at: /RESUME_MY.pdf";
  }

  if (
    question.includes("who are you") ||
    question.includes("about") ||
    question.includes("introduce") ||
    question.includes("current") ||
    question.includes("role")
  ) {
    return "Tamilarasu A is an MCA graduate from CIT (May 2026), a Python Developer, and an AI Enthusiast focused on building AI-integrated applications.";
  }

  return "I can help with Tamilarasu's portfolio details like skills, education, projects, achievements, and profile links. Ask me about any of those.";
}

async function getGroqReply(systemPrompt, userMessage) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 256,
    }),
  });

  if (!response.ok) {
    let errorPayload = null;
    try {
      errorPayload = await response.json();
    } catch {
      errorPayload = null;
    }
    console.error("Groq API error:", errorPayload || response.statusText);
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || "I couldn't generate a response.";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST requests allowed." });
  }

  const { message } = req.body;
  if (!message || !String(message).trim()) {
    return res.json({
      reply: "Ask me anything about Tamilarasu's skills, projects, education, or achievements!",
    });
  }

  if (!GROQ_API_KEY && !GEMINI_API_KEY) {
    return res.status(500).json({
      reply: "Chatbot API key not configured. Set GROQ_API_KEY or GEMINI_API_KEY in .env.local.",
    });
  }

  const userMessage = String(message).trim();

  if (Date.now() < quotaBackoffUntil) {
    return res.json({
      reply: buildFallbackReply(userMessage),
    });
  }

  try {
    const systemPrompt = buildPortfolioContext();

    if (GROQ_API_KEY) {
      try {
        const groqReply = await getGroqReply(systemPrompt, userMessage);
        return res.json({ reply: groqReply });
      } catch (error) {
        console.error("Groq primary provider failed, falling back:", error.message);
        if (!ALLOW_GEMINI_FALLBACK) {
          return res.json({
            reply: buildFallbackReply(userMessage),
          });
        }
      }
    }

    if (!GEMINI_API_KEY) {
      return res.json({
        reply: buildFallbackReply(userMessage),
      });
    }

    const modelCandidates = [
      process.env.GEMINI_MODEL,
      ...DEFAULT_GEMINI_MODELS,
    ].filter(Boolean);

    const uniqueModels = [...new Set(modelCandidates)];
    let data = null;
    let lastError = null;

    for (const model of uniqueModels) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
          model
        )}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt}\n\nUser asked: "${userMessage}"`,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 256,
              temperature: 0.7,
            },
          }),
        }
      );

      if (response.ok) {
        data = await response.json();
        break;
      }

      let errorPayload = null;
      try {
        errorPayload = await response.json();
      } catch {
        errorPayload = null;
      }

      console.error(`Gemini API error response for model ${model}:`, errorPayload || response.statusText);
      lastError = new Error(`Gemini API error on ${model}: ${response.status} ${response.statusText}`);

      if (response.status === 429) {
        const retryDelayMs = getRetryDelayMs(errorPayload);
        quotaBackoffUntil = Date.now() + retryDelayMs;
        console.warn(`Gemini quota backoff enabled for ${retryDelayMs}ms`);
        break;
      }

      if (response.status === 404) {
        continue;
      }

      break;
    }

    if (!data) {
      throw lastError || new Error("No Gemini models responded successfully");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";

    return res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return res.json({
      reply: buildFallbackReply(userMessage),
    });
  }
}
