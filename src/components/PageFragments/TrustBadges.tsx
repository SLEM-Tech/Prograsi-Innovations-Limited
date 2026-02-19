import React from "react";

const badges = [
  {
    title: "Secure Payment",
    description: "100% secure payment",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M12 17v4" />
        <path d="M8 21h8" />
        <circle cx="17" cy="7" r="0" />
        <path d="M9 14h.01" />
      </svg>
    ),
  },
  {
    title: "30 Days Return",
    description: "If goods have problems",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <path d="M8 12H4" />
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Dedicated support",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
      </svg>
    ),
  },
  {
    title: "Free Delivery",
    description: "For all order over 80$",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12" />
        <path d="M15.5 9.5c-.7-.5-1.6-.8-2.5-.8-2.2 0-3.5 1-3.5 2.3 0 1.3 1.3 2.3 3.5 2.3 2.2 0 3.5 1 3.5 2.3 0 1.3-1.3 2.3-3.5 2.3-.9 0-1.8-.3-2.5-.8" />
      </svg>
    ),
  },
];

const TrustBadges = () => {
  return (
    <div className="w-full bg-[#6C5CE7] py-8 sm:py-10">
      <div className="max-w-[1256px] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {badges.map((badge) => (
          <div
            key={badge.title}
            className="flex flex-col items-center text-center gap-2">
            <div className="text-white text-3xl sm:text-4xl">{badge.icon}</div>
            <h4 className="text-white font-bold text-sm sm:text-base tracking-wide">
              {badge.title}
            </h4>
            <p className="text-white/70 text-xs sm:text-sm">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
