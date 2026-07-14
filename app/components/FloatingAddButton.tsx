import { Button } from "@/app/components/ui";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <Button
      className="fixed bottom-8 left-1/2 z-50 h-14 -translate-x-1/2 rounded-full bg-[#1C1C1C] px-12 text-base text-white shadow-xl transition hover:scale-105 hover:bg-[#333333]"
      onClick={onClick}
    >
      ✨ ฝากคำอวยพร
    </Button>
  );
}
