"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const symbols = ["✦", "✧", "✶", "·"];

function createSparkles() {
  return Array.from({ length: 40 }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 5,
    symbol: symbols[index % symbols.length],
  }));
}

export default function Sparkles() {
  const [sparkles] = useState(createSparkles);

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
        z-0
      "
    >
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="
            absolute
            text-xl
            text-[#D4AF37]
          "
          animate={{
            opacity: [0.2, 1, 0.2],
            y: [0, -120],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
          }}
        >
          {sparkle.symbol}
        </motion.div>
      ))}
    </div>
  );
}