import { Button } from "@/app/components/ui";

interface AddButtonProps {
  classNameCustom?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function AddButton({
  classNameCustom = "",
  onClick,
  children,
  type = "button",
  disabled,
}: AddButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${classNameCustom}
        h-12
        rounded-full
        bg-[#3F536E]
        px-6
        text-sm
        font-medium
        text-white
      `}
    >
      {children ?? "✨ ฝากคำอวยพร"}
    </Button>
  );
}