"use client";

import { Mail } from "lucide-react";
import { ArrowUp } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
} from "@/components/icons/SocialIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center gap-2 md:gap-6 px-3 md:px-6 py-3 md:py-8 text-[10px] md:text-sm text-gray-600">
        {/* Left */}
        <div className="flex flex-col items-center md:items-start gap-2">
            <p>Made by: Romar Izzy P. Flestado</p>
            <div className="flex gap-3 [&_svg]:w-4 [&_svg]:h-4">
            <a href="mailto:izzyflestado.ph@gmail.com">
                <Mail size={16} />
            </a>
            <a href="https://www.facebook.com/megam1nd69420" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/megamind.69420/" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/in/izzyflestado/" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
            </a>
            <a href="https://github.com/izzyflestado" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
            </a>
            <a
  href="https://izzyfles.site"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:underline"
>
  izzyfles.site
</a>
            </div>
        </div>

        {/* Center */}
        <button
            onClick={scrollToTop}
            className="flex flex-col items-center gap-1 hover:text-blue-600 justify-self-center"
        >
            <ArrowUp size={18} />
            <span className="text-xs">Back to top</span>
        </button>

        {/* Right */}
        <p className="text-center md:text-right text-[8px] md:text-xs text-gray-400 justify-self-center md:justify-self-end max-w-[160px] md:max-w-xs">
            This is an unofficial, student-developed website<br className="hidden md:inline"/> created for informational and portfolio purposes.
            It is not affiliated with, endorsed by, or officially<br className="hidden md:inline"/> maintained by Ateneo de Davao University.
        </p>
        </div>
    </footer>
  );
}