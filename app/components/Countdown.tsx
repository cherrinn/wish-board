"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  onExpire: () => void;
}

const TARGET_DATE = new Date("2026-10-01T00:00:00");

function calculateTimeLeft() {
  const difference = TARGET_DATE.getTime() - new Date().getTime();

  return {
    expired: difference <= 0,
    days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((difference / (1000 * 60)) % 60), 0),
    seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
  };
}

export default function Countdown({ onExpire }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const updateCountdown = () => {
      const result = calculateTimeLeft();

      setTimeLeft(result);

      if (result.expired) {
        onExpire();
      }
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  return (
    <section className="mx-auto max-w-xl">
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
