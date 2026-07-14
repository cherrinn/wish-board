"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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

import { Note } from "@/app/types";
import { noteSchema, NoteFormData } from "@/app/schemas";
interface NoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    note: Pick<Note, "name" | "message" | "image_url">,
    image: File | null,
  ) => void;
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
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    mode: "onChange",
  });

  const message = useWatch({ control, name: "message" }) ?? "";

  const submitForm = (values: NoteFormData) => {
    const newNote = {
      name: values.name,
      message: values.message,
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
          bg-white
          p-6
          shadow-2xl
          sm:max-w-lg
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-[#1C1C1C]">
            ✨ ฝากข้อความจากใจ ✨
          </DialogTitle>

          <DialogDescription className="text-base! leading-8! text-[#6B645B]!">
            เขียนคำอวยพรดี ๆ เพื่อเก็บไว้เป็นความทรงจำ
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-2 block text-lg font-medium text-[#333333]">
              ชื่อ
            </label>

            <Input
              {...register("name")}
              placeholder="ชื่อของคุณ"
              maxLength={35}
              className="
                h-12
                rounded-xl
                !text-lg
                !leading-8
                placeholder:text-base
                placeholder:text-neutral-400
              "
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-lg font-medium text-[#333333]">
              ข้อความ
            </label>

            <Textarea
              {...register("message")}
              maxLength={500}
              placeholder="เขียนคำอวยพร..."
              className="
                min-h-42
                rounded-xl
                resize-none
                whitespace-pre-wrap
                !text-lg
                !leading-9
                placeholder:text-base
                placeholder:text-neutral-400
              "
            />

            {errors.message && (
              <p className="mt-2 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}

            <p className="text-right text-sm text-neutral-400">
              {message.length}/500
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="mb-3 block text-lg font-medium text-[#333333]">
              รูปภาพ (ถ้ามี)
            </label>

            {image ? (
              <div
                className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-[#E8DCC8]
        bg-white
        px-4
        py-3
      "
              >
                <div className="flex items-center gap-3">
                  <span className="max-w-[220px] truncate text-sm text-[#6B645B]">
                    {image.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="
          rounded-full
          px-3
          py-1
          text-sm
          text-red-400
          transition
          hover:bg-red-50
        "
                >
                  ลบ
                </button>
              </div>
            ) : (
              <label
                className="
                  flex
                  h-14
                  cursor-pointer
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-[#E8DCC8]
                  bg-white
                  text-base
                  font-medium
                  text-[#6B645B]
                  transition
                  hover:border-[#D4AF37]
                  hover:bg-[#FAF7F2]
                "
              >
                <span>เลือกรูปภาพ</span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setImage(file);
                    }
                  }}
                />
              </label>
            )}
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
              text-base
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
