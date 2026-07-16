"use client";

import Image from "next/image";
import Link from "next/link";
import { Club } from "@/types/clubs";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function OrgCard({ club }: { club: Club }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <Link
      href={`/org/${club.slug}`}
      className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform duration-200"
    >
      <div
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          transform: `perspective(400px) rotateX(${-tilt.y * 12}deg) rotateY(${tilt.x * 12}deg) translate(${tilt.x * 8}px, ${tilt.y * 8}px)`,
          transition: "transform 0.15s ease-out",
        }}
        className="mb-4"
      >
      <Image
        src={club.logo}
        alt={club.name}
        width={200}
        height={200}
        className="rounded-full object-cover shadow-xl shadow-[#081F71]/40"
      />
      </div>
      <h3 className={`${inter.className} font-semibold text-sm sm:text-base leading-tight line-clamp-2`}>{club.name}</h3>
    </Link>
  );
}