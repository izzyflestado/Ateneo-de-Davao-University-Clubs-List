import clubs from "@/data/clubs.json";
import { Club } from "@/types/club";
import OrgCard from "./OrgCard";

export default function OrgGrid() {
  const typedClubs = clubs as Club[];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8">
      {typedClubs.map((club) => (
        <OrgCard key={club.slug} club={club} />
      ))}
    </div>
  );
}