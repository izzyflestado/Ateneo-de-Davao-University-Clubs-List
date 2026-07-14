"use client";

import { ChevronDown } from "lucide-react";
import { Inter } from "next/font/google";
import { SortMode } from "@/types/sort";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function SortBar({
  sortMode,
  onSortChange,
  categories,
  onJumpToCategory,
}: {
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
  categories: string[];
  onJumpToCategory: (category: string) => void;
}) {
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  return (
    <div className={`${inter.className} max-w-7xl mx-auto flex flex-col items-center gap-3 px-6 py-6 mt-16`}>
      <span className="text-sm font-medium tracking-[0.2em] text-gray-800">
        Sort By:</span>

      <div className="flex flex-wrap justify-center gap-2">
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
          className={`px-4 py-2 rounded-lg border text-sm hover:bg-blue-200 ${
            sortMode === "category" ? "bg-[#081F71] hover:text-black text-white font-medium" : ""
          }`}
        >
          Category
        </button>

        <div className="relative">
          <button
            onClick={() => setShowCategoryMenu((prev) => !prev)}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border text-sm hover:bg-blue-200 whitespace-nowrap w-full"
          >
            Jump to category
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${showCategoryMenu ? "rotate-180" : ""}`}
            />
          </button>

          <ul className={`absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-md transition-all duration-200 z-50 max-h-[180px] overflow-y-auto ${
            showCategoryMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}>
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => {
                  onJumpToCategory(category);
                  setShowCategoryMenu(false);
                }}
                className="px-3 py-2 text-sm hover:bg-[#081F71] hover:text-white cursor-pointer"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}