"use client";
import { useState, useRef, useEffect } from "react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function MiniChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I'm your Portfolio Assistant! Ask me anything about Tamilarasu — skills, projects, or resume." },
  ]);

  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function send(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();

    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "I'm here to help!" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Server error. Try again later." },
      ]);
    }
  }

  return (
    <GlassCard className="glow-hover">

      {/* Title */}
      <h3 className="font-semibold mb-2 text-lg">AI Chat Assistant</h3>

      {/* Chat Window */}
      <div
        ref={chatRef}
        className="h-48 overflow-y-auto space-y-3 p-3 rounded-lg bg-white/5"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={m.from === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block px-3 py-2 rounded-xl max-w-[80%] break-words ${
                m.from === "user"
                  ? "bg-cyan-500 text-black"
                  : "bg-white/10 border border-white/10"
              }`}
            >
              {m.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={send} className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 bg-white/10 rounded-lg border border-white/20 focus:outline-none"
          placeholder="Ask something…"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="px-4 py-2 bg-cyan-400 text-black font-semibold rounded-lg shadow-md hover:shadow-cyan-400/40 transition-all"
        >
          Send
        </motion.button>
      </form>
    </GlassCard>
  );
}
