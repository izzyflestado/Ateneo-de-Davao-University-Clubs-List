import Image from "next/image";
import { notFound } from "next/navigation";
import clubs from "@/data/clubs.json";
import { Club } from "@/types/clubs";
import { Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Inter } from "next/font/google";

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
        <div className="flex items-center gap-8 min-w-0 flex-1">
          <Image
            src={club.logo}
            alt={club.name}
            width={180}
            height={180}
            className="rounded-full object-cover shadow-lg/30"
          />
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            {club.name}
          </h1>
        </div>

        <div
  className={`${inter.className} w-full md:basis-96 md:flex-none rounded-2xl border border-gray-200 bg-white p-6`}
>
  <p className="text-lg font-semibold text-center mb-4">Contact Information</p>
          <p className="flex items-center gap-2 text-sm mb-4">
            <Mail size={16} /> {club.contact.email}
          </p>
          <div className="flex flex-col gap-2 text-sm">
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
      <p className="text-gray-700 mb-8 mt-24 leading-relaxed text-xl text-center px-34 md:px-60">{club.description}</p>

 

    {/* Gallery */}
<div className="grid grid-cols-2 pt-16 gap-4 w-full mb-24">
  {club.gallery.map((img, i) => (
    <div key={i} className="relative rounded-2xl overflow-hidden aspect-video">
      <Image
        src={img}
        alt={`${club.name} gallery ${i + 1}`}
        width={600}
        height={400}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081F71]/60 to-transparent pointer-events-none" />
    </div>
  ))}
</div>

     {/* Moderator */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <Image
          src={club.moderator.image}
          alt={club.moderator.name}
          width={200}
          height={200}
          className="rounded-full object-cover shadow-lg/30"
        />
       <div className="text-center">
          <p className="text-base text-gray-500">Moderator</p>
          <p className="font-medium text-4xl">{club.moderator.name}</p>
        </div>
      </div>
    </div>
  );
}