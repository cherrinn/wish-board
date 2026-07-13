"use client";

import { SubmitEvent, useState } from "react";

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

interface NoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (note: Note) => void;
}

export default function NoteForm({
  open,
  onOpenChange,
  onSubmit,
}: NoteFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      name,
      createdAt: new Date().toISOString(),
      message,
      imageUrl: "",
    };

    onSubmit(newNote);

    setName("");
    setMessage("");
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

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-xl font-medium text-[#333333]">
              ชื่อ
            </label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ชื่อของคุณ"
              maxLength={35}
              className="
                min-w-0
                h-16
                rounded-xl
                break-all
                !text-xl
                !leading-8
                placeholder:text-xl
                placeholder:text-neutral-400
              "
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-xl font-medium text-[#333333]">
              ข้อความ
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              placeholder="เขียนคำอวยพร..."
              className="
                min-w-0
                min-h-48
                rounded-xl
                p-5
                break-all
                whitespace-pre-wrap
                resize-none
                !text-xl
                !leading-9
                placeholder:text-xl
                placeholder:text-neutral-400
              "
            />
            <p className="mt-2 text-right text-smtext-neutral-400">
              {message.length}/{500}
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
              className="h-14 rounded-xl text-xl"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-3 h-14 w-full rounded-full bg-[#1C1C1C] text-lg font-medium text-white hover:bg-[#333333]"
          >
            ✨ ส่งคำอวยพร
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
