"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

import { Note } from "../types/Note";
import { z } from "zod";

const noteSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณาใส่ชื่อ")
    .max(35, "ชื่อยาวเกินไป"),

  message: z
    .string()
    .min(1, "กรุณาเขียนคำอวยพร")
    .max(500, "ข้อความยาวเกินไป"),
});

type NoteFormData = z.infer<typeof noteSchema>;

interface NoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (note: Note, image: File | null) => void;
}

export default function NoteForm({
  open,
  onOpenChange,
  onSubmit,
}: NoteFormProps) {
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isValid,
    },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    mode: "onChange",
  });

  const message = watch("message") ?? "";

  const submitForm = (values: NoteFormData) => {
    const newNote = {
      id: Date.now(),
      name: values.name,
      message: values.message,
      created_at: new Date().toISOString(),
      image_url: "",
    };

    onSubmit(newNote, image);

    reset();
    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          overflow-hidden
          rounded-3xl
          p-8
          sm:max-w-lg
        "
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-medium text-[#1C1C1C]">
            ฝากข้อความจากใจ
          </DialogTitle>

          <DialogDescription className="mt-3 !text-lg !leading-8 !text-[#6B645B]">
            เขียนคำอวยพรดี ๆ เพื่อเก็บไว้เป็นความทรงจำ
          </DialogDescription>
        </DialogHeader>


        <form
          onSubmit={handleSubmit(submitForm)}
          className="mt-8 space-y-6"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-xl font-medium text-[#333333]">
              ชื่อ
            </label>

            <Input
              {...register("name")}
              placeholder="ชื่อของคุณ"
              maxLength={35}
              className="
                h-16
                rounded-xl
                !text-xl
                !leading-8
                placeholder:text-xl
                placeholder:text-neutral-400
              "
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>


          {/* Message */}
          <div>
            <label className="mb-2 block text-xl font-medium text-[#333333]">
              ข้อความ
            </label>

            <Textarea
              {...register("message")}
              maxLength={500}
              placeholder="เขียนคำอวยพร..."
              className="
                min-h-48
                rounded-xl
                p-5
                resize-none
                whitespace-pre-wrap
                !text-xl
                !leading-9
                placeholder:text-xl
                placeholder:text-neutral-400
              "
            />

            {errors.message && (
              <p className="mt-2 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}

            <p className="mt-2 text-right text-sm text-neutral-400">
              {message.length}/500
            </p>
          </div>


          {/* Image */}
          <div>
            <label className="mb-2 block text-xl font-medium text-[#333333]">
              รูปภาพ (ถ้ามี)
            </label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
              className="h-14 rounded-xl text-xl"
            />
          </div>


          {/* Submit */}
          <Button
            type="submit"
            disabled={!isValid}
            className="
              mt-3
              h-14
              w-full
              rounded-full
              bg-[#1C1C1C]
              text-lg
              font-medium
              text-white
              hover:bg-[#333333]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            ✨ ส่งคำอวยพร
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}