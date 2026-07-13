"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import NoteCard from "@/app/components/NoteCard";
import { useEffect, useState } from "react";
import NoteForm from "@/app/components/NoteForm";
import { Note } from "./types/Note";
import { supabase } from "./lib/supabase";
import dynamic from "next/dynamic";

const Sparkles = dynamic(() => import("@/app/components/Sparkles"), {
  ssr: false,
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddNote = async (newNote: Note, image: File | null) => {
    let imageUrl = "";

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, image);

      if (uploadError) {
        console.error(uploadError);
        return;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("notes")
      .insert({
        name: newNote.name,
        message: newNote.message,
        image_url: imageUrl,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setNotes((prev) => [data, ...prev]);
    setIsOpen(false);
  };

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }

      setNotes(data ?? []);
      setIsLoading(false);
    };

    loadNotes();
  }, []);

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#FAF7F2]
        px-6
        md:px-12
        lg:px-24
        py-16
      "
    >
      <Sparkles />

      <div
        className="
          absolute
          -left-32
          -top-32
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#F3D7A3]/40
          blur-3xl
        "
      />

      <div
        className="
          absolute
          right-[150px]
          top-1/3
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#E8C7D1]/30
          blur-3xl
        "
      />

      <section
        className="
          relative
          z-10
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

      {isLoading ? (
        <section
          className="
          flex
          min-h-[45vh]
          items-center
          justify-center
        "
        >
          <p className="text-xl text-neutral-400">กำลังโหลดข้อความอวยพร...</p>
        </section>
      ) : notes.length === 0 ? (
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
            grid
            w-full
            max-w-[1200px]
            grid-cols-1
            gap-8
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {notes.map((note) => (
            <div key={note.id}>
              <NoteCard
                name={note.name}
                message={note.message}
                imageUrl={note.image_url}
                createdAt={note.created_at}
              />
            </div>
          ))}
        </section>
      )}

      {notes.length > 0 && (
        <Button
          className="
            fixed
            bottom-8
            left-1/2
            h-16
            -translate-x-1/2
            rounded-full
            bg-[#1C1C1C]
            px-12
            text-lg
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
