import { z } from "zod";

export const noteSchema = z.object({
  name: z.string().min(1, "กรุณาใส่ชื่อ"),

  message: z.string().min(1, "กรุณาเขียนคำอวยพร"),
});

export type NoteFormData = z.infer<typeof noteSchema>;
