import Image from "next/image";

interface NoteCardProps {
  name: string;
  createdAt: string;
  imageUrl?: string;
  message: string;
}

export default function NoteCard({
  name,
  createdAt,
  imageUrl,
  message,
}: NoteCardProps) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      className="
        rounded-2xl
        border
        border-[#E8E1D5]
        bg-white
        p-10
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <h2
        className="
          font-serif
          text-lg
          font-medium
          text-[#1C1C1C]
        "
      >
        {name}
      </h2>

      <p className="mt-2 text-base text-neutral-500">{date}</p>

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

      <div className="my-6 h-px bg-[#E8E1D5]" />

      <p className="whitespace-pre-wrap text-base leading-9 text-[#333333]">
        {message}
      </p>
    </article>
  );
}
