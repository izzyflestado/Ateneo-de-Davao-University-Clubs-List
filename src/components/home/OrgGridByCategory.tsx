import { Club } from "@/types/clubs";
import OrgCard from "./OrgCard";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function OrgGridByCategory({ clubs }: { clubs: Club[] }) {
  const grouped = clubs.reduce<Record<string, Club[]>>((acc, club) => {
    if (!acc[club.category]) acc[club.category] = [];
    acc[club.category].push(club);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-18">
      {categories.map((category) => (
        <div key={category} id={category.toLowerCase().replace(/\s+/g, "-")}>
          <h2 id={id} className={`${inter.className} text-2xl font-bold`}>{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {grouped[category].map((club) => (
              <OrgCard key={club.slug} club={club} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}