import { Note } from "@/app/types";

interface StatsHeaderProps {
  notes: Note[];
}

export default function StatsHeader({ notes }: StatsHeaderProps) {
  const imageCount = notes.filter((note) => note.image_url).length;

  return (
    <section className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
      <div className="text-xl text-[#B08D57]">✦</div>

      <h1 className="text-2xl font-medium tracking-tight text-[#1C1C1C] md:text-4xl">
        บันทึกความรู้สึกดี ๆ
      </h1>

      <p className="text-base text-neutral-500">
        ทุกข้อความจะถูกเก็บไว้เป็นความทรงจำที่สวยงาม
      </p>

      <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-neutral-500">
        <div className="flex items-center gap-2">
          <span>💌</span>
          <span>
            <strong className="text-[#1C1C1C]">{notes.length}</strong> คำอวยพร
          </span>
        </div>

        <span className="text-neutral-300">|</span>

        <div className="flex items-center gap-2">
          <span>📷</span>
          <span>
            <strong className="text-[#1C1C1C]">{imageCount}</strong> รูปภาพ
          </span>
        </div>
      </div>
    </section>
  );
}
