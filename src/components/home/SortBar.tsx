"use client";

import { ChevronDown } from "lucide-react";

const SCHOOLS = [
  "School of Business & Economics",
  "School of Engineering",
  "School of Arts & Sciences",
];

export default function SortBar() {
  return (
    <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 px-6 py-4">
      <span className="text-sm font-medium text-gray-600">Sort By:</span>

      <div className="flex gap-3">
        <button className="border rounded-md px-3 py-2 text-sm outline-none hover:bg-gray-100">
          Alphabetical
        </button>
        <button className="border rounded-md px-3 py-2 text-sm outline-none hover:bg-gray-100">
          School
        </button>

        <div className="relative group">
          <button className="flex items-center gap-1 border rounded-md px-3 py-2 text-sm outline-none hover:bg-gray-100">
            Jump to school
            <ChevronDown
              size={16}
              className="transition-transform duration-200 group-hover:rotate-180"
            />
          </button>

          <ul className="absolute top-full left-0 mt-1 w-56 bg-white border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            {SCHOOLS.map((school) => (
              <li
                key={school}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
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