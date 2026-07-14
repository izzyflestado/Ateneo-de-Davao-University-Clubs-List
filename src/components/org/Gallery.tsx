"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 -mt-4 md:mt-0 pt-0 md:pt-16 gap-4 w-full mb-24">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelected(img)}
            className="relative rounded-2xl overflow-hidden aspect-video cursor-pointer"
          >
            <Image
              src={img}
              alt={`${name} gallery ${i + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081F71]/60 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-6"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 text-white cursor-pointer"
          >
            <X size={28} />
          </button>
          <Image
            src={selected}
            alt={name}
            width={1200}
            height={800}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}