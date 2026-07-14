import Image from "next/image";
import { categories } from "@/app/constants";
import { cardColors } from "@/app/constants/card";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Share } from "lucide-react";

interface NoteCardProps {
  name: string;
  createdAt: string;
  imageUrl?: string;
  message: string;
  cardNo: number;
  category: string;
  color: string;
}

export default function NoteCard({
  name,
  createdAt,
  imageUrl,
  message,
  cardNo,
  category,
  color = "gold",
}: NoteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const date = new Date(createdAt).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentCategory =
    category === "type"
      ? { label: "ประเภทคำอวยพร", icon: "💌" }
      : categories.find((item) => item.value === category);

  const currentColor = cardColors.find((item) => item.value === color);

  const exportImage = async () => {
    if (!cardRef.current) return;

    const images = Array.from(cardRef.current.querySelectorAll("img"));

    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }),
    );

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: `${currentColor?.code}20`,
    });

    const link = document.createElement("a");
    link.download = `memory-card-${cardNo}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div
      className="
        relative
        rounded-3xl
        border-[1.5px]
        p-1.5
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
      style={{
        backgroundColor: `${currentColor?.code}20`,
        borderColor: currentColor?.code,
      }}
    >
      {/* EXPORT AREA */}
      <div
        ref={cardRef}
        className="
          rounded-2xl
          bg-white
          p-1.5
        "
      >
        <article
          className="
            relative
            rounded-xl
            p-4
            pt-12
          "
        >
          {/* Category */}
          <div
            className="
              absolute
              right-4
              top-2
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              px-2
              py-1
              text-xs
              font-medium
            "
            style={{
              backgroundColor: `${currentColor?.code}18`,
              borderColor: `${currentColor?.code}50`,
              color: "#6B645B",
            }}
          >
            <span className="text-sm">{currentCategory?.icon}</span>
            <span>{currentCategory?.label}</span>
            <span className="opacity-50">•</span>
            <span className="font-semibold">#{cardNo}</span>
          </div>

          {/* Name */}
          <h2
            className="
              text-lg
              font-semibold
              text-[#1C1C1C]/80
            "
          >
            {name}
          </h2>

          {/* Date */}
          <p className="mt-1 text-[12px] text-neutral-500">{date}</p>

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
                alt={name}
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
      </div>

      {/* SHARE BUTTON */}
      <button
        type="button"
        onClick={exportImage}
        className="
          absolute
          bottom-4
          right-4

          flex
          h-8
          w-8
          items-center
          justify-center

          rounded-full

          bg-white/80
          text-[#8A6E3B]

          shadow-sm
          backdrop-blur

          transition-all
          hover:-translate-y-0.5
          hover:bg-white
          hover:shadow-md
        "
      >
        <Share size={14} />
      </button>
    </div>
  );
}
