"use client";

import dynamic from "next/dynamic";

const Sparkles = dynamic(() => import("@/app/components/Sparkles"), {
  ssr: false,
});

export default function BackgroundDecor() {
  return (
<div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
  <Sparkles />

  {/* Top Left */}
  <div
    className="
      absolute
      -left-32
      -top-32
      h-125
      w-125
      rounded-full
      bg-[#F3D7A3]/40
      blur-3xl
    "
  />

  {/* Top Right */}
  <div
    className="
      absolute
      -right-24
      -top-20
      h-112.5
      w-112.5
      rounded-full
      bg-[#E8C7D1]/35
      blur-3xl
    "
  />

  {/* Center */}
  <div
    className="
      absolute
      left-1/2
      top-1/3
      h-100
      w-100
      -translate-x-1/2
      rounded-full
      bg-[#F8E8D0]/50
      blur-3xl
    "
  />

  {/* Bottom Left */}
  <div
    className="
      absolute
      -bottom-32
      -left-20
      h-120
      w-120
      rounded-full
      bg-[#D9E8D5]/30
      blur-3xl
    "
  />

  {/* Bottom Right */}
  <div
    className="
      absolute
      -bottom-20
      -right-24
      h-125
      w-125
      rounded-full
      bg-[#D8DDF5]/30
      blur-3xl
    "
  />

  {/* Small Accent */}
  <div
    className="
      absolute
      left-1/4
      top-20
      h-48
      w-48
      rounded-full
      bg-[#F5C6AA]/25
      blur-3xl
    "
  />
</div>
  );
}
