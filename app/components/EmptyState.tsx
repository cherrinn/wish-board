import { Card } from "@/app/components/ui";
import { AddButton } from "@/app/components";

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <section className="flex min-h-[45vh] items-center justify-center text-center">
      <Card className="w-full max-w-lg rounded-[36px] border border-white/60 bg-white/60 p-8 shadow-xl backdrop-blur-2xl">
        <h2 className="text-2xl font-medium leading-tight text-[#1C1C1C]">
          เรื่องราวดี ๆ
          <br />
          กำลังจะเริ่มต้น
        </h2>

        <p className="text-sm leading-9 text-neutral-500">
          ฝากคำอวยพรแรกของคุณ เพื่อร่วมสร้างความทรงจำดี ๆ ไว้ที่นี่
        </p>

        <AddButton onClick={onAddClick}>✨ ฝากคำอวยพร</AddButton>
      </Card>
    </section>
  );
}
