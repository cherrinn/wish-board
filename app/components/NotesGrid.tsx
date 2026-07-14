import { NoteCard } from "@/app/components";
import { Note } from "@/app/types";

interface NotesGridProps {
  notes: Note[];
}

export default function NotesGrid({ notes }: NotesGridProps) {
  return (
    <section className="mx-auto w-full max-w-300 columns-1 gap-8 sm:columns-2 lg:columns-4">
      {notes.map((note) => (
        <div key={note.id} className="mb-8 break-inside-avoid">
          <NoteCard
            name={note.name}
            message={note.message}
            imageUrl={note.image_url}
            createdAt={note.created_at}
            cardNo={note.card_number}
          />
        </div>
      ))}
    </section>
  );
}
