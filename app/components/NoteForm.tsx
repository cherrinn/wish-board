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

import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

import { noteSchema, NoteFormData } from "@/app/schemas";
import { categories } from "@/app/constants";
// import NotePreview from "./NotePreview";
import { NoteRequest } from "@/app/types";
import { cardColors } from "@/app/constants/card";
import { AddButton, NoteCard } from "@/app/components";

interface NoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (note: NoteRequest, image: File | null) => void;
}

export default function NoteForm({
  open,
  onOpenChange,
  onSubmit,
}: NoteFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("gold");

  const currentCategory = categories.find(
    (item) => item.value === selectedCategory,
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    mode: "onChange",
  });

  const name =
    useWatch({
      control,
      name: "name",
    }) ?? "";

  const message =
    useWatch({
      control,
      name: "message",
    }) ?? "";

  const selectCategory = (value: string) => {
    setSelectedCategory(value);

    setValue("category", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const clearForm = () => {
    reset();
    setImage(null);
    setSelectedCategory("");
    setSelectedColor("gold");
  };

  const submitForm = async (values: NoteFormData) => {
    const newNote = {
      name: values.name,
      message: values.message,
      image_url: "",
      category: values.category,
      card_color: selectedColor,
    };

    await onSubmit(newNote, image);

    clearForm();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          clearForm();
        }

        onOpenChange(value);
      }}
    >
      <DialogContent
        className="
          overflow-hidden
          border-0
          bg-transparent
          p-0
          shadow-none
          ring-0
          outline-none
          sm:max-w-6xl
        "
      >
        <div
          className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-[1fr_420px]
          items-start
        "
        >
          {/* LEFT FORM CARD */}
          <div
            className="
            rounded-3xl
            bg-white
            p-6
            shadow-xl
          "
          >
            <DialogHeader className="mb-6">
              <DialogTitle
                className="
                text-2xl
                font-medium
                text-[#1C1C1C]
              "
              >
                ✨ ฝากข้อความจากใจ ✨
              </DialogTitle>

              <DialogDescription
                className="
                mt-2
                text-base!
                leading-8!
                text-[#6B645B]!
              "
              >
                ฝากความรู้สึกดี ๆ ผ่านข้อความเล็ก ๆ ที่มีความหมาย
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  className="
                  mb-2
                  block
                  text-lg
                  font-medium
                  text-[#333333]
                "
                >
                  ชื่อ
                </label>

                <Input
                  {...register("name")}
                  placeholder="ชื่อของคุณ"
                  maxLength={35}
                  className="
                    h-12
                    rounded-xl
                    text-lg!
                    placeholder:text-sm
                  "
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  className="
                  mb-3
                  block
                  text-lg
                  font-medium
                  text-[#333333]
                "
                >
                  ประเภทคำอวยพร
                </label>

                <div className="flex flex-wrap gap-2">
                  {categories.map((item) => {
                    const selected = selectedCategory === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => selectCategory(item.value)}
                        className={`
                        rounded-full
                        border
                        px-4
                        py-2
                        text-sm
                        transition-all
                        duration-200

                        ${
                          selected
                            ? `
                          border-[#D4AF37]
                          bg-[#FAF7F2]
                          text-[#8A6E3B]
                          shadow-sm
                          `
                            : `
                          border-[#E8DCC8]
                          text-[#6B645B]
                          hover:bg-[#FAF7F2]
                          `
                        }
                      `}
                      >
                        {item.icon} {item.label}
                      </button>
                    );
                  })}
                </div>

                {errors.category && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  className="
                  mb-2
                  block
                  text-lg
                  font-medium
                  text-[#333333]
                "
                >
                  ข้อความ
                </label>

                <Textarea
                  {...register("message")}
                  maxLength={500}
                  placeholder={
                    currentCategory?.placeholder ??
                    "เขียนข้อความและความรู้สึกตรงนี้..."
                  }
                  className="
                  min-h-42
                  rounded-xl
                  resize-none
                  whitespace-pre-wrap
                  wrap-break-words
                  text-lg!
                  leading-9!
                  placeholder:text-sm
                "
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}

                <div
                  className="
                  mt-4
                  flex
                  justify-between
                  text-sm
                  text-neutral-400
                "
                >
                  <span>
                    {message.length > 100
                      ? "✨ ข้อความนี้อบอุ่นมาก"
                      : message.length > 1
                        ? "💛 กำลังเขียนความรู้สึก..."
                        : "💌 เริ่มต้นเขียนความรู้สึก"}
                  </span>

                  <span>{message.length}/500</span>
                </div>
              </div>

              {/* Image */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label
                    className="
                      text-lg
                      font-medium
                      text-[#333333]
                    "
                  >
                    รูปภาพ (ถ้ามี)
                  </label>

                  {!image && (
                    <label
                      className="
                        inline-flex
                        h-9
                        cursor-pointer
                        items-center
                        gap-1
                        rounded-full
                        border
                        border-[#E8DCC8]
                        px-4
                        text-sm
                        text-[#8A6E3B]
                        transition
                        hover:bg-[#FAF7F2]
                      "
                    >
                      📷 เพิ่มรูป
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

                {image && (
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-[#E8DCC8]
                      bg-[#FAF7F2]
                      px-4
                      py-2
                    "
                  >
                    <span className="max-w-62.5 truncate text-sm text-[#6B645B]">
                      🖼️ {image.name}
                    </span>

                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="
                        text-sm
                        text-red-400
                        hover:text-red-500
                      "
                    >
                      ลบ
                    </button>
                  </div>
                )}
              </div>

              {/* Card Color */}
              <div className="mb-3 flex items-center justify-between">
                <label
                  className="
                    mb-3
                    block
                    text-lg
                    font-medium
                    text-[#333333]
                  "
                >
                  สีการ์ด
                </label>

                <div className="flex gap-3">
                  {cardColors.map((item) => {
                    const selected = selectedColor === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setSelectedColor(item.value);

                          setValue("card_color", item.value, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                        className={`
                          h-7
                          w-7
                          rounded-full
                          border-2
                          transition
                          ${selected ? "border-[#1C1C1C] scale-110" : "border-transparent"}
                        `}
                        style={{
                          backgroundColor: item.code,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <AddButton
                type="submit"
                disabled={!isValid}
                classNameCustom="w-full"
              >
                ✨ ส่งข้อความจากใจ
              </AddButton>
            </form>
          </div>

          {/* RIGHT PREVIEW CARD */}
          <div
            className="
            hidden
            rounded-3xl
            bg-[#FAF7F2]
            p-6
            shadow-xl
            lg:block
          "
          >
            <h3
              className="
              mb-5
              text-lg
              font-medium
              text-[#333333]
            "
            >
              ✨ ตัวอย่างการ์ด
            </h3>
            <NoteCard
              name={name || "ชื่อของคุณ"}
              message={message || "ข้อความของคุณจะปรากฏที่นี่"}
              imageUrl={image ? URL.createObjectURL(image) : ""}
              createdAt={new Date().toLocaleDateString()}
              cardNo={1}
              category={currentCategory?.value || "type"}
              color={selectedColor}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
