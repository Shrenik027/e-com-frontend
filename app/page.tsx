"use client";

import { motion } from "framer-motion";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function HomePage() {
  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      {/* BACKGROUND DEPTH */}
      <motion.img
        src="/infinity-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        animate={{ y: [0, -60, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* MID DEPTH */}
      <motion.img
        src="/infinity-mid.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        animate={{ y: [0, -120, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* FOREGROUND */}
      <motion.img
        src="/infinity-front.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ y: [0, -200, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* AMBER LIGHT PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--color-primary)] opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* SOFT LIGHT RAYS */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[14vw] md:text-[9vw] font-extrabold tracking-tight"
        >
          <img src="/SHRIX.png" alt="" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="mt-4 text-sm md:text-base text-white/80 max-w-xl"
        >
          Infinite depth. Modern essentials. Curated for tomorrow.
        </motion.p>
      </div>
    </main>
  );
}
