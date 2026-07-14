import { Note } from "@/app/types";
import { supabase } from "./supabase";

/**
 * Uploads an image to the "images" bucket and returns its public URL.
 * Returns "" if no image was provided.
 */
async function uploadNoteImage(image: File): Promise<string> {
  const fileName = `${Date.now()}-${image.name}`;

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, image);

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function fetchNotes(): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to load notes: ${error.message}`);

  return data ?? [];
}

export async function createNote(
  note: Pick<Note, "name" | "message">,
  image: File | null,
): Promise<Note> {
  const imageUrl = image ? await uploadNoteImage(image) : "";

  const { data, error } = await supabase
    .from("notes")
    .insert({
      name: note.name,
      message: note.message,
      image_url: imageUrl,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to save note: ${error.message}`);

  return data;
}
