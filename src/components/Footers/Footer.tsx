"use client";
import React from "react";
import { motion } from "framer-motion";
import FooterCard from "../Cards/FooterCard";
import Link from "next/link";
import { ChatServiceIconSvg, FileIconSvg, RocketIconSvg } from "../SvgIcons";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import { AppStoreIconSvg, GooglePlayIconSvg } from "../SvgIcons";
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTiktok,
  BiLogoTwitter,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";

interface footerDataProps {
  title: string;
  links: {
    label: string;
    href: string;
    function?: () => void;
  }[];
}

const Footer = () => {
  const { email } = useToken();
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { data: customer, isLoading, isError } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;

  const footerData: footerDataProps[] = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Delivery Information", href: "/delivery-info" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Support Center", href: "/support-center" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Account",
      links: [
        {
          label: firstName ? "Update Account" : "Sign In",
          href: firstName ? "/user/account-details" : "/user/login",
        },
        { label: "View Cart", href: "/cart" },
        { label: "My Wishlist", href: "/wishlist" },
        { label: "Track My Order", href: "/track-order" },
        { label: "Help Ticket", href: "/help-ticket" },
        { label: "Shipping Details", href: "/shipping-details" },
        { label: "Compare products", href: "/compare-products" },
      ],
    },
  ];

  return (
    <footer className="bg-white w-full border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: LOGO */}
          <div className="flex flex-col gap-6">
            <div className="">
              <LogoImage className="!w-[150px]" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Premium computer accessories for your daily needs. Quality meets
              affordability.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-primary-100 hover:text-white transition-all">
                <BiLogoFacebook size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-primary-100 hover:text-white transition-all">
                <BiLogoTwitter size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-primary-100 hover:text-white transition-all">
                <BiLogoTiktok size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-primary-100 hover:text-white transition-all">
                <BiLogoWhatsapp size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2 & 3: Links */}
          {footerData.map((section, index) => (
            <div key={index} className="flex flex-col gap-6">
              <h4 className="text-[#1a1a2e] font-bold text-lg">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      onClick={link.function}
                      className="text-gray-500 text-sm hover:text-primary-100 transition-colors inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Install App */}
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="text-[#1a1a2e] font-bold text-lg mb-6">
                Install App
              </h4>
              <p className="text-gray-500 text-sm mb-6 font-medium">
                From App Store or Google Play
              </p>
              <div className="flex flex-col gap-3">
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <AppStoreIconSvg className="w-[140px] h-auto" />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-opacity">
                  <GooglePlayIconSvg className="w-[140px] h-auto" />
                </Link>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-4 font-medium">
                Secured Payment Gateways
              </p>
              <div className="flex gap-4 items-center opacity-60">
                <FaCcVisa size={32} className="text-[#1a1a2e]" />
                <FaCcMastercard size={32} className="text-[#1a1a2e]" />
                <FaCcAmex size={32} className="text-[#1a1a2e]" />
                <FaPaypal size={32} className="text-[#1a1a2e]" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-12">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} {CompanyName} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
