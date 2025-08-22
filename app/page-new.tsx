"use client";

import { ArrowUp, Plus, Upload, RotateCcw, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeNew() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      {/* محتوى الهيرو */}
      <section className="w-full max-w-4xl text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight"
        >
          Build something <span className="text-brand-300">Lovable</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg sm:text-2xl text-text-muted"
        >
          Create apps and websites by chatting with AI
        </motion.p>

        {/* صندوق الإدخال العائم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-10"
        >
          <div className="input-elevated relative w-full rounded-3xl p-3 sm:p-4">
            <div className="flex items-center gap-2">
              {/* أزرار رمزية يسار مثل الصورة */}
              <button className="grid place-items-center size-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <Plus className="size-5" />
              </button>
              <button className="grid place-items-center size-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <Upload className="size-5" />
              </button>
              <button className="grid place-items-center size-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition">
                <RotateCcw className="size-5" />
              </button>

              {/* حقل الكتابة */}
              <input
                className="flex-1 bg-transparent border-0 focus:ring-0 text-base sm:text-lg placeholder:text-text-muted px-2"
                placeholder="Ask Lovable to create a web app that..."
                aria-label="Prompt"
              />

              {/* شارة الرعد والزر */}
              <span className="hidden sm:inline-flex items-center gap-2 mr-2">
                <span className="badge-boost"><Zap className="mr-1 size-3" /> Boost</span>
              </span>

              <button
                aria-label="Send"
                className="grid place-items-center size-12 rounded-full bg-white/90 hover:bg-white text-ink-950 transition shadow-soft"
              >
                <ArrowUp className="size-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* تدرّج سفلي خفيف لإضاءة المنطقة السفلية مثل اللقطة */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-64 bg-gradient-to-t from-accent-400/50 to-transparent" />
    </main>
  );
}