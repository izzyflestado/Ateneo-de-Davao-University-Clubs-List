import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[400px] md:h-[600px]">
      <Image
        src="/orgs/Hero.jpg"
        alt="Ateneo Organizations"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
          Ateneo Organizations & Clubs
        </h1>
      </div>
    </section>
  );
}