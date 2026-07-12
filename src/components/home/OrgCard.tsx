import Image from "next/image";
import Link from "next/link";
import { Club } from "@/types/club";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function OrgCard({ club }: { club: Club }) {
  return (
    <Link
      href={`/org/${club.slug}`}
      className="flex flex-col items-center text-center p-4 hover:scale-105 transition-transform duration-200"
    >
      <Image
        src={club.logo}
        alt={club.name}
        width={200}
        height={200}
        className="rounded-full object-cover mb-4"
      />
      <h3 className={`${inter.className} font-semibold text-base`}>{club.name}</h3>
    </Link>
  );
}