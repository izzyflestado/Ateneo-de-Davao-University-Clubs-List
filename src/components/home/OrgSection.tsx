"use client";

import { useState } from "react";
import clubs from "@/data/clubs.json";
import { Club } from "@/types/club";
import { SortMode } from "@/types/sort";
import SortBar from "./SortBar";
import OrgGrid from "./OrgGrid";
import OrgGridByCategory from "./OrgGridByCategory";

export default function OrgSection() {
  const [sortMode, setSortMode] = useState<SortMode>("category");

  const typedClubs = clubs as Club[];

  const alphabeticalClubs = [...typedClubs].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const categories = Array.from(new Set(typedClubs.map((c) => c.category))).sort();

  const handleJumpToCategory = (category: string) => {
  setSortMode("category");
  const id = category.toLowerCase().replace(/\s+/g, "-");
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100; // adjust this: negative = scroll less far (stop higher)
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, 100);
};

  return (
    <div>
      <SortBar
        sortMode={sortMode}
        onSortChange={setSortMode}
        categories={categories}
        onJumpToCategory={handleJumpToCategory}
      />
      {sortMode === "alphabetical" ? (
        <OrgGrid clubs={alphabeticalClubs} />
      ) : (
        <OrgGridByCategory clubs={typedClubs} />
      )}
    </div>
  );
}