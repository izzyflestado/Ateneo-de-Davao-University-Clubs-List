"use client";

import { useState } from "react";
import clubs from "@/data/clubs.json";
import { Club } from "@/types/club";
import SortBar from "./SortBar";
import OrgGrid from "./OrgGrid";

export type SortMode = "alphabetical" | "category";

export default function OrgSection() {
  const [sortMode, setSortMode] = useState<SortMode>("alphabetical");

  const typedClubs = clubs as Club[];

  const sortedClubs = [...typedClubs].sort((a, b) => {
    if (sortMode === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  return (
    <div>
      <SortBar sortMode={sortMode} onSortChange={setSortMode} />
      <OrgGrid clubs={sortedClubs} />
    </div>
  );
}