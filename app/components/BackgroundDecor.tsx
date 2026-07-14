"use client";

import dynamic from "next/dynamic";

const Sparkles = dynamic(() => import("@/app/components/Sparkles"), {
  ssr: false,
});

export default function BackgroundDecor() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Sparkles />
      <div className="absolute -left-32 -top-32 h-125 w-125 rounded-full bg-[#F3D7A3]/40 blur-3xl" />
      <div className="absolute right-37.5] top-1/3 h-112.5 w-112.5 rounded-full bg-[#E8C7D1]/30 blur-3xl" />
    </div>
  );
}
