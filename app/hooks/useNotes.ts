import { useCallback, useEffect, useState } from "react";
import { Note } from "@/app/types";
import { createNote, fetchNotes } from "@/app/lib";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchNotes();
        if (!cancelled) setNotes(data);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const addNote = useCallback(
    async (note: Pick<Note, "name" | "message">, image: File | null) => {
      const saved = await createNote(note, image);
      setNotes((prev) => [saved, ...prev]);
      return saved;
    },
    [],
  );

  return { notes, isLoading, error, addNote };
}
