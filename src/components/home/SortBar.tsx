"use client";

import { ChevronDown } from "lucide-react";
import { Inter } from "next/font/google";
import { SortMode } from "./OrgSection";

const inter = Inter({ subsets: ["latin"] });

const SCHOOLS = [
  "School of Business & Economics",
  "School of Engineering",
  "School of Arts & Sciences",
];

export default function SortBar({
  sortMode,
  onSortChange,
}: {
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
}) {
  return (
    <div className={`${inter.className} max-w-7xl mx-auto flex flex-col items-center gap-3 px-6 py-6 mt-16`}>
      <span className="text-sm font-medium tracking-[0.2em] text-gray-800">
        Sort By:</span>

      <div className="flex gap-3">
        <button
          onClick={() => onSortChange("alphabetical")}
          className={`px-4 py-2 rounded-lg border text-sm hover:bg-blue-200 ${
            sortMode === "alphabetical" ? "bg-[#081F71] hover:text-black text-white font-medium" : ""
          }`}
        >
          Alphabetical
        </button>
        <button
          onClick={() => onSortChange("category")}
          className={`px-4 py-2 rounded-lg border text-sm hover:bg-blue-100 ${
            sortMode === "category" ? "bg-[#081F71] hover:text-black text-white font-medium" : ""
          }`}
        >
          Category
        </button>

        <div className="relative group">
          <button className="flex items-center gap-1 px-4 py-2 rounded-lg border text-sm hover:bg-gray-100">
            Jump to category
            <ChevronDown
              size={16}
              className="transition-transform duration-200 group-hover:rotate-180"
            />
          </button>

          <ul className="absolute top-full left-0 mt-1 w-56 bg-white border rounded-lg shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            {SCHOOLS.map((school) => (
              <li key={school} className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                {school}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}