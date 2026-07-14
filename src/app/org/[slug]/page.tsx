import Image from "next/image";
import { notFound } from "next/navigation";
import clubs from "@/data/clubs.json";
import { Club } from "@/types/clubs";
import { Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Inter } from "next/font/google";
import Gallery from "@/components/org/Gallery";
import ModeratorImage from "@/components/org/ModeratorImage";

const typedClubs = clubs as Club[];

const inter = Inter({ subsets: ["latin"] });

export default async function OrgPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = typedClubs.find((c) => c.slug === slug);

  if (!club) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="flex items-center gap-5 md:gap-8 min-w-0 flex-1">
          <Image
            src={club.logo}
            alt={club.name}
            width={180}
            height={180}
            className="rounded-full object-cover shadow-lg/30 w-20 h-20 md:w-[180px] md:h-[180px] shrink-0"
          />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight">
            {club.name}
          </h1>
        </div>

        <div
  className={`${inter.className} w-full max-w-[240px] mx-auto md:max-w-none md:mx-0 md:basis-96 md:flex-none rounded-2xl border border-gray-200 bg-white p-3 md:p-6`}
>
  <p className="text-sm md:text-lg font-semibold text-center mb-2 md:mb-4">Contact Information</p>
          <p className="flex items-center justify-center md:justify-start gap-1.5 text-xs md:text-sm mb-2 md:mb-4">
            <Mail size={14} className="md:w-4 md:h-4" /> {club.contact.email}
          </p>
          <div className="flex flex-col items-center md:items-start gap-1.5 text-xs md:text-sm">
  {club.contact.facebook && (
    <a
      href={club.contact.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-blue-600 transition-colors"
    >
      <FacebookIcon />
      <span>Facebook</span>
    </a>
  )}

  {club.contact.instagram && (
    <a
      href={club.contact.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-pink-600 transition-colors"
    >
      <InstagramIcon />
      <span>Instagram</span>
    </a>
  )}

  {club.contact.linkedin && (
    <a
      href={club.contact.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-blue-700 transition-colors"
    >
      <LinkedinIcon />
      <span>LinkedIn</span>
    </a>
  )}
</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-8 mt-10 md:mt-24 leading-relaxed text-sm md:text-xl text-center px-4 md:px-60">{club.description}</p>

 

    {/* Gallery */}
<Gallery images={club.gallery} name={club.name} />

     {/* Moderator */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <ModeratorImage src={club.moderator.image} name={club.moderator.name} />
       <div className="text-center">
          <p className="text-base text-gray-500">Moderator</p>
          <p className="font-medium text-4xl">{club.moderator.name}</p>
        </div>
      </div>
    </div>
  );
}