import { NoteResponse } from "@/app/types";
import { categories } from "@/app/constants";
import Countdown from "./Countdown";

interface StatsHeaderProps {
  notes: NoteResponse[];
  onCountdownEnd: () => void;
}

export default function StatsHeader({
  notes,
  onCountdownEnd,
}: StatsHeaderProps) {
  const categoryCount = notes.reduce<Record<string, number>>((acc, note) => {
    acc[note.category] = (acc[note.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section
      className="
        mx-auto
        mb-12
        max-w-5xl
        text-center
      "
    >
      {/* Header */}
      <div>
        <p className="text-3xl text-[#B08D57] font-semibold">
          ✦ บทส่งท้ายที่แสนพิเศษ
        </p>
        <p
          className="
            mt-3
            text-sm
            text-[#8A8178]
            md:text-base
          "
        >
          ทุกถ้อยคำจากใจ จะถูกเก็บไว้เป็นความทรงจำที่งดงาม
        </p>
      </div>

      {/* Countdown */}
      <div>
        <Countdown onExpire={onCountdownEnd} />
        <p className="mt-4 text-sm text-[#8A6E3B]">1 ตุลาคม 2026</p>
      </div>

      {/* Divider */}
      <div
        className="
          my-4
          h-px
          bg-[#E8E1D5]
        "
      />

      {/* Stats */}
      <div className="text-sm text-neutral-500">
        💌 <span className=" font-semibold text-[#1C1C1C]">{notes.length}</span>{" "}
        คำอวยพรและความรู้สึก
      </div>

      {/* Categories */}
      <div
        className="
          mt-5
          flex
          flex-wrap
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

            <span className="font-semibold text-[#1C1C1C]">
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
