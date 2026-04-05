"use client";

import { useState } from "react";
import GlassCard from "./GlassCard";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to send message.");
      }

      setStatus(data?.message || "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus(err.message || "Failed to send. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-semibold mb-4">Contact Me</h3>

      <form onSubmit={sendMail} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-xl shadow hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {status && (
        <p className="mt-3 text-sm text-center opacity-80">{status}</p>
      )}
    </GlassCard>
  );
}
