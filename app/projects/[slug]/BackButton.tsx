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
      className="inline-block bg-[#DE2F04] hover:bg-white hover:text-black transition-colors duration-300 text-white font-medium px-6 py-3 rounded-full"
    >
      ← Back to Portfolio
    </button>
  );
}
