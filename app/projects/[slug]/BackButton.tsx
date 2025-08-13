"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back(); // Navigate back to the previous page
    } else {
      router.push("/"); // Redirect to the homepage (or portfolio page)
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className="flex items-center justify-center gap-3 bg-[#1a1a1a]/60 backdrop-blur-md border border-red-600 text-white px-6 py-3 rounded-full 
    hover:brightness-110  transition-all duration-300 ease-in-out 
    shadow-[0_0_12px_#ff1e00aa] hover:shadow-[0_0_20px_#ff1e00dd] text-sm sm:text-base min-h-[48px] group"
    >
      ← Back to Portfolio
    </button>
  );
}
