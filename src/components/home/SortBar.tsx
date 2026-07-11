"use client";

import { ChevronDown } from "lucide-react";

const SCHOOLS = [
  "School of Business & Economics",
  "School of Engineering",
  "School of Arts & Sciences",
  "Student Government",
  "Socio-Civic",
  "SAMAHAN Central Board"
];

export default function SortBar() {
  return (
    <div className="max-w-7xl mx-auto mt-14 flex flex-col items-center py-8 font-[family:var(--font-inter)]">
  <span className="mb-4 text-sm uppercase tracking-[0.25em]">
    Sort By
  </span>

  <div className="flex flex-wrap items-center justify-center gap-3">
    <button className="border rounded-md px-4 py-2 text-sm hover:bg-blue-100 transition">
      Alphabetical
    </button>

    <button className="border rounded-md px-4 py-2 text-sm hover:bg-blue-100 transition">
      School
    </button>

    <div className="relative group">
      <button className="flex items-center gap-2 border rounded-md px-4 py-2 text-sm hover:bg-blue-100 transition">
        Jump to Category
        <ChevronDown
          size={16}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </button>

      <ul className="absolute top-full left-0 mt-2 w-56 rounded-md border bg-white shadow-lg opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100 z-50">
        {SCHOOLS.map((school) => (
          <li
            key={school}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
          >
            {school}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
  );
}