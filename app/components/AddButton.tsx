import { Button } from "@/app/components/ui";
import { ReactNode } from "react";

interface AddButtonProps {
  classNameCustom?: string;
  onClick?: () => void;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function AddButton({
  classNameCustom = "",
  onClick,
  children = "✨ ฝากข้อความจากใจ",
  type = "button",
  disabled = false,
}: AddButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${classNameCustom}
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

        disabled:cursor-not-allowed
        disabled:opacity-40
      `}
    >
      {children}
    </Button>
  );
}
