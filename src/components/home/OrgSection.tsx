"use client";

import { useState } from "react";
import clubs from "@/data/clubs.json";
import { Club } from "@/types/club";
import SortBar from "./SortBar";
import OrgGrid from "./OrgGrid";
import OrgGridByCategory from "./OrgGridByCategory";

import { SortMode } from "@/types/sort";

export default function OrgSection() {
  const [sortMode, setSortMode] = useState<SortMode>("alphabetical");

  const typedClubs = clubs as Club[];

  const alphabeticalClubs = [...typedClubs].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div>
      <SortBar sortMode={sortMode} onSortChange={setSortMode} />
      {sortMode === "alphabetical" ? (
        <OrgGrid clubs={alphabeticalClubs} />
      ) : (
        <OrgGridByCategory clubs={typedClubs} />
      )}
    </div>
  );
}