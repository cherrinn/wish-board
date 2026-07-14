import { z } from "zod";


const noHtml = (value: string) => {
  return !/<[^>]*>/g.test(value);
};


const safeString = z
  .string()
  .refine(noHtml, {
    message: "ไม่อนุญาตให้ใส่ HTML",
  });


export const noteSchema = z.object({
  name: safeString
    .min(1, "กรุณาใส่ชื่อ")
    .max(35, "ชื่อยาวเกินไป"),

  message: safeString
    .min(1, "กรุณาเขียนคำอวยพร")
    .max(500, "ข้อความยาวเกินไป"),

  category: z
    .string()
    .min(1, "กรุณาเลือกประเภทคำอวยพร"),

  card_color: z
    .string()
    .optional(),
});


export type NoteFormData = z.infer<typeof noteSchema>;