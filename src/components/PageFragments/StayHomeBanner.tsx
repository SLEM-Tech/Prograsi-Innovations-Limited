"use client";
import React from "react";
import Picture from "../picture/Picture";
import { stayhomeBg } from "@public/images";

const StayHomeBanner = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7B2FF2] via-[#9B30FF] to-[#E91E8C]" />

      {/* Background Image Overlay */}
      <Picture
        src={stayhomeBg}
        alt="Stay Home Shopping"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
      />

      {/* Content — Left Aligned */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 py-14 md:py-20 lg:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic text-white leading-tight max-w-xl drop-shadow-lg">
          Stay home & get your daily
          <br />
          needs from our shop
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/80 font-medium">
          Start Your Daily Shopping with us
        </p>

        {/* Newsletter Form */}
        <div className="mt-6 flex items-center w-full max-w-md bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-5 py-3 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none border-none"
          />
          <button className="bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default StayHomeBanner;
