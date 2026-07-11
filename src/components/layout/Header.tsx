"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { Cinzel } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const cinzel = Cinzel({ subsets: ["latin"] });

const MOCK_ORGS = ["Ateneo CS Society", "Debate Society", "Green Ateneo", "Blue Knights"];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isScrolledRef = useRef(false);
const lastYRef = useRef(0);
const isSnappingRef = useRef(false);

useEffect(() => {
  const THRESHOLD = 25;
  const SNAP_DOWN = 120;
  const SNAP_UP = 0;
  const FAST_SCROLL_DELTA = 30;

  lastYRef.current = window.scrollY;

  const handleScroll = () => {
    if (isSnappingRef.current) return;

    const scrollY = window.scrollY;
    const delta = Math.abs(scrollY - lastYRef.current);
    lastYRef.current = scrollY;

    const isFastScroll = delta > FAST_SCROLL_DELTA;

    if (!isScrolledRef.current && scrollY > THRESHOLD) {
      isScrolledRef.current = true;
      setIsScrolled(true);
      if (!isFastScroll) {
        isSnappingRef.current = true;
        window.scrollTo({ top: SNAP_DOWN, behavior: "smooth" });
        setTimeout(() => { isSnappingRef.current = false; }, 700);
      }
    } else if (isScrolledRef.current && scrollY < THRESHOLD) {
      isScrolledRef.current = false;
      setIsScrolled(false);
      if (!isFastScroll) {
        isSnappingRef.current = true;
        window.scrollTo({ top: SNAP_UP, behavior: "smooth" });
        setTimeout(() => { isSnappingRef.current = false; }, 700);
      }
    }
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

  const filtered = MOCK_ORGS.filter((org) =>
    org.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header
      className={`w-full sticky top-0 z-50 relative transition-all duration-700 ease-in-out bg-[#081F71] ${
        isScrolled ? "py-3 shadow-md" : "py-10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/orgs/1white.png"
            alt="Ateneo Logo"
            width={isScrolled ? 36 : 72}
            height={isScrolled ? 36 : 72}
            className="transition-all duration-700 ease-in-out"
          />
          <span
            className={`${cinzel.className} text-white transition-all duration-700 ease-in-out ${
              isScrolled ? "text-lg" : "text-4xl"
            }`}
          >
            Ateneo de Davao University
          </span>
        </div>

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
                filtered.map((org) => (
                  <li
                    key={org}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                  >
                    {org}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-400">No results</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {!isScrolled && (
        <div className="absolute left-0 top-full w-full h-24 bg-gradient-to-b from-[#081F71]/100 to-white/0 pointer-events-none" />
      )}
    </header>
  );
}