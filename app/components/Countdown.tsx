"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-10-01T00:00:00");

function calculateTimeLeft() {
  const difference = TARGET_DATE.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
    mx-auto
    max-w-xl
  "
    >
      <div
        className="
          mt-5
          flex
          justify-center
          gap-3
        "
      >
        {[
          ["วัน", timeLeft.days],
          ["ชั่วโมง", timeLeft.hours],
          ["นาที", timeLeft.minutes],
          ["วินาที", timeLeft.seconds],
        ].map(([label, value]) => (
          <div
            key={label}
            className="
              rounded-2xl
              bg-white/70
              px-4
              py-3
              shadow-sm
              backdrop-blur
            "
          >
            <div
              className="
                text-xl
                font-semibold
                text-[#1C1C1C]
              "
            >
              {String(value).padStart(2, "0")}
            </div>

            <div
              className="
                text-xs
                text-neutral-500
              "
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
