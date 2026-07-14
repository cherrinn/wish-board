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
    <section
      className="
        mx-auto
        mb-10
        max-w-5xl
      "
    >
      {/* Title row */}
      <div
        className="
          flex
          items-end
          justify-between
          border-b
          border-[#E8E1D5]
          pb-5
        "
      >
        <div>
          <h1
            className="
              text-3xl
              text-[#1C1C1C]
            "
          >
            <span className="text-xl text-[#B08D57]">✦</span> บทส่งท้ายที่แสนพิเศษ
          </h1>

          <p
            className="
              mt-1
              pl-6
              text-sm
              text-[#8A8178]
            "
          >
            ทุกถ้อยคำจากใจ จะถูกเก็บไว้เป็นความทรงจำที่งดงาม
          </p>
        </div>

        <div
          className="
            text-sm
            text-neutral-500
          "
        >
          💌 <span className="font-medium text-[#1C1C1C]">{notes.length}</span>{" "}
          คำอวยพรและความรู้สึก
        </div>
      </div>

      {/* Categories */}
      <div
        className="
          mt-5
          flex
          w-full
          flex-wrap
          items-center
          justify-center
          gap-2
          text-xs
          text-[#6B645B]
        "
      >
        {categories.map((category, index) => (
          <div key={category.value} className="flex items-center gap-1.5">
            <span>
              {category.icon} {category.label}
            </span>

            <span
              className="
          font-semibold
          text-[#1C1C1C]
        "
            >
              {categoryCount[category.value] ?? 0}
            </span>

            {index < categories.length - 1 && (
              <span className="ml-2 text-[#D8D0C5]">|</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
