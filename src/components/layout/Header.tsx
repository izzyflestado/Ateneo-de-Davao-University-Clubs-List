"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });

const MOCK_ORGS = ["Ateneo CS Society", "Debate Society", "Green Ateneo", "Blue Knights"];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
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
      className={`w-full border-b bg-white sticky top-0 z-50 transition-shadow ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 gap-6">
        <div className="flex items-center gap-2">
          <Image src="/orgs/UniversitySeal.png" alt="Ateneo Logo" width={36} height={36} />
          <span className="font-[family-name:var(--font-cinzel)] text-lg md:text-xl ">
            Ateneo de Davao University
          </span>
        </div>

        <div ref={wrapperRef} className="relative w-64">
          <div className="flex items-center justify-between gap-2 border-b border-gray-400 px-2 py-1">
            <input
              className="w-full outline-none text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {showDropdown && query && (
            <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 z-50">
              {filtered.length > 0 ? (
                filtered.map((org) => (
                  <li
                    key={org}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
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
    </header>
  );
}