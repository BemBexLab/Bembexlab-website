"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Category configuration
const MODAL_CATEGORIES = ["LOGO DESIGN", "BRANDING", "ILLUSTRATION", "PRINT"];

const ROUTE_CATEGORIES = [
  "WEB DEVELOPMENT",
  "SHOPIFY",
  "WORDPRESS",
  "FIGMA DESIGN",
  // "UI UX DESIGN",
];

const categories = [...ROUTE_CATEGORIES, ...MODAL_CATEGORIES];

const FIGMA_CARD_HEIGHT = 500;

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: {
    project_image?: { url: string };
    project_url?: string;
    catogary?: string | string[];
  };
}

const ProjectCardGrid = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("WEB DEVELOPMENT");
  const [hoveredFigmaCard, setHoveredFigmaCard] = useState<number | null>(null);
  const [scrollOffsets, setScrollOffsets] = useState<Record<number, number>>(
    {}
  );
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Post | null>(null);

  const filteredPosts = posts.filter((post) => {
    const cat = post.acf?.catogary;
    if (!cat) return false;
    if (Array.isArray(cat)) {
      return cat.some(
        (c) => c.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    return cat.toLowerCase() === selectedCategory.toLowerCase();
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const ts = Date.now();
        const res = await fetch(`/api/posts?ts=${ts}`, { cache: "no-store" });
        const data = await res.json();
        const projectPosts = data.filter(
          (post: Post) => post.acf?.project_image?.url && post.slug
        );
        setPosts(projectPosts);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };
    fetchPosts();
  }, []);


  const isFigmaCard = (post: Post) => {
    const cat = post.acf?.catogary;
    if (Array.isArray(cat)) {
      return cat.some((c) => c.toLowerCase() === "figma design");
    }
    return cat?.toLowerCase() === "figma design";
  };

  const handleImageLoad = (postId: number) => {
    const img = imgRefs.current[postId];
    if (img) {
      setTimeout(() => {
        const displayedHeight = img.offsetHeight;
        const maxScroll = Math.max(displayedHeight - FIGMA_CARD_HEIGHT, 0);
        setScrollOffsets((prev) => ({ ...prev, [postId]: maxScroll }));
      }, 10);
    }
  };

  // Modal open logic
  const handleCardClick = (post: Post) => {
    // If current category is in MODAL_CATEGORIES, open modal
    if (
      MODAL_CATEGORIES.some((cat) =>
        (Array.isArray(post.acf?.catogary)
          ? post.acf?.catogary
          : [post.acf?.catogary]
        )
          ?.map((c) => c?.toLowerCase())
          .includes(cat.toLowerCase())
      )
    ) {
      setModalProject(post);
      setModalOpen(true);
    }
  };

  // Modal close logic (on background click or close button)
  const closeModal = () => {
    setModalOpen(false);
    setModalProject(null);
  };

  // Determine if selectedCategory uses modal
  const isModalCategory = MODAL_CATEGORIES.includes(selectedCategory);

  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto bg-[#0A0A11] text-white">
      {/* Section Heading */}
      <p className="text-[#DE2F04] font-semibold mb-2 text-center">
        Featured Projects
      </p>
      <h2 className="text-white text-4xl sm:text-5xl font-bold mb-10 leading-tight text-center">
        Our{" "}
        <span className="bg-gradient-to-r from-[#DE2F04] to-white text-transparent bg-clip-text">
          Portfolio
        </span>
      </h2>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((label) => (
          <span
            key={label}
            onClick={() => setSelectedCategory(label)}
            className={`px-4 py-1.5 text-sm sm:text-base rounded-full border backdrop-blur-md cursor-pointer transition shadow-[0_0_8px_#ff1e00aa] ${
              selectedCategory === label
                ? "bg-[#DE2F04] border-[#DE2F04] text-white"
                : "bg-[#1a1a1a]/60 border-[#ff4d2d] hover:brightness-110"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Projects Grid or Loading Message */}
      {posts.length === 0 ? (
        <div className="text-white text-center py-10">Loading Projects...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {filteredPosts.map((post) => {
            const imageUrl = post.acf?.project_image?.url || "/default.jpg";
            const figma = isFigmaCard(post);
            const scrollAmount = scrollOffsets[post.id] || 0;
            // Check if card should use modal
            const useModal =
              MODAL_CATEGORIES.some((cat) =>
                (Array.isArray(post.acf?.catogary)
                  ? post.acf?.catogary
                  : [post.acf?.catogary]
                )
                  ?.map((c) => c?.toLowerCase())
                  .includes(cat.toLowerCase())
              ) && isModalCategory;

            if (useModal) {
              // Modal: click to open project in modal
              return (
                <div
                  key={post.id}
                  className={`group relative w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-[#DE2F04]/60 bg-black cursor-pointer`}
                  onClick={() => handleCardClick(post)}
                  style={figma ? { height: `${FIGMA_CARD_HEIGHT}px` } : {}}
                  onMouseEnter={() => figma && setHoveredFigmaCard(post.id)}
                  onMouseLeave={() => figma && setHoveredFigmaCard(null)}
                >
                  <div
                    className={`w-full ${
                      figma ? "h-full overflow-hidden relative" : ""
                    }`}
                  >
                    <img
                      ref={(el) => {
                        if (figma) imgRefs.current[post.id] = el;
                      }}
                      src={imageUrl}
                      alt={post.title.rendered}
                      className={`w-full object-cover object-top transition-transform duration-[2500ms] ease-in-out ${
                        figma
                          ? "h-auto"
                          : "h-auto object-center group-hover:scale-110"
                      }`}
                      style={
                        figma
                          ? {
                              minHeight: "100%",
                              willChange: "transform",
                              transform:
                                hoveredFigmaCard === post.id && scrollAmount > 0
                                  ? `translateY(-${scrollAmount}px)`
                                  : "translateY(0)",
                              transition:
                                "transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            }
                          : {}
                      }
                      onLoad={() => figma && handleImageLoad(post.id)}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium text-lg text-center w-full truncate">
                      {post.title.rendered}
                    </span>
                  </div>
                </div>
              );
            } else {
              // Dynamic route link for all other categories
              return (
                <Link
                  key={post.id}
                  href={`/projects/${post.slug}`}
                  className={`group relative w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-[#DE2F04]/60 bg-black`}
                  style={figma ? { height: `${FIGMA_CARD_HEIGHT}px` } : {}}
                  onMouseEnter={() => figma && setHoveredFigmaCard(post.id)}
                  onMouseLeave={() => figma && setHoveredFigmaCard(null)}
                >
                  <div
                    className={`w-full ${
                      figma ? "h-full overflow-hidden relative" : ""
                    }`}
                  >
                    <img
                      ref={(el) => {
                        if (figma) imgRefs.current[post.id] = el;
                      }}
                      src={imageUrl}
                      alt={post.title.rendered}
                      className={`w-full object-cover object-top transition-transform duration-[2500ms] ease-in-out ${
                        figma
                          ? "h-auto"
                          : "h-auto object-center group-hover:scale-110"
                      }`}
                      style={
                        figma
                          ? {
                              minHeight: "100%",
                              willChange: "transform",
                              transform:
                                hoveredFigmaCard === post.id && scrollAmount > 0
                                  ? `translateY(-${scrollAmount}px)`
                                  : "translateY(0)",
                              transition:
                                "transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
                            }
                          : {}
                      }
                      onLoad={() => figma && handleImageLoad(post.id)}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium text-lg text-center w-full truncate">
                      {post.title.rendered}
                    </span>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      )}

      {/* MODAL for LOGO/BRANDING/ILLUSTRATION/PRINT */}
      {modalOpen && modalProject && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
          <div className="relative p-6 max-w-lg w-full flex flex-col items-center">
            <button
              className="absolute top-0 right-0 text-2xl text-[#DE2F04] hover:text-black transition"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={modalProject.acf?.project_image?.url || "/default.jpg"}
              alt={modalProject.title.rendered}
              className="w-full h-auto max-h-[620px] rounded-lg mb-4 object-contain"
            />
            {/* Optional: Add project description or extra info if needed */}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectCardGrid;
