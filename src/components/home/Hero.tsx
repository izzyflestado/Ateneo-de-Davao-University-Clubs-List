import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Hero() {
  return (
    <section className="relative w-full h-[800px] md:h-[1000px] overflow-hidden">
      <Image
        src="/images/Hero.jpg"
        alt="Ateneo Organizations"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/100" />

      {/* Title - stays exactly where it was */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <p className="font-sans text-lg md:text-2xl tracking-[0.3em] font-medium text-white/90 mb-5">
            Ateneo de Davao's
          </p>

          <h1 className="font-[family:var(--font-cinzel)] text-6xl sm:text-7xl md:text-9xl lg:text-[8rem] leading-[0.95] drop-shadow-2xl">
  CLUBS AND ORGS
</h1>
        </div>
      </div>

      {/* Subtext - positioned independently, 200px below center */}
      <div className="absolute left-1/2 top-[calc(50%+275px)] -translate-x-1/2 w-full px-6">
        <p className={`${inter.className} text-white/90 text-sm md:text-base text-center max-w-2xl mx-auto leading-relaxed`}>
          This is an unofficial website containing all the basic information of all
          of Ateneo de Davao's Clubs and Organizations. This website is designed for
          students to help navigate and find all existing clubs inside Ateneo de Davao University. 
          All university, club and organization names and logos remain the property of their respective owners.
        </p>
      </div>
    </section>
  );
}