import { Button } from "@/app/components/ui";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({
  onClick,
}: FloatingAddButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="
        fixed
        bottom-8
        right-8
        z-50

        h-12
        rounded-full

        bg-[#3F536E]
        px-6

        text-sm
        font-medium
        text-white

        shadow-[0_10px_30px_rgba(63,83,110,0.35)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:bg-[#34455C]
        hover:shadow-[0_16px_40px_rgba(63,83,110,0.45)]

        active:scale-95
      "
    >
      ✨ ฝากคำอวยพร
    </Button>
  );
}