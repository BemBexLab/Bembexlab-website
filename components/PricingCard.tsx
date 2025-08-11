import React, { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

// 1) Strongly-typed filters
const filters = [
  "Website",
  "E-commerce",
  "UI/UX",
  "Video Animation",
  "SEO",
  "Digital Marketing",
  "Graphic Designing"
] as const;

type Category = (typeof filters)[number];

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice: string;
  referralDiscount: string;
  features: PricingFeature[];
  variant: "side" | "center";
  isMobile?: boolean;
  category: Category; // <- categorize each card
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  originalPrice,
  referralDiscount,
  features,
  variant,
  isMobile = false,
}) => {
  const redColor = "#DE2F04";
  const grayColor = "#444444";

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl p-4 sm:p-6 flex flex-col h-full 
        ${
          variant === "center"
            ? "bg-opacity-10 border border-[#DE2F04]"
            : "bg-opacity-10 border border-neutral-900"
        }
        backdrop-filter backdrop-blur-lg
        ${isMobile ? "w-[280px] flex-shrink-0" : "w-full"}
      `}
      style={{ backgroundColor: "rgba(222, 47, 4, 0.10)" }}
    >
      {variant === "side" && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(to right, transparent, ${redColor}, transparent)`,
            }}
          />
          <div
            className="absolute bottom-0 top-1/2 left-0 w-1"
            style={{
              background: `linear-gradient(to top, ${redColor}, ${redColor}, transparent)`,
            }}
          />
          <div
            className="absolute bottom-0 top-1/2 right-0 w-1"
            style={{
              background: `linear-gradient(to top, ${redColor}, ${redColor}, transparent)`,
            }}
          />
        </div>
      )}

      {variant === "center" && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: redColor }}
          />
          <div
            className="absolute top-0 bottom-0 left-0 w-1 h-1/2"
            style={{
              background: `linear-gradient(to bottom, ${redColor}, ${redColor}, transparent)`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-1 h-1/2"
            style={{
              background: `linear-gradient(to bottom, ${redColor}, ${redColor}, transparent)`,
            }}
          />
        </div>
      )}

      <h3 className="text-[#DE2F04] text-lg sm:text-xl font-medium mb-2 sm:mb-4 relative z-10">
        {title}
      </h3>

      <div className="flex items-baseline mb-2 relative z-10">
        <span className="text-neutral-100 text-3xl sm:text-5xl md:text-7xl font-bold">
          {price}
        </span>
        <span className="text-[#DE2F04] text-sm sm:text-base md:text-xl ml-2 line-through">
          {originalPrice}
        </span>
      </div>

      <p className="text-neutral-400 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base relative z-10">
        Up to{" "}
        <span className="text-[#DE2F04] font-medium">{referralDiscount}</span>{" "}
        referral AAR
      </p>

      <div className="mb-2 text-neutral-300 text-xs sm:text-sm md:text-base font-medium relative z-10">
        includes:
      </div>
      <div className="flex-grow relative z-10">
        <div className="pl-3 sm:pl-4 space-y-1 sm:space-y-2 md:space-y-3 mb-4 sm:mb-6 md:mb-8 relative">
          <div
            className="absolute left-0 top-0 bottom-1/2 w-1"
            style={{ background: redColor }}
          />
          <div
            className="absolute left-0 top-1/2 bottom-0 w-1"
            style={{ background: grayColor }}
          />
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check
                size={14}
                className="text-neutral-400 mr-2 mt-0.5 flex-shrink-0"
              />
              <span className="text-neutral-300 text-xs sm:text-sm md:text-base">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/ContactUs" className="mt-auto relative z-10">
        <button
          className="w-full text-white py-2 sm:py-3 px-4 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base border border-[#DE2F04] backdrop-blur-[9.14px] shadow-[9.138px_-9.138px_9.138px_rgba(169,36,3,0.10)_inset,-9.138px_9.138px_9.138px_rgba(255,255,255,0.10)_inset] transition-colors duration-300"
          style={{
            background: "rgba(222, 47, 4, 0.10)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(222, 47, 4, 0.25)"; // darker hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(222, 47, 4, 0.10)"; // back to normal
          }}
        >
          <span className="mr-1 sm:mr-2">Buy Now</span>
          <ArrowRight size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </Link>
    </div>
  );
};

