"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ModeratorImage({ src, name }: { src: string; name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={name}
        width={200}
        height={200}
        onClick={() => setOpen(true)}
        className="rounded-full object-cover shadow-lg/30 cursor-pointer"
      />

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white cursor-pointer"
          >
            <X size={28} />
          </button>
          <Image
            src={src}
            alt={name}
            width={800}
            height={800}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}