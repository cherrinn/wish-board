import { NoteResponse } from "@/app/types";
import { categories } from "@/app/constants";

interface StatsHeaderProps {
  notes: NoteResponse[];
}

export default function StatsHeader({ notes }: StatsHeaderProps) {
  const categoryCount = notes.reduce<Record<string, number>>((acc, note) => {
    acc[note.category] = (acc[note.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mx-auto mb-8 max-w-3xl space-y-4 text-center">
      <div className="text-xl text-[#B08D57]">✦</div>

      <h1 className="text-2xl font-medium tracking-tight text-[#1C1C1C] md:text-4xl">
        บันทึกความรู้สึกดี ๆ
      </h1>

      <p className="text-base text-neutral-500">
        ทุกข้อความจะถูกเก็บไว้เป็นความทรงจำที่สวยงาม
      </p>

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-center
          gap-x-4
          gap-y-2
          text-sm
          text-neutral-500
        "
      >
        {categories.map((category, index) => (
          <div
            key={category.value}
            className="flex items-center gap-1.5 text-[12px]"
          >
            <span>{category.icon}</span>
            <span className="font-semibold text-[#1C1C1C]">
              {categoryCount[category.value] ?? 0}
            </span>
            <span>{category.label}</span>
            {index < categories.length - 1 && (
              <span className="ml-2 text-neutral-300">|</span>
            )}
          </div>
        ))}
      </div>
      <hr />
      <div className="pt-2 text-md">
        💌 <span className="font-semibold text-[#1C1C1C]">{notes.length}</span>{" "}
        ข้อความจากทุกคน
      </div>
    </section>
  );
}
