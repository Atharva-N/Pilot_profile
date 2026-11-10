"use client";

import { Linkedin, Mail, Send } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(form.current);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      alert("Message sent successfully. Thank you for reaching out.");
      form.current.reset();
    } catch (error) {
      console.error(error);
      alert("Message could not be sent right now. Please email nagarsekaratharva@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- LEFT COLUMN: IMAGE 1 LAYOUT --- */}
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-6">
              <h2
                className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:to-white/40 uppercase tracking-normal"
                style={{ fontFamily: "var(--font-bebas, impact, sans-serif)" }}
              >
                Let&apos;s Connect
              </h2>
              <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full opacity-60" />
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed text-base font-medium">
                Whether it&apos;s about aviation, AI systems, or a shared passion for flight — I&apos;d love to hear from you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a
                href="mailto:nagarsekaratharva@gmail.com"
                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black px-6 py-3.5 rounded-full font-semibold flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]"
              >
                <Mail size={18} />
                <span>nagarsekaratharva@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/atharva-nagarsekar-9699a9207"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white/10 hover:border-white/30 dark:text-white text-slate-900 px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-3 transition-all duration-300 w-full sm:w-auto"
              >
                <Linkedin size={18} className="text-sky-500" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* --- RIGHT COLUMN: IMAGE 2 FORM --- */}
          <div className="bg-white/80 dark:bg-[#0b1120] p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl">
            <h3 className="text-3xl font-bold mb-10 text-center text-slate-900 dark:text-white tracking-tight">Transmit a Message</h3>
            <form ref={form} className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-center dark:text-white text-slate-900">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-[#0f172a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-sans placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
                  placeholder="Your Name..."
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-center dark:text-white text-slate-900">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-[#0f172a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-sans placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
                  placeholder="Your Email..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-center dark:text-white text-slate-900">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-[#0f172a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none font-sans placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
                  placeholder="Hello, I&apos;d like to discuss an opportunity..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-[0_15px_30px_rgba(2,132,199,0.2)] hover:shadow-[0_20px_40px_rgba(2,132,199,0.3)] hover:-translate-y-1 disabled:opacity-50 text-base tracking-wide"
              >
                {isSubmitting ? "Transmitting..." : "Transmit Message"}
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
