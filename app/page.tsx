"use client";

import { useState } from "react";
import { useNotes } from "@/app/hooks";
import {
  FloatingAddButton,
  BackgroundDecor,
  StatsHeader,
  EmptyState,
  NotesGrid,
  NoteForm,
} from "@/app/components";
import { toast } from "sonner";
import { NoteRequest } from "@/app/types";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { notes, isLoading, error, addNote } = useNotes();

  const handleAddNote = async (newNote: NoteRequest, image: File | null) => {
    try {
      await addNote(newNote, image);
      setIsOpen(false);
      toast.success("ส่งคำอวยพรเรียบร้อยแล้ว ✨");
    } catch (err) {
      toast.error("ไม่สามารถส่งคำอวยพรได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#FAF7F2] px-6 py-16 md:px-12 lg:px-24">
      <BackgroundDecor />
      <div className="relative z-10">
        <StatsHeader notes={notes} />

        {isLoading ? (
          <section className="flex min-h-[45vh] items-center justify-center">
            <p className="text-xl text-neutral-400">กำลังโหลดข้อความอวยพร...</p>
          </section>
        ) : error ? (
          <section className="flex min-h-[45vh] items-center justify-center">
            <p className="text-xl text-red-400">{error}</p>
          </section>
        ) : notes.length === 0 ? (
          <EmptyState onAddClick={() => setIsOpen(true)} />
        ) : (
          <NotesGrid notes={notes} />
        )}
      </div>

      {notes.length > 0 && (
        <FloatingAddButton onClick={() => setIsOpen(true)} />
      )}

      <NoteForm
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleAddNote}
      />
    </main>
  );
}