const PricingCards: React.FC = () => {
  // 2) Active filter + mobile index
  const [selectedFilter, setSelectedFilter] = useState<Category>("Website");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 3) Your full dataset with categories
const pricingData: PricingCardProps[] = [
  // ================= Website =================
  {
    title: "Basic Website Package",
    price: "$229",
    originalPrice: "$499",
    referralDiscount: "50%",
    features: [
      { text: "3 Page Website" },
      { text: "2 Stock Images" },
      { text: "1 jQuery Slider Banner" },
      { text: "Contact/Query Form" },
      { text: "Complete W3C Certified HTML" },
      { text: "48 to 72 hours TAT" },
      { text: "Complete Deployment" },
    ],
    variant: "side",
    category: "Website",
  },
  {
    title: "Standard Website Package",
    price: "$499",
    originalPrice: "$899",
    referralDiscount: "45%",
    features: [
      { text: "5 Page Website" },
      { text: "5 Stock Images" },
      { text: "2 Slider Banners" },
      { text: "CMS Integration" },
      { text: "Responsive Design" },
      { text: "Social Media Integration" },
      { text: "Complete Deployment" },
    ],
    variant: "center",
    category: "Website",
  },
  {
    title: "Premium Website Package",
    price: "$899",
    originalPrice: "$1599",
    referralDiscount: "45%",
    features: [
      { text: "10 Page Website" },
      { text: "Unlimited Stock Images" },
      { text: "Custom Design" },
      { text: "Advanced Animations" },
      { text: "SEO Optimization" },
      { text: "Dedicated Project Manager" },
      { text: "Free 1 Year Maintenance" },
    ],
    variant: "side",
    category: "Website",
  },

  // ================= E-commerce =================
  {
    title: "Starter E-commerce Package",
    price: "$399",
    originalPrice: "$799",
    referralDiscount: "50%",
    features: [
      { text: "Up to 20 Products" },
      { text: "Shopping Cart Integration" },
      { text: "Payment Gateway Setup" },
      { text: "Basic SEO" },
      { text: "Responsive Design" },
    ],
    variant: "side",
    category: "E-commerce",
  },
  {
    title: "Gold E-commerce Package",
    price: "$799",
    originalPrice: "$1399",
    referralDiscount: "45%",
    features: [
      { text: "Up to 50 Products" },
      { text: "Custom Product Pages" },
      { text: "Advanced Payment Gateway" },
      { text: "Inventory Management" },
      { text: "Email Marketing Integration" },
      { text: "Dedicated Project Manager" },
    ],
    variant: "center",
    category: "E-commerce",
  },
  {
    title: "Platinum E-commerce Package",
    price: "$1299",
    originalPrice: "$2199",
    referralDiscount: "40%",
    features: [
      { text: "Unlimited Products" },
      { text: "Custom UI/UX Design" },
      { text: "Advanced Analytics" },
      { text: "SEO & Speed Optimization" },
      { text: "Automated Marketing Tools" },
      { text: "Multi-vendor Capability" },
    ],
    variant: "side",
    category: "E-commerce",
  },

  // ================= UI/UX =================
  {
    title: "Basic UI/UX Package",
    price: "$199",
    originalPrice: "$399",
    referralDiscount: "50%",
    features: [
      { text: "Landing Page Design" },
      { text: "2 Revisions" },
      { text: "Wireframe & Mockup" },
      { text: "Mobile Friendly" },
    ],
    variant: "side",
    category: "UI/UX",
  },
  {
    title: "Standard UI/UX Package",
    price: "$499",
    originalPrice: "$899",
    referralDiscount: "45%",
    features: [
      { text: "Up to 5 Screens" },
      { text: "Custom Design" },
      { text: "Prototype Creation" },
      { text: "Responsive & Interactive" },
      { text: "3 Revisions" },
    ],
    variant: "center",
    category: "UI/UX",
  },
  {
    title: "Premium UI/UX Package",
    price: "$999",
    originalPrice: "$1799",
    referralDiscount: "45%",
    features: [
      { text: "Full Website/App UI" },
      { text: "UX Research & Flow Mapping" },
      { text: "Interactive Prototypes" },
      { text: "Unlimited Revisions" },
      { text: "Design System & Style Guide" },
    ],
    variant: "side",
    category: "UI/UX",
  },

  // ================= Video Animation =================
  {
    title: "Basic Animation Package",
    price: "$149",
    originalPrice: "$299",
    referralDiscount: "50%",
    features: [
      { text: "30 Seconds Animation" },
      { text: "Basic Voice Over" },
      { text: "Script Assistance" },
      { text: "HD Quality" },
    ],
    variant: "side",
    category: "Video Animation",
  },
  {
    title: "Standard Animation Package",
    price: "$399",
    originalPrice: "$699",
    referralDiscount: "45%",
    features: [
      { text: "60 Seconds Animation" },
      { text: "Professional Voice Over" },
      { text: "Script & Storyboard" },
      { text: "Custom Illustrations" },
    ],
    variant: "center",
    category: "Video Animation",
  },
  {
    title: "Premium Animation Package",
    price: "$799",
    originalPrice: "$1299",
    referralDiscount: "40%",
    features: [
      { text: "120 Seconds Animation" },
      { text: "Multiple Voice Overs" },
      { text: "Full Storyboarding" },
      { text: "Custom Characters & Effects" },
    ],
    variant: "side",
    category: "Video Animation",
  },

  // ================= SEO =================
  {
    title: "Basic SEO Package",
    price: "$199",
    originalPrice: "$399",
    referralDiscount: "50%",
    features: [
      { text: "5 Keywords" },
      { text: "On-page Optimization" },
      { text: "Monthly Report" },
    ],
    variant: "side",
    category: "SEO",
  },
  {
    title: "Standard SEO Package",
    price: "$499",
    originalPrice: "$899",
    referralDiscount: "45%",
    features: [
      { text: "15 Keywords" },
      { text: "On-page & Off-page Optimization" },
      { text: "Backlink Building" },
      { text: "Competitor Analysis" },
    ],
    variant: "center",
    category: "SEO",
  },
  {
    title: "Premium SEO Package",
    price: "$999",
    originalPrice: "$1799",
    referralDiscount: "45%",
    features: [
      { text: "30+ Keywords" },
      { text: "Full Technical SEO" },
      { text: "Content Creation" },
      { text: "Local & Global Targeting" },
    ],
    variant: "side",
    category: "SEO",
  },

  // ================= Digital Marketing =================
  {
    title: "Basic Digital Marketing",
    price: "$299",
    originalPrice: "$599",
    referralDiscount: "50%",
    features: [
      { text: "1 Social Media Platform" },
      { text: "8 Posts/Month" },
      { text: "Basic Ad Campaign" },
    ],
    variant: "side",
    category: "Digital Marketing",
  },
  {
    title: "Standard Digital Marketing",
    price: "$799",
    originalPrice: "$1399",
    referralDiscount: "45%",
    features: [
      { text: "2 Social Media Platforms" },
      { text: "20 Posts/Month" },
      { text: "Ad Campaign Management" },
      { text: "Monthly Reporting" },
    ],
    variant: "center",
    category: "Digital Marketing",
  },
  {
    title: "Premium Digital Marketing",
    price: "$1499",
    originalPrice: "$2499",
    referralDiscount: "40%",
    features: [
      { text: "All Social Media Platforms" },
      { text: "Unlimited Content" },
      { text: "Full Funnel Ad Strategy" },
      { text: "Influencer Collaborations" },
    ],
    variant: "side",
    category: "Digital Marketing",
  },

  // ================= Graphic Designing =================
  {
    title: "Basic Graphic Design Package",
    price: "$99",
    originalPrice: "$199",
    referralDiscount: "50%",
    features: [
      { text: "5 Social Media Designs" },
      { text: "2 Logo Concepts" },
      { text: "1 Banner Design" },
    ],
    variant: "side",
    category: "Graphic Designing",
  },
  {
    title: "Standard Graphic Design Package",
    price: "$299",
    originalPrice: "$599",
    referralDiscount: "45%",
    features: [
      { text: "15 Social Media Designs" },
      { text: "5 Logo Concepts" },
      { text: "5 Banners / Flyers" },
    ],
    variant: "center",
    category: "Graphic Designing",
  },
  {
    title: "Premium Graphic Design Package",
    price: "$599",
    originalPrice: "$999",
    referralDiscount: "40%",
    features: [
      { text: "Unlimited Social Media Designs" },
      { text: "Full Brand Identity Kit" },
      { text: "Packaging & Print Materials" },
    ],
    variant: "side",
    category: "Graphic Designing",
  },
];


  // 4) Filtered view derived from active filter
  const filteredCards = useMemo(
    () => pricingData.filter((p) => p.category === selectedFilter),
    [pricingData, selectedFilter]
  );

  // Keep mobile index in range when filter changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [selectedFilter]);

  return (
    <div>
      <section className="py-10 bg-[#0A0A11] text-white mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#DE2F04] mb-8">
            Packages
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-8">
            The Perfect Plans For Your Needs
          </h3>
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {filters.map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  aria-pressed={isActive}
                  className={`px-4 sm:px-6 py-1.5 sm:py-3 text-sm sm:text-base rounded-full border backdrop-blur-md cursor-pointer transition shadow-[0_0_8px_#ff1e00aa] ${
                    isActive
                      ? "bg-[#DE2F04] border-[#DE2F04] text-white"
                      : "bg-[#1a1a1a]/60 border-[#ff4d2d] hover:brightness-110"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-black min-h-screen py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-10">
            Choose Your Plan
          </h2>

          {/* Mobile (centered between arrows) */}
          <div className="md:hidden">
            {filteredCards.length ? (
              <div className="flex items-center w-full">
                {/* Left arrow - fixed width so it doesn't push center */}
                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev === 0 ? filteredCards.length - 1 : prev - 1
                    )
                  }
                  className="w-10 shrink-0 text-white p-2"
                  aria-label="Previous Package"
                >
                  ←
                </button>

                {/* Center area grows and centers the card */}
                <div className="flex-1 flex justify-center">
                  <div className="w-[280px]">
                    <PricingCard {...filteredCards[selectedIndex]} isMobile />
                  </div>
                </div>

                {/* Right arrow - same fixed width */}
                <button
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev === filteredCards.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-10 shrink-0 text-white p-2"
                  aria-label="Next Package"
                >
                  →
                </button>
              </div>
            ) : (
              <p className="text-center text-neutral-400">
                No packages in this category yet.
              </p>
            )}

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {filteredCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-2 h-2 rounded-full ${
                    selectedIndex === idx ? "bg-[#DE2F04]" : "bg-gray-600"
                  }`}
                  aria-label={`Go to package ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Tablet (2 cols) */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
            {filteredCards.length ? (
              filteredCards.map((card) => (
                <PricingCard key={card.title} {...card} />
              ))
            ) : (
              <div className="col-span-2 text-center text-neutral-400">
                No packages in this category.
              </div>
            )}
          </div>

          {/* Desktop (3 cols) */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {filteredCards.length ? (
              filteredCards.map((card) => (
                <PricingCard key={card.title} {...card} />
              ))
            ) : (
              <div className="col-span-3 text-center text-neutral-400">
                No packages in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
