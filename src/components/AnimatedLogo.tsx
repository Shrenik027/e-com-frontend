"use client";

import { motion } from "framer-motion";

export default function AnimatedLogo() {
  return (
    <div className="relative flex items-center justify-center">
      {/* SHRI */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-[14vw] md:text-[9vw] font-extrabold tracking-tight text-[var(--color-primary)]"
      >
        SHRI
      </motion.span>

      {/* SLASH STROKE */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
        className="absolute h-[6px] w-[18vw] md:w-[12vw] 
                   bg-[var(--color-primary)] 
                   rotate-[-25deg] 
                   blur-[0.5px]"
        style={{ transformOrigin: "left center" }}
      />

      {/* X */}
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4, ease: "easeOut" }}
        className="ml-2 text-[14vw] md:text-[9vw] font-extrabold text-[var(--color-primary)]"
      >
        X
      </motion.span>
    </div>
  );
}
