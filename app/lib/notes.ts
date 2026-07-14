import { NoteRequest, NoteResponse } from "@/app/types";
import { supabase } from "./supabase";
import { noteSchema } from "@/app/schemas";


async function uploadNoteImage(image: File): Promise<string> {
  // Validate image type
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(image.type)) {
    throw new Error(
      "รองรับเฉพาะไฟล์ JPG, PNG และ WEBP เท่านั้น",
    );
  }

  // Validate size (5MB)
  const maxSize = 5 * 1024 * 1024;

  if (image.size > maxSize) {
    throw new Error(
      "ขนาดรูปต้องไม่เกิน 5MB",
    );
  }


  const extension =
    image.name.split(".").pop();


  const fileName = `${Date.now()}.${extension}`;


  const { error: uploadError } =
    await supabase.storage
      .from("images")
      .upload(fileName, image);


  if (uploadError) {
    throw new Error(
      `Image upload failed: ${uploadError.message}`,
    );
  }


  const { data } =
    supabase.storage
      .from("images")
      .getPublicUrl(fileName);


  return data.publicUrl;
}

export async function fetchNotes(): Promise<NoteResponse[]> {
  const { data, error } =
    await supabase
      .from("notes")
      .select("*")
      .order("created_at", {
        ascending: false,
      });


  if (error) {
    throw new Error(
      `Failed to load notes: ${error.message}`,
    );
  }


  return data ?? [];
}

export async function createNote(
  note: NoteRequest,
  image: File | null,
): Promise<NoteResponse> {


  // Validate input again before database
  const validatedNote =
    noteSchema.parse(note);



  const imageUrl =
    image
      ? await uploadNoteImage(image)
      : "";



  const { data, error } =
    await supabase
      .from("notes")
      .insert({
        name: validatedNote.name,
        message: validatedNote.message,
        category: validatedNote.category,
        card_color: validatedNote.card_color ?? "gold",
        image_url: imageUrl,
      })
      .select()
      .single();



  if (error) {
    throw new Error(
      `Failed to save note: ${error.message}`,
    );
  }


  return data;
}