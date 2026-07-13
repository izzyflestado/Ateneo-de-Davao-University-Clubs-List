"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { Cinzel } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const cinzel = Cinzel({ subsets: ["latin"] });

import clubs from "@/data/clubs.json";
import { Club } from "@/types/club";
import Link from "next/link";

const typedClubs = clubs as Club[];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isOrgPage = pathname?.startsWith("/org/");

  useEffect(() => {
    const THRESHOLD = 25;
    const SNAP_DOWN = 150;
    const SNAP_UP = 0;
    const FAST_SCROLL_DELTA = 30;

    let lastY = window.scrollY;
    let isSnapping = false;

    const handleScroll = () => {
      if (isSnapping) return;

      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastY);
      lastY = scrollY;

      const isFastScroll = delta > FAST_SCROLL_DELTA;

      setIsScrolled((prevScrolled) => {
        if (!prevScrolled && scrollY > THRESHOLD) {
          if (!isFastScroll) {
            isSnapping = true;
            window.scrollTo({ top: SNAP_DOWN, behavior: "smooth" });
            setTimeout(() => { isSnapping = false; }, 500);
          }
          return true;
        } else if (prevScrolled && scrollY < THRESHOLD) {
          if (!isFastScroll) {
            isSnapping = true;
            window.scrollTo({ top: SNAP_UP, behavior: "smooth" });
            setTimeout(() => { isSnapping = false; }, 500);
          }
          return false;
        }
        return prevScrolled;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = typedClubs.filter((club) =>
  club.name.toLowerCase().includes(query.toLowerCase())
);

  const compact = isOrgPage || isScrolled;

  return (
    <header
      className={`w-full sticky top-0 z-50 relative transition-all duration-700 bg-[#081F71] ${
        compact ? "py-3 shadow-md" : "py-10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 gap-6">
        <Link href="/" className="flex items-center gap-3">
  <Image
    src="/orgs/1white.png"
    alt="Ateneo Logo"
    width={compact ? 36 : 72}
    height={compact ? 36 : 72}
    className="transition-all duration-500"
  />
  <span
    className={`${cinzel.className} text-white transition-all duration-500 ${
      compact ? "text-lg" : "text-4xl"
    }`}
  >
    Ateneo de Davao University
  </span>
</Link>

        <div ref={wrapperRef} className="relative w-full max-w-xs">
          <div className="flex items-center justify-between gap-2 border-b border-white px-2 py-1">
            <input
              type="text"
              className="w-full outline-none text-sm bg-transparent text-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />
            <Search size={18} className="text-white" />
          </div>

          {showDropdown && query && (
            <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 z-50">
              {filtered.length > 0 ? (
  filtered.map((club) => (
    <li key={club.slug}>
      <Link
        href={`/org/${club.slug}`}
        onClick={() => {
          setQuery("");
          setShowDropdown(false);
        }}
        className="block px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
      >
        {club.name}
      </Link>
    </li>
  ))
) : (
  <li className="px-3 py-2 text-sm text-gray-400">No results</li>
)}
            </ul>
          )}
        </div>
      </div>

      {!isOrgPage && !isScrolled && (
        <div className="absolute left-0 top-full w-full h-24 bg-gradient-to-b from-[#081F71]/100 to-white/0 pointer-events-none" />
      )}
    </header>
  );
}
