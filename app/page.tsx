"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import NoteCard from "@/app/components/NoteCard";
import { useState } from "react";
import NoteForm from "@/app/components/NoteForm";
import { Note } from "./types/Note";

const mockNotes = [
  {
    id: 1,
    name: "Alice",
    createdAt: "2026-07-13",
    message: "ขอให้ทุกวันเต็มไปด้วยความสุข และมีแต่เรื่องดี ๆ เข้ามาในชีวิต ✨",
    imageUrl: "/images/Alice.jpg",
  },
  {
    id: 2,
    name: "Benjamin",
    createdAt: "2026-07-12",
    message:
      "Thank you for all the wonderful memories. Wishing you endless happiness.",
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]); // TODO: เปลี่ยนเป็น fetch จาก Supabase

  const handleAddNote = (newNote: Note) => {
    setNotes((prev) => [...prev, newNote]);
    setIsOpen(false);
  };

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#FAF7F2]
        px-6
        py-16
      "
    >
      <div
        className="
          absolute
          -left-32
          -top-32
          h-125
          w-125
          rounded-full
          bg-[#F3D7A3]/40
          blur-3xl
        "
      />

      <div
        className="
          absolute
          right-37.5
          top-1/3
          h-112.5
          w-113.5
          rounded-full
          bg-[#E8C7D1]/30
          blur-3xl
        "
      />

      {/* Hero */}
      <section
        className="
          mx-auto
          mb-16
          max-w-3xl
          text-center
        "
      >
        <div className="mb-6 text-xl text-[#B08D57]">✦</div>

        <h1
          className="
            font-serif
            text-5xl
            font-medium
            tracking-tight
            text-[#1C1C1C]
            md:text-6xl
          "
        >
          บันทึกความรู้สึกดี ๆ
        </h1>

        <p className="mt-6 text-lg text-neutral-500">
          ทุกข้อความจะถูกเก็บไว้เป็นความทรงจำที่สวยงาม
        </p>
      </section>

      {/* Notes */}
      {notes.length === 0 ? (
        <section
          className="
            flex
            min-h-[45vh]
            items-center
            justify-center
            text-center
          "
        >
          <Card
            className="
             w-full
              max-w-xl
              rounded-[36px]
              border
              border-white/60
              bg-white/30
              p-12
              shadow-xl
              backdrop-blur-2xl
            "
          >
            <div className="mb-8 text-3xl text-[#B08D57]">✦</div>

            <h2
              className="
                font-serif
                text-4xl
                font-medium
                leading-tight
                text-[#1C1C1C]
                md:text-5xl
              "
            >
              เรื่องราวดี ๆ
              <br />
              กำลังจะเริ่มต้น
            </h2>

            <p
              className="
                mt-6
                text-xl
                leading-9
                text-neutral-500
              "
            >
              ฝากคำอวยพรแรกของคุณ
              <br />
              เพื่อร่วมสร้างความทรงจำดี ๆ ไว้ที่นี่
            </p>

            <Button
              className="
                mt-10
                h-14
                rounded-full
                bg-[#1C1C1C]
                px-10
                text-lg
                font-medium
                text-white
                shadow-lg
                transition
                hover:scale-105
                hover:bg-[#333333]
              "
              onClick={() => setIsOpen(true)}
            >
              ✨ ฝากคำอวยพร
            </Button>
          </Card>
        </section>
      ) : (
        <section
          className="
            mx-auto
            w-full
            max-w-[1600px]
            columns-1
            gap-8
            sm:columns-2
            lg:columns-4
          "
        >
          {notes.map((note) => (
            <div
              key={note.id}
              className="
                mb-8
                break-inside-avoid
              "
            >
              <NoteCard
                key={note.id}
                name={note.name}
                message={note.message}
                imageUrl={note.imageUrl ?? undefined}
                createdAt={note.createdAt}
              />
            </div>
          ))}
        </section>
      )}

      {/* Floating action */}
      {notes.length > 0 && (
        <Button
          className="
          fixed
          bottom-8
          left-1/2
          -translate-x-1/2
          h-16
          rounded-full
          px-12
          text-lg
          font-medium
          bg-[#1C1C1C]
          text-white
          shadow-xl
          transition
          hover:scale-105
          hover:bg-[#333333]
        "
          onClick={() => setIsOpen(true)}
        >
          ✨ ฝากคำอวยพร
        </Button>
      )}

      <NoteForm
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleAddNote}
      />
    </main>
  );
}
