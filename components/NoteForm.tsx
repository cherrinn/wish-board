"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NoteForm({ open, onOpenChange }: NoteFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      message,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" rounded-3xl p-8 sm:max-w-lg  ">
        <DialogHeader>
          <DialogTitle
            className="font-serif text-2xl font-medium text-[#1C1C1C]">
            ฝากข้อความจากใจ
          </DialogTitle>

          <DialogDescription
            className="mt-3 !text-lg !leading-8 !text-[#6B645B]"
          >
            เขียนคำอวยพรดี ๆ เพื่อเก็บไว้เป็นความทรงจำ
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-xl font-medium text-[#333333]">
              ชื่อ
            </label>

            <Input
              placeholder="ชื่อของคุณ"
              className="h-16 rounded-xl !text-xl !leading-8 placeholder:text-xl placeholder:text-neutral-400"
            />
          </div>

          {/* Message */}
          <div>
            <label
              className="mb-2 block text-xl font-medium text-[#333333]">
              ข้อความ
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              placeholder="เขียนคำอวยพร..."
              className="min-h-48 rounded-xl p-5 !text-xl !leading-9 placeholder:text-xl placeholder:text-neutral-400"
            />
            <p
              className="mt-2 text-right text-smtext-neutral-400"
            >
              {message.length}/{500}
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-xl font-medium text-[#333333]" >
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
