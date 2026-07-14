"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { Cinzel } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const cinzel = Cinzel({ subsets: ["latin"] });

import clubs from "@/data/clubs.json";
import { Club } from "@/types/clubs";
import Link from "next/link";

const typedClubs = clubs as Club[];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  

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
    setMobileSearchOpen(false);
  }
};
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filtered = typedClubs
  .filter((club) => club.name.toLowerCase().includes(query.toLowerCase()))
  .sort((a, b) => a.name.localeCompare(b.name))
  .slice(0, 3);

  const compact = isOrgPage || isScrolled;

  return (
    <header
      className={`w-full sticky top-0 z-50 relative transition-all duration-700 bg-[#081F71] ${
        compact ? "py-3 shadow-md" : "py-10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 gap-6 relative">
        <Link
  href="/"
  onClick={(e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }}
  className="flex items-center gap-3 min-w-0"
>
  <Image
  src="/images/1white.png"
  alt="Ateneo Logo"
  width={72}
  height={72}
  className={`transition-all duration-500 ${
    compact ? "w-7 h-7 sm:w-9 sm:h-9" : "w-14 h-14 sm:w-[72px] sm:h-[72px]"
  }`}
/>
  <span
        className={`${cinzel.className} text-white transition-all duration-500 whitespace-nowrap ${
      compact ? "text-[10px] sm:text-base md:text-lg" : "text-base sm:text-2xl md:text-4xl"
    }`}
  >
    Ateneo de Davao University
  </span>
</Link>

{/* Mobile: expanded overlay covering full row (logo + name) */}
{mobileSearchOpen && (
  <div className="sm:hidden absolute inset-0 bg-[#081F71] flex items-center px-6 z-50">
    <div className="relative flex items-center gap-2 w-full max-w-[240px] mx-auto border-b border-transparent focus-within:border-white transition-colors">
      <input
        ref={inputRef}
        autoFocus
        type="text"
        className="w-full outline-none text-sm bg-transparent text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
      />
      <button
        type="button"
        onClick={() => { setShowDropdown(true); inputRef.current?.focus(); }}
        className="flex items-center justify-center p-0 m-0 border-0 bg-transparent leading-none shrink-0 cursor-pointer"
      >
        <Search size={18} className="text-white" />
      </button>

      {showDropdown && query && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 z-50">
          {filtered.length > 0 ? (
            filtered.map((club) => (
              <li key={club.slug} className="border-b border-gray-200 last:border-b-0">
                <Link
                  href={`/org/${club.slug}`}
                  onClick={() => {
                    setQuery("");
                    setShowDropdown(false);
                    setMobileSearchOpen(false);
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
)}

        <div ref={wrapperRef} className="relative flex items-center justify-end w-auto sm:w-full sm:max-w-xs shrink-0">
  {/* Desktop: input always visible, no underline */}
  <div className="hidden sm:flex items-center gap-2 px-2 py-1 w-full border-b border-transparent focus-within:border-white transition-colors">
    <input
      ref={inputRef}
      type="text"
      className="w-full outline-none text-sm bg-transparent text-white"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={() => setShowDropdown(true)}
    />
    <button
      type="button"
      onClick={() => { setShowDropdown(true); inputRef.current?.focus(); }}
      className="flex items-center justify-center p-0 m-0 border-0 bg-transparent leading-none shrink-0 cursor-pointer"
    >
      <Search size={18} className="text-white" />
    </button>
  </div>

  {/* Mobile: icon only */}
  <button
    type="button"
    onClick={() => setMobileSearchOpen(true)}
    className="sm:hidden flex items-center justify-center p-0 m-0 border-0 bg-transparent leading-none shrink-0 cursor-pointer"
  >
    <Search size={18} className="text-white" />
  </button>


  {showDropdown && query && (
    <ul className="hidden sm:block absolute top-full right-0 w-[240px] sm:w-full sm:max-w-xs bg-white border rounded-md shadow-md mt-1 z-50">
  {filtered.length > 0 ? (
    filtered.map((club) => (
      <li key={club.slug} className="border-b border-gray-200 last:border-b-0">
        <Link
          href={`/org/${club.slug}`}
          onClick={() => {
            setQuery("");
            setShowDropdown(false);
            setMobileSearchOpen(false);
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
