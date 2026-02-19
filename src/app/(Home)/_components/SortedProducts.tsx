"use client";
import { convertToSlug } from "@constants";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useCart } from "react-use-cart";
import { FiShoppingCart } from "react-icons/fi";

export const Loader = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
    {Array.from({ length: 10 }).map((_, i) => (
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
    ))}
  </div>
);

const ProductCard = ({
  product,
  addItem,
  removeItem,
  getItem,
}: {
  product: ProductType;
  addItem: any;
  removeItem: (id: string) => void;
  getItem: (id: string) => any;
}) => {
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

        {/* Price + Add/Remove Button */}
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
};

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addItem, getItem, removeItem } = useCart();

  // Fetch sale products (on_sale) and popular products (by popularity)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const [saleRes, popularRes] = await Promise.all([
          WooCommerce.get(
            "products?on_sale=true&per_page=10&orderby=date&order=desc",
          ),
          WooCommerce.get("products?orderby=popularity&per_page=10&order=desc"),
        ]);
        if (saleRes?.data) setSaleProducts(saleRes.data);
        if (popularRes?.data) setPopularProducts(popularRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* ─── Popular Products Section ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-6">
          Popular Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading ?
            <Loader />
          : popularProducts
              .slice(0, 10)
              .map((product: ProductType) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addItem={addItem}
                  removeItem={removeItem}
                  getItem={getItem}
                />
              ))
          }
        </div>
      </div>

      {/* ─── Products (Sale) Section ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a2e] mb-6">
          Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {isLoading ?
            <Loader />
          : saleProducts
              .slice(0, 10)
              .map((product: ProductType) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addItem={addItem}
                  removeItem={removeItem}
                  getItem={getItem}
                />
              ))
          }
        </div>
      </div>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default SortedProducts;
