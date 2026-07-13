import { z } from "zod";

export const noteSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณาใส่ชื่อ")
    .max(35, "ชื่อยาวเกินไป"),

  message: z
    .string()
    .min(1, "กรุณาเขียนคำอวยพร")
    .max(500, "ข้อความยาวเกินไป"),
});

export type NoteFormData = z.infer<typeof noteSchema>;