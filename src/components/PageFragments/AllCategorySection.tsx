"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import { FiShoppingCart } from "react-icons/fi";
import TrustBadges from "./TrustBadges";
import StayHomeBanner from "./StayHomeBanner";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { addItem, getItem, removeItem } = useCart();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0 ?
                  response?.data[0]?.images[0]?.src
                : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Fetch latest products for New Arrivals
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=8",
        );
        if (response?.data) {
          setLatestProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* Hero Concept inspired by the image */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* The Background Image */}
        <Picture
          src={heroBg}
          alt="Brand New Collection"
          className="w-full h-full object-cover scale-105"
        />

        {/* Content Overlay — Centered */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight">
            Brand New <br />
            Collection
          </h1>
          <p className="mt-6 text-sm md:text-base text-black/70 max-w-xl leading-relaxed">
            Upgrade your setup with our Brand New Collection of cutting-edge
            computer accessories, designed for performance, style, durability,
            and seamless productivity.
          </p>
          <Link
            href="/category"
            className="mt-8 inline-block bg-[#E91E8C] hover:bg-[#d4177f] text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded transition-colors">
            Explore Shop
          </Link>
        </div> */}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-white leading-tight tracking-tight drop-shadow-lg">
            Quality Assesories
            <br />
            Big discount
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/80 font-medium">
            Sign up for the daily newsletter
          </p>

          {/* Newsletter Form */}
          <div className="mt-6 flex items-center w-full max-w-md bg-white rounded-full overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none border-none"
            />
            <button className="bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white text-sm font-semibold px-6 py-3 rounded-full  transition-colors cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Section Header */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-6">
          Popular Products
        </h2>

        {/* Product Grid — 5 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {latestProducts.length > 0 ?
            latestProducts.slice(0, 12).map((product: ProductType) => {
              const price = parseInt(product?.price || "0");
              const slugDesc = convertToSlug(product?.name);
              const ID = product?.id?.toString();
              const cartItem = getItem(ID);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image */}
                  <Link
                    href={`/home-item/product/${slugDesc}-${product.id}`}
                    className="relative aspect-[4/3] bg-white flex items-center justify-center p-4">
                    <Picture
                      src={product?.images?.[0]?.src}
                      alt={product?.name}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Info */}
                  <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5">
                    {/* Product Name */}
                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-[#7B2FF2] transition-colors"
                      dangerouslySetInnerHTML={{ __html: product?.name }}
                    />

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className="w-3.5 h-3.5 text-amber-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Price + Add Button */}
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-[#1a1a2e]">
                        {price ?
                          <FormatMoney2 value={price} />
                        : "N/A"}
                      </span>

                      {price > 0 && (
                        <button
                          onClick={() =>
                            cartItem ?
                              removeItem(ID)
                            : addItem({
                                id: ID,
                                name: product?.name,
                                price,
                                quantity: 1,
                                image: product?.images?.[0]?.src,
                              })
                          }
                          className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                            cartItem ?
                              "bg-red-50 text-red-500 border border-red-200 hover:bg-red-500 hover:text-white"
                            : "bg-[#F0EAFF] text-[#7B2FF2] hover:bg-[#7B2FF2] hover:text-white border border-[#E0D4FF]"
                          }`}>
                          <FiShoppingCart className="text-xs" />
                          {cartItem ? "Remove" : "Add"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          : /* Loading Skeleton */
            Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-gray-200 overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-3 flex flex-col gap-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="flex justify-between items-center mt-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-7 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <StayHomeBanner />
    </>
  );
};

export default AllCategorySection;
