"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Career", href: "/career" },
  { label: "Packages", href: "/packages" },
  { label: "Contact us", href: "contact-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black ${
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-transparent px-4 md:px-10 py-4 flex justify-between items-center">
        {/* 🔰 Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 ml-2 md:ml-6">
            <Image
              src="/Bembex-logo.png"
              alt="Bembex Logo"
              width={130}
              height={50}
            />
          </div>
        </Link>

        {/* 🌐 Desktop Nav Links */}
        <div className="hidden min-[1060px]:block">
          <nav className="relative rounded-full px-6 md:px-10 py-3 flex gap-4 md:gap-8 items-center backdrop-blur-md bg-[#1a1a1a]/60 text-white border-b-2 border-[#ff1e00] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_2px_6px_rgba(255,30,0,0.15)] z-50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm whitespace-nowrap ${
                  pathname === item.href
                    ? "text-red-500 font-semibold underline underline-offset-[10px]"
                    : "text-white"
                } hover:text-red-400 transition`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 🚀 CTA Button (hidden on xs) */}
        <Link href="/contact-us">
          <div className="hidden lg:flex">
            <button className="rounded-full px-6 py-2 border-b-2 border-[#ff1e00] text-white bg-[#1a1a1a]/60 backdrop-blur-md flex items-center gap-2 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_2px_6px_rgba(255,30,0,0.15)] hover:brightness-110 transition">
              Book a call <span className="text-xl">→</span>
            </button>
          </div>
        </Link>

        {/* 📱 Mobile Menu Button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white border border-[#ff1e00] rounded-full px-4 py-2 text-sm"
          >
            {menuOpen ? "✕ Close" : "☰ Menu"}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md px-4 py-6 flex flex-col gap-4 z-40 lg:hidden shadow-lg border-t border-[#ff1e00]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base ${
                pathname === item.href
                  ? "text-red-500 font-semibold underline underline-offset-4"
                  : "text-white"
              } hover:text-red-400 transition`}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <button className="mt-4 rounded-full px-6 py-3 border border-[#ff1e00] text-white bg-[#1a1a1a]/60 backdrop-blur-md shadow-md hover:brightness-110 transition">
            Book a call →
          </button>
        </div>
      )}
    </header>
  );
}
