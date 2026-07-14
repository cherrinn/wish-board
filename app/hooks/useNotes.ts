import { useCallback, useEffect, useState } from "react";
import { createNote, fetchNotes } from "@/app/lib";
import { NoteRequest, NoteResponse } from "@/app/types";

export function useNotes() {
  const [notes, setNotes] = useState<NoteResponse[]>([]);
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
    async (note: NoteRequest, image: File | null) => {
      const saved = await createNote(note, image);
      setNotes((prev) => [saved, ...prev]);
      return saved;
    },
    [],
  );

  return { notes, isLoading, error, addNote };
}
