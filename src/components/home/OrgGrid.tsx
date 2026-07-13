import { Club } from "@/types/clubs";
import OrgCard from "./OrgCard";

export default function OrgGrid({ clubs }: { clubs: Club[] }) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8">
      {clubs.map((club) => (
        <OrgCard key={club.slug} club={club} />
      ))}
    </div>
  );
}