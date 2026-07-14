"use client";

import { BackgroundDecor } from "@/app/components";

export function MaintenanceContent() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF7F2] px-6 py-16 md:px-12 lg:px-24">
      <BackgroundDecor />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <span className="text-6xl">🛠️</span>

        <h1 className="text-2xl font-semibold text-neutral-700 md:text-3xl">
          ระบบอยู่ระหว่างปรับปรุง
        </h1>

        <p className="max-w-md text-base text-neutral-500 md:text-lg">
          ขออภัยในความไม่สะดวก ขณะนี้เรากำลังปรับปรุงระบบเพื่อให้บริการที่ดียิ่งขึ้น
          กรุณากลับมาใหม่อีกครั้งในภายหลัง
        </p>

        <p className="text-sm text-neutral-400">
          ขอบคุณสำหรับความอดทนของคุณ 🙏
        </p>
      </div>
    </main>
  );
}