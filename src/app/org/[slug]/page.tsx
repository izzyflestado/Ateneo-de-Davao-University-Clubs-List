import Image from "next/image";
import { notFound } from "next/navigation";
import clubs from "@/data/clubs.json";
import { Club } from "@/types/club";
import { Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

const typedClubs = clubs as Club[];

export default async function OrgPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = typedClubs.find((c) => c.slug === slug);

  if (!club) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="flex items-center gap-4">
          <Image
            src={club.logo}
            alt={club.name}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <h1 className="text-2xl font-bold">
            {club.name}
          </h1>
        </div>

        <div className="border rounded-xl p-4 w-full md:w-64">
          <p className="flex items-center gap-2 text-sm mb-2">
            <Mail size={16} /> {club.contact.email}
          </p>
          <div className="flex gap-3">
            {club.contact.facebook && (
                <a href={club.contact.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
                </a>
            )}
            {club.contact.instagram && (
                <a href={club.contact.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                </a>
            )}
            {club.contact.linkedin && (
                <a href={club.contact.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
                </a>
            )}
            </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-8 leading-relaxed">{club.description}</p>

      {/* Moderator */}
      <div className="flex items-center gap-4 mb-10">
        <Image
          src={club.moderator.image}
          alt={club.moderator.name}
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-500">Moderator</p>
          <p className="font-medium">{club.moderator.name}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 gap-4 max-w-md">
        {club.gallery.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`${club.name} gallery ${i + 1}`}
            width={300}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        ))}
      </div>
    </div>
  );
}