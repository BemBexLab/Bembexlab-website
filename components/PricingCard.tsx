"use client"

import React, { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

// 1) Strongly-typed filters
const filters = [
  "Website Design",
  "E-commerce",
  // "UI/UX",
  "Video Animation",
  "SEO",
  "Digital Marketing",
  "Logo",
  "Maintenance",
  "Branding",
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
        {/* FIXED ORANGE-GRAY LINE (now fixed, not scrolling) */}
        <div className="absolute left-0 top-0 h-full pointer-events-none space-y-3">
          <div className="w-1 h-2/5" style={{ background: redColor }} />
          <div className="w-1 h-2/5" style={{ background: grayColor }} />
        </div>

        {/* SCROLLABLE FEATURES LIST */}
        <div
          className="
      features-scroll
      pl-3 sm:pl-4 pr-2
      space-y-1 sm:space-y-2 md:space-y-3
      mb-4 sm:mb-6 md:mb-8
      relative
      max-h-[180px] sm:max-h-[200px] md:max-h-[220px]
      overflow-y-auto
    "
        >
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
            e.currentTarget.style.background = "rgba(222, 47, 4, 0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(222, 47, 4, 0.10)";
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
  const [selectedFilter, setSelectedFilter] = useState<Category>("Website Design");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 3) Your full dataset with categories
  const pricingData: PricingCardProps[] = [
    // ================= Website =================
    {
      title: "Basic Website Package",
      price: "$199",
      originalPrice: "$299",
      referralDiscount: "50%",
      features: [
        { text: "2 Stock Photos" },
        { text: "3 Page Website" },
        { text: "3 Banner Design" },
        { text: "1 jQuery Slider Banner" },
        { text: "FREE Google Friendly Sitemap" },
        { text: "Complete W3C Certified HTML" },
        { text: "48 to 72 hours TAT" },
        { text: "Facebook Page Design" },
        { text: "Twitter Page Design" },
        { text: "YouTube Page Design" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee *" },
        { text: "Mobile Responsive will be Additional $99*" },
        { text: "CMS will be Additional $149*" },
      ],
      variant: "side",
      category: "Website Design",
    },
    {
      title: "Standard Website Package",
      price: "$599",
      originalPrice: "$799",
      referralDiscount: "45%",
      features: [
        { text: "6 Unique Pages Website" },
        { text: "5 Stock images" },
        { text: "5 Banner Designs" },
        { text: "1 jQuery Slider Banner" },
        { text: "FREE Google Friendly Sitemap" },
        { text: "Complete W3C Certified HTML" },
        { text: "48 to 72 hours TAT" },
        { text: "Facebook Page Design" },
        { text: "Twitter Page Design" },
        { text: "YouTube Page Design" },
        { text: "Complete Deployment" },
        { text: "Mobile Responsive" },
        { text: "CMS (Content Management System)" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee *" },
      ],
      variant: "center",
      category: "Website Design",
    },
    {
      title: "Premium Website Package",
      price: "$875",
      originalPrice: "$1250",
      referralDiscount: "45%",
      features: [
        { text: "Upto 10 Unique Pages Website" },
        { text: "Conceptual and Dynamic Website" },
        { text: "Mobile Responsive" },
        { text: "Online Reservation/Appointment Tool (Optional)" },
        { text: "Online Payment Integration (Optional)" },
        { text: "Custom Forms" },
        { text: "Lead Capturing Forms (Optional)" },
        { text: "Special Hover Effects" },
        { text: "Newsletter Subscription (Optional)" },
        { text: "Newsfeed Integration" },
        { text: "Social Media Integration" },
        { text: "Search Engine Submission" },
        { text: "6 Stock Photos" },
        { text: "3 Unique Banner Design" },
        { text: "1 jQuery Slider Banner" },
        { text: "Complete W3C Certified HTML" },
        { text: "48 to 72 hours TAT" },
        { text: "Facebook Page Design" },
        { text: "Twitter Page Design" },
        { text: "YouTube Page Design" },
        { text: "Complete Deployment" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee *" },
      ],
      variant: "side",
      category: "Website Design",
    },

    // ================= E-commerce =================
    {
      title: "Basic E-commerce Package",
      price: "$999",
      originalPrice: "$1700",
      referralDiscount: "50%",
      features: [
        { text: "Upto 15 Unique Pages Website" },
        { text: "Conceptual and Dynamic Website" },
        { text: "Content Management System (CMS)" },
        { text: "Mobile Responsive" },
        { text: "Easy Product Search" },
        { text: "Product Reviews" },
        { text: "Up To 100 Products" },
        { text: "Up To 7 Categories" },
        { text: "Full Shopping Cart Integration" },
        { text: "Payment Module Integration" },
        { text: "Sales & Inventory Management" },
        { text: "Jquery Slider" },
        { text: "Free Google Friendly Sitemap" },
        { text: "FREE 1 Years Hosting" },
        { text: "Custom Email Addresses" },
        { text: "Complete W3C Certified HTML" },
        { text: "Facebook Page Design" },
        { text: "Twitter Page Design" },
        { text: "YouTube Page Design" },
        { text: "Complete Deployment" },
        { text: "Dedicated Accounts Manager" },
        { text: "100% Ownership Rights" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee" },
      ],
      variant: "side",
      category: "E-commerce",
    },
    {
      title: "Standard E-commerce Package",
      price: "$1750",
      originalPrice: "$2500",
      referralDiscount: "45%",
      features: [
        { text: "Unlimited Unique Pages Website" },
        { text: "Conceptual and Dynamic Website" },
        { text: "Content Management System (CMS)" },
        { text: "Mobile Responsive" },
        { text: "Easy Product Search" },
        { text: "Product Reviews" },
        { text: "Unlimited Products" },
        { text: "Unlimited Categories" },
        { text: "Full Shopping Cart Integration" },
        { text: "Payment Module Integration" },
        { text: "Sales & Inventory Management" },
        { text: "Jquery Slider" },
        { text: "Free Google Friendly Sitemap" },
        { text: "FREE 3 Years Hosting" },
        { text: "Custom Email Addresses" },
        { text: "Complete W3C Certified HTML" },
        { text: "Facebook Page Design" },
        { text: "Twitter Page Design" },
        { text: "YouTube Page Design" },
        { text: "Instagram Page Design" },
        { text: "Complete Deployment" },
        { text: "Dedicated Accounts Manager" },
        { text: "100% Ownership Rights" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee" },
      ],
      variant: "center",
      category: "E-commerce",
    },
    {
      title: "Premium E-commerce Package",
      price: "$2450",
      originalPrice: "$3500",
      referralDiscount: "40%",
      features: [
        { text: "UNLIMITED Logo Design Concepts" },
        { text: "By 6 Award Winning Designers" },
        { text: "Icon Design" },
        { text: "UNLIMITED Revisions" },
        { text: "Print Media" },
        { text: "Stationary Design (BusinessCard, Letterhead & Envelope)" },
        { text: "Invoice Design, Email Signature" },
        { text: "Bi-Fold Brochure (OR) 2 Sided Flyer Design" },
        { text: "Product Catalog Design" },
        { text: "Signage Design (OR) Label Design" },
        { text: "T-Shirt Design (OR) Car Wrap Design" },
        { text: "Website" },
        { text: "E-Commerce Store Design" },
        { text: "Product Detail Page Design" },
        { text: "Unique Banner Slider" },
        { text: "Featured Products Showcase" },
        { text: "Full Shopping Cart Integration" },
        { text: "Unlimited Products" },
        { text: "Unlimited Categories" },
        { text: "Product Rating & Reviews" },
        { text: "Easy Product Search" },
        { text: "Payment Gateway Integration" },
        { text: "Multi-currency Support" },
        { text: "Content Management System" },
        { text: "Customer Log-in Area" },
        { text: "Mobile Responsive" },
        { text: "Social Media Plugins Integration" },
        { text: "Tell a Friend Feature" },
        { text: "Social Media Pages" },
        {
          text: "Facebook, Twitter, YouTube, Google+ & Pinterest Page Designs",
        },
        { text: "Value Added Services" },
        { text: "Dedicated Account Manager" },
        { text: "Unlimited Revisions" },
        { text: "All Final File Formats" },
        { text: "100% Ownership Rights" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee" },
      ],
      variant: "side",
      category: "E-commerce",
    },

    // ================= UI/UX =================
    // {
    //   title: "Basic UI/UX Package",
    //   price: "$199",
    //   originalPrice: "$399",
    //   referralDiscount: "50%",
    //   features: [
    //     { text: "UNLIMITED Logo Design Concepts" },
    //     { text: "By 6 Award Winning Designers" },
    //     { text: "Icon Design" },
    //     { text: "UNLIMITED Revisions" },
    //     { text: "Print Media" },
    //     { text: "Stationary Design (BusinessCard, Letterhead & Envelope)" },
    //     { text: "Invoice Design, Email Signature" },
    //     { text: "Bi-Fold Brochure (OR) 2 Sided Flyer Design" },
    //     { text: "Product Catalog Design" },
    //     { text: "Signage Design (OR) Label Design" },
    //     { text: "T-Shirt Design (OR) Car Wrap Design" },
    //     { text: "Website" },
    //     { text: "E-Commerce Store Design" },
    //     { text: "Product Detail Page Design" },
    //     { text: "Unique Banner Slider" },
    //     { text: "Featured Products Showcase" },
    //     { text: "Full Shopping Cart Integration" },
    //     { text: "Unlimited Products" },
    //     { text: "Unlimited Categories" },
    //     { text: "Product Rating & Reviews" },
    //     { text: "Easy Product Search" },
    //     { text: "Payment Gateway Integration" },
    //     { text: "Multi-currency Support" },
    //     { text: "Content Management System" },
    //     { text: "Customer Log-in Area" },
    //     { text: "Mobile Responsive" },
    //     { text: "Social Media Plugins Integration" },
    //     { text: "Tell a Friend Feature" },
    //     { text: "Social Media Pages" },
    //     {
    //       text: "Facebook, Twitter, YouTube, Google+ & Pinterest Page Designs",
    //     },
    //     { text: "Value Added Services" },
    //     { text: "Dedicated Account Manager" },
    //     { text: "Unlimited Revisions" },
    //     { text: "All Final File Formats" },
    //     { text: "100% Ownership Rights" },
    //     { text: "100% Satisfaction Guarantee" },
    //     { text: "100% Unique Design Guarantee" },
    //     { text: "100% Money Back Guarantee *" },
    //   ],
    //   variant: "side",
    //   category: "UI/UX",
    // },
    // {
    //   title: "Standard UI/UX Package",
    //   price: "$499",
    //   originalPrice: "$899",
    //   referralDiscount: "45%",
    //   features: [
    //     { text: "Up to 5 Screens" },
    //     { text: "Custom Design" },
    //     { text: "Prototype Creation" },
    //     { text: "Responsive & Interactive" },
    //     { text: "3 Revisions" },
    //   ],
    //   variant: "center",
    //   category: "UI/UX",
    // },
    // {
    //   title: "Premium UI/UX Package",
    //   price: "$999",
    //   originalPrice: "$1799",
    //   referralDiscount: "45%",
    //   features: [
    //     { text: "Full Website/App UI" },
    //     { text: "UX Research & Flow Mapping" },
    //     { text: "Interactive Prototypes" },
    //     { text: "Unlimited Revisions" },
    //     { text: "Design System & Style Guide" },
    //   ],
    //   variant: "side",
    //   category: "UI/UX",
    // },

    // ================= Video Animation =================
    {
      title: "Basic Animation Package",
      price: "$199",
      originalPrice: "$285",
      referralDiscount: "50%",
      features: [
        { text: "Script" },
        { text: "Storyboard & Characters" },
        { text: "Voiceover" },
        { text: "Animation & SFX" },
        { text: "Finalized & Published" },
      ],
      variant: "side",
      category: "Video Animation",
    },
    {
      title: "Standard Animation Package",
      price: "$299",
      originalPrice: "$428",
      referralDiscount: "45%",
      features: [
        { text: "Script" },
        { text: "Storyboard & Characters" },
        { text: "Voiceover" },
        { text: "Animation & SFX" },
        { text: "Finalized & Published" },
        { text: "1 Revision" }, // Added feature
      ],
      variant: "center",
      category: "Video Animation",
    },
    {
      title: "Premium Animation Package",
      price: "$499",
      originalPrice: "$712",
      referralDiscount: "40%",
      features: [
        { text: "Script" },
        { text: "Storyboard & Characters" },
        { text: "Voiceover" },
        { text: "Animation & SFX" },
        { text: "Finalized & Published" },
        { text: "Unlimited Revisions" }, // Added feature
        { text: "Interactive Elements" }, // Added feature
        { text: "Express Delivery" }, // Added feature
      ],
      variant: "side",
      category: "Video Animation",
    },

    // ================= SEO =================
    {
      title: "Basic SEO Package",
      price: "$350",
      originalPrice: "$500",
      referralDiscount: "50%",
      features: [
        { text: "Better Packages, Better Prices" },
        { text: "Domain Overview" },
        { text: "Website Audit" },
        { text: "Business Analysis" },
        { text: "Consumer Analysis" },
        { text: "Competitor Analysis" },
        { text: "15 selected Keyword Targeting" },
        { text: "15 page Keyword Targeting" },
        { text: "On-page Optimization" },
        { text: "Meta tag creation" },
        { text: "Keyword Optimization" },
        { text: "Image Optimization" },
        { text: "Inclusion of anchors" },
        { text: "Call To Action Plan" },
        { text: "Creation of Sitemaps" },
        { text: "Creation of Robots.txt" },
        { text: "Off Page Optimization" },
        { text: "Social Bookmarking" },
        { text: "Slide Share Marketing" },
        { text: "Forums/FAQ’s" },
        { text: "Link Building" },
        { text: "Directory Submission" },
        { text: "Monthly Reporting" },
        { text: "Recommendation" },
        { text: "Email Support" },
        { text: "Phone Support" },
      ],
      variant: "side",
      category: "SEO",
    },
    {
      title: "Standard SEO Package",
      price: "$700",
      originalPrice: "$1000",
      referralDiscount: "45%",
      features: [
        { text: "Prior Analysis" },
        { text: "Domain Overview" },
        { text: "Website Audit" },
        { text: "Business Analysis" },
        { text: "Consumer Analysis" },
        { text: "Competitor Analysis" },
        { text: "30 selected Keyword Targeting" },
        { text: "On-page Optimization" },
        { text: "Meta tag creation" },
        { text: "Keyword Optimization" },
        { text: "Image Optimization" },
        { text: "Inclusion of anchors tag" },
        { text: "Inclusion of anchors Indexing Modifications" },
        { text: "Creation of Sitemaps" },
        { text: "Creation of Robots.txt" },
        { text: "Google places inclusions" },
        { text: "Call To Action Plan" },
        { text: "Off Page Optimization" },
        { text: "Social Bookmarking" },
        { text: "Slide Share Marketing" },
        { text: "Forums/FAQ’s" },
        { text: "Link Building" },
        { text: "Directory Submission" },
        { text: "Monthly Reporting" },
        { text: "Recommendation" },
        { text: "Email Support" },
        { text: "Phone Support" },
      ],
      variant: "center",
      category: "SEO",
    },
    {
      title: "Premium SEO Package",
      price: "$1120",
      originalPrice: "$1620",
      referralDiscount: "45%",
      features: [
        { text: "Prior Analysis" },
        { text: "Domain Overview" },
        { text: "Website Audit" },
        { text: "Business Analysis" },
        { text: "Consumer Analysis" },
        { text: "Competitor Analysis" },
        { text: "70 selected Keyword Targeting" },
        { text: "50 selected Keyword Targeting" },
        { text: "On-page Optimization" },
        { text: "Meta tag creation" },
        { text: "Keyword Optimization" },
        { text: "Image Optimization" },
        { text: "Inclusion of anchors tag" },
        { text: "Inclusion of anchors Indexing Modifications" },
        { text: "Creation of Sitemaps" },
        { text: "Creation of Robots.txt" },
        { text: "Google places inclusions" },
        { text: "Call To Action Plan" },
        { text: "Off Page Optimization" },
        { text: "Social Bookmarking" },
        { text: "Slide Share Marketing" },
        { text: "Forums/FAQ’s" },
        { text: "Link Building" },
        { text: "Directory Submission" },
        { text: "Local Business Listings" },
        { text: "Monthly Reporting" },
        { text: "Recommendation" },
        { text: "Email Support" },
        { text: "Phone Support" },
      ],
      variant: "side",
      category: "SEO",
    },

    // ================= Digital Marketing =================
    {
      title: "Basic Digital Marketing",
      price: "$699",
      originalPrice: "$999",
      referralDiscount: "50%",
      features: [
        { text: "12/Month Unique Social Media Content Posting" },
        { text: "Social Media Analysis" },
        { text: "Page Optimization" },
        { text: "Social Media Marketing Plan" },
        { text: "Post Design Scheduling" },
        { text: "Profile Keyword Optimization - 3 Keywords" },
        { text: "Performance Report" },
        { text: "2 Platforms" },
      ],
      variant: "side",
      category: "Digital Marketing",
    },
    {
      title: "Standard Digital Marketing",
      price: "$1050",
      originalPrice: "$1500",
      referralDiscount: "45%",
      features: [
        { text: "20/Month Unique Social Media Content Posting" },
        { text: "Competitor Analysis" },
        { text: "Community Management" },
        { text: "Page Moderation" },
        { text: "Social Media Strategy" },
        { text: "Page Monitoring & Responding" },
        { text: "Social Media Analysis" },
        { text: "Page Optimization" },
        { text: "Social Media Marketing Plan" },
        { text: "Post Design Scheduling" },
        { text: "Profile Keyword Optimization - 6 Keywords" },
        { text: "Performance Report" },
        { text: "4 Platforms" },
      ],
      variant: "center",
      category: "Digital Marketing",
    },
    {
      title: "Premium Digital Marketing",
      price: "$1225",
      originalPrice: "$1750",
      referralDiscount: "40%",
      features: [
        { text: "40/Month Unique Social Media Content Posting" },
        { text: "Competitor Analysis" },
        { text: "Community Management" },
        { text: "Page Moderation" },
        { text: "Page Monitoring & Responding" },
        { text: "Social Media Analysis" },
        { text: "Page Optimization" },
        { text: "Social Media Marketing Plan" },
        { text: "Post Design Scheduling" },
        { text: "Profile Keyword Optimization - 8 Keywords" },
        { text: "Performance Report" },
        { text: "Unlimited Platforms" },
      ],
      variant: "side",
      category: "Digital Marketing",
    },

    // ================= Graphic Designing =================
    {
      title: "Basic Logo Design Package",
      price: "$42",
      originalPrice: "$60",
      referralDiscount: "50%",
      features: [
        { text: "2 Custom Logo Design Concepts" },
        { text: "1 Dedicated Designer" },
        { text: "4 REVISIONS" },
        { text: "48 to 72 hours TAT" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Ownership Rights *" },
        { text: "100% Money Back Guarantee *" },
      ],
      variant: "side",
      category: "Logo",
    },
    {
      title: "Standard Logo Design Package",
      price: "$73",
      originalPrice: "$105",
      referralDiscount: "45%",
      features: [
        { text: "5 Custom Logo Design Concepts" },
        { text: "By 2 Designers" },
        { text: "UNLIMITED Revisions" },
        { text: "48 to 72 hours TAT" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Ownership Rights *" },
        { text: "100% Money Back Guarantee" },
      ],
      variant: "center",
      category: "Logo",
    },
    {
      title: "Premium Logo Design Package",
      price: "$115",
      originalPrice: "$165",
      referralDiscount: "40%",
      features: [
        { text: "UNLIMITED Logo Design Concepts" },
        { text: "By 4 Designers" },
        { text: "UNLIMITED Revisions" },
        { text: "Stationary Design (Business Card, Letterhead, Envelope)" },
        { text: "48 to 72 hours TAT" },
        { text: "FREE MS Word Letterhead" },
        { text: "All Final Files Format (AI, PSD, EPS, PNG, GIF, jpeg, PDF)" },
        { text: "100% Satisfaction Guarantee" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Ownership Rights *" },
        { text: "100% Money Back Guarantee *" },
      ],
      variant: "side",
      category: "Logo",
    },
    {
      title: "Basic Maintenance Package",
      price: "$199",
      originalPrice: "$285",
      referralDiscount: "40%",
      features: [
        { text: "3 Months Package" },
        { text: "BackupBuddy" },
        { text: "UpDraftPlus" },
        { text: "Duplicator" },
        { text: "BackWPup" },
        { text: "Wordfence Security" },
        { text: "iThemes Security" },
        { text: "All In One WP Security & Firewall" },
        { text: "Sucuri Security" },
        { text: "Uptrends" },
        { text: "Pingdom" },
        { text: "GTmetrix" },
        { text: "Google Analytics" },
        { text: "Google Analytics for WordPress" },
        { text: "Google Analytics Dashboard for WP" },
        { text: "hrefs" },
      ],
      variant: "side",
      category: "Maintenance",
    },
    {
      title: "Standard Maintenance Package",
      price: "$299",
      originalPrice: "$428",
      referralDiscount: "40%",
      features: [
        { text: "6 Months Package" },
        { text: "BackupBuddy" },
        { text: "UpDraftPlus" },
        { text: "Duplicator" },
        { text: "BackWPup" },
        { text: "Wordfence Security" },
        { text: "iThemes Security" },
        { text: "All In One WP Security & Firewall" },
        { text: "Sucuri Security" },
        { text: "Uptrends" },
        { text: "Pingdom" },
        { text: "GTmetrix" },
        { text: "Google Analytics" },
        { text: "Google Analytics for WordPress" },
        { text: "Google Analytics Dashboard for WP" },
        { text: "hrefs" },
      ],
      variant: "center",
      category: "Maintenance",
    },
    {
      title: "Premium Maintenance Package",
      price: "$499",
      originalPrice: "$712",
      referralDiscount: "40%",
      features: [
        { text: "12 Months Package" },
        { text: "BackupBuddy" },
        { text: "UpDraftPlus" },
        { text: "Duplicator" },
        { text: "BackWPup" },
        { text: "Wordfence Security" },
        { text: "iThemes Security" },
        { text: "All In One WP Security & Firewall" },
        { text: "Sucuri Security" },
        { text: "Uptrends" },
        { text: "Pingdom" },
        { text: "GTmetrix" },
        { text: "Google Analytics" },
        { text: "Google Analytics for WordPress" },
        { text: "Google Analytics Dashboard for WP" },
        { text: "hrefs" },
      ],
      variant: "side",
      category: "Maintenance",
    },
    {
      title: "Basic Branding Package",
      price: "$99",
      originalPrice: "$142",
      referralDiscount: "40%",
      features: [
        { text: "1 Business Card Design" },
        { text: "1 Letterhead Design" },
        { text: "1 Envelope Design" },
        { text: "Dedicated Designer" },
        { text: "3 Design Revisions" },
        { text: "Turnaround Time 24 - 48 Hours" },
        { text: "100% Satisfaction Guaranteed" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee" },
        { text: "All Final File Formats" },
      ],
      variant: "side",
      category: "Branding",
    },
    {
      title: "Standard Branding Package",
      price: "$149",
      originalPrice: "$214",
      referralDiscount: "40%",
      features: [
        { text: "2 Design Concepts (Trifold / Bi-fold)" },
        { text: "Dedicated Designer" },
        { text: "Dedicated Account Manager" },
        { text: "Unlimited Revisions" },
        { text: "Turnaround Time - 48 - 72 Hours" },
        { text: "100% Satisfaction Guaranteed" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee" },
        { text: "All Final File Formats" },
      ],
      variant: "center",
      category: "Branding",
    },
    {
      title: "Premium Branding Package",
      price: "$295",
      originalPrice: "$420",
      referralDiscount: "40%",
      features: [
        { text: "1 Unique Design" },
        { text: "3 Design Concepts" },
        { text: "Dedicated Designer" },
        { text: "2 Design Revisions" },
        { text: "Turnaround Time - 48 - 72 Hours" },
        { text: "100% Satisfaction Guaranteed" },
        { text: "100% Unique Design Guarantee" },
        { text: "100% Money Back Guarantee" },
        { text: "All Final File Formats" },
      ],
      variant: "side",
      category: "Branding",
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
    <>
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
                <div className="flex items-center justify-center w-full">
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

                  <div className="flex-1 flex justify-center">
                    <div className="w-[280px]">
                      <PricingCard {...filteredCards[selectedIndex]} isMobile />
                    </div>
                  </div>

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

      {/* Inline "globalcss" for the custom left scrollbar */}
      <style jsx global>{`
        /* Custom scrollbar for features list */
        .features-scroll {
          /* Put scrollbar on the LEFT while keeping content normal */
          direction: rtl; /* moves scrollbar to left for WebKit + Firefox */
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: transparent transparent; /* hide default track color in Firefox */
        }
        .features-scroll > * {
          direction: ltr; /* restore normal content direction */
        }

        /* Chrome, Edge, Safari */
        .features-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .features-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .features-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ff8a00, #de2f04);
          border-radius: 9999px;
        }
        .features-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #de2f04, #ff8a00);
        }
      `}</style>
    </>
  );
};

export default PricingCards;
