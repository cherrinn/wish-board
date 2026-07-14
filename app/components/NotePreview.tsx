import Image from "next/image";
import { categories } from "@/app/constants";

interface NotePreviewProps {
  name?: string;
  message?: string;
  category?: string;
  image?: File | null;
  createdAt?: string;
}

export default function NotePreview({
  name,
  message,
  category,
  image,
  createdAt,
}: NotePreviewProps) {
  const date = new Date(createdAt ?? new Date()).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentCategory = categories.find((item) => item.value === category);

  const imageUrl = image ? URL.createObjectURL(image) : null;

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
        {currentCategory?.icon ?? "🌸"}{" "}
        {currentCategory?.label ?? "ประเภทคำอวยพร"}
      </div>

      {/* Name */}
      <h2
        className="
          text-lg
          font-medium
          text-[#1C1C1C]
        "
      >
        {name || "ชื่อของคุณ"}
      </h2>

      {/* Date */}
      <div
        className="
          mt-2
          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-sm
            text-neutral-500
          "
        >
          {date}
        </p>

        <span
          className="
            rounded-full
            bg-[#F5F5F5]
            px-3
            py-1
            text-xs
            text-neutral-500
          "
        >
          💌 Preview
        </span>
      </div>

      {/* Image */}
      {imageUrl && (
        <div
          className="
            my-4
            overflow-hidden
            rounded-xl
          "
        >
          <Image
            src={imageUrl}
            alt={name ?? ""}
            width={400}
            height={400}
            className="
              h-auto
              w-full
              object-cover
            "
          />
        </div>
      )}

      {/* Divider */}
      <div
        className="
          my-4
          h-px
          bg-[#E8E1D5]
        "
      />

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
        <span
          className="
            text-sm
            text-neutral-500
          "
        >
          💌 ข้อความจากใจ...
        </span>

        <span className="pl-4 ">
          {message || "ข้อความของคุณจะปรากฏที่นี่..."}
        </span>
      </p>
    </article>
  );
}
