import Image from "next/image";
import { categories } from "../constants";

interface NoteCardProps {
  name: string;
  createdAt: string;
  imageUrl?: string;
  message: string;
  cardNo: number;
  category: string;
}

export default function NoteCard({
  name,
  createdAt,
  imageUrl,
  message,
  cardNo,
  category,
}: NoteCardProps) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentCategory = categories.find((item) => item.value === category);

  return (
    <article
      className="
        relative
        rounded-2xl
        border
        border-[#E8E1D5]
        bg-white
        p-4
        pt-12
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Category */}
      <div
        className="
          absolute
          right-4
          top-4
          inline-flex
          items-center
          rounded-full
          bg-[#FAF7F2]
          px-3
          py-1
          text-xs
          text-[#8A6E3B]
        "
      >
        {currentCategory?.icon} {currentCategory?.label} #{cardNo}
      </div>

      {/* Name */}
      <h2
        className="
          text-lg
          font-medium
          text-[#1C1C1C]
        "
      >
        {name}
      </h2>

      {/* Date + Card Number */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-neutral-500">{date}</p>
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="my-4 overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Divider */}
      <div className="my-4 h-px bg-[#E8E1D5]" />

      {/* Message */}
      <p
        className="
          flex
          flex-col
          whitespace-pre-wrap
          text-base
          leading-9
          text-[#333333]
        "
      >
        <span className="text-sm text-neutral-500">💌 ข้อความจากใจ...</span>

        <span className="pl-4">{message}</span>
      </p>
    </article>
  );
}
