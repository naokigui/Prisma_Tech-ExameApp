"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../app/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                  px-6 md:px-16 py-4 transition-all duration-300
                  bg-off-white/85 backdrop-blur-md border-b border-border-light
                  ${scrolled ? "shadow-[0_4px_24px_rgba(26,222,196,.08)]" : ""}`}
    >
      <div className="flex items-center gap-3 font-display font-extrabold text-xl text-c-title">
      <div className="flex items-center justify-center">
        <Image
        src={logoImg}
        alt="Exame App Logo"
        width={64} 
        height={64}
        className="rounded-lg"
        priority
      />
      </div>
        Exame App
      </div>

      <Link
        href="#waitlist"
        className="bg-primary text-white text-sm font-medium
                   px-5 py-2.5 rounded-xl
                   hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5
                   shadow-primary-sm hover:shadow-primary-md"
      >
        Quero acesso ✦
      </Link>
    </nav>
  );
}