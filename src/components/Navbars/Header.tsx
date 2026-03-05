"use client";
import React, { useMemo, useState, useTransition, Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import {
  currencyOptions,
  filterCustomersByEmail,
  headerNavLinks,
} from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShoppingCart,
  FiBookmark,
  FiHeart,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { LuArrowLeftRight } from "react-icons/lu";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import HomePageBottomHeader from "./HomePageBottomHeader";
import { FaCartArrowDown } from "@node_modules/react-icons/fa";
import { BiUser } from "@node_modules/react-icons/bi";
import { ImSpinner2 } from "@node_modules/react-icons/im";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useToken();
  const { totalItems } = useCart();

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const [isPending, startTransition] = useTransition();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: customer } = useCustomer("");
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  const onOpenCart = () => setIsCartOpen(true);
  const onCloseCart = () => setIsCartOpen(false);

  const handleCurrencyChange = async (code: string) => {
    const selectedObj = currencyOptions.find((c) => c.code === code);
    if (!selectedObj) return;

    try {
      const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedObj));
        FormToast({ message: `Switched to ${code}`, success: true });
      }
    } catch (error) {
      FormToast({ message: "Currency switch failed", success: false });
    }
  };

  const handleSearch = () => {
    if (!searchValue) return;

    startTransition(() => {
      router.push(`/search?${searchValue}`);
    });
  };

  const userDropDownLinks = [
    {
      id: 1,
      href: "/user/dashboard",
      icon: <BiUser />,
      label: "My Account",
    },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown />,
      label: "Orders",
    },
    { id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
  ];

  return (
    <>
      <header className="flex flex-col w-full bg-white z-[100] fixed top-0 shadow-sm transition-all">
        {/* Dark Top Accent Bar */}
        <div className="hidden slg:block w-full h-[6px] bg-[#1a1a2e]" />

        {/* Desktop Header */}
        <div className="hidden slg:flex items-center justify-between w-full py-3 max-w-[1440px] px-8 mx-auto">
          {/* Left — Logo */}
          <Link href="/" className="shrink-0">
            <LogoImage className="!w-[120px]" />
          </Link>

          {/* Center — Nav Links */}
          <nav className="flex items-center gap-8">
            {headerNavLinks.map((link) => {
              const hasDropdown =
                link.text === "Home" || link.text === "Products";
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-medium transition relative group ${
                    isActive ? "text-gray-900" : (
                      "text-gray-600 hover:text-gray-900"
                    )
                  }`}>
                  {link.text}
                  {hasDropdown && (
                    <SlArrowDown className="text-[9px] mt-[1px] opacity-60" />
                  )}
                  <span
                    className={`h-[2px] inline-block bg-gray-900 absolute left-0 -bottom-1 transition-all ease duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}>
                    &nbsp;
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right — Icon Buttons */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Search */}
            <div
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition relative group cursor-pointer">
              <span className="relative">
                <FiSearch className="text-[19px]" />
              </span>
              <span className="text-[10px] font-medium leading-none">
                Search
              </span>
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition group cursor-pointer">
              <FiHeart className="text-[19px]" />
              <span className="text-[10px] font-medium leading-none">
                Wishlist
              </span>
            </Link>

            {/* Cart */}
            <div
              className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition relative group cursor-pointer"
              onClick={onOpenCart}>
              <span className="relative">
                <FiShoppingCart className="text-[19px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 size-4 bg-black text-white text-[9px] font-black flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium leading-none">Cart</span>
            </div>

            {/* Account (User Dropdown) */}
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <Menu.Button className="flex flex-col items-center gap-0.5 cursor-pointer group outline-none focus:ring-0 text-gray-600 hover:text-gray-900 transition">
                    <FiUser className="text-[19px]" />
                    <span className="text-[10px] font-medium leading-none">
                      Account
                    </span>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right bg-white border border-gray-200 rounded-2xl shadow-xl p-1.5 z-[110] outline-none">
                      <div className="px-3 py-2 mb-1 border-b border-gray-100">
                        <p className="text-xs text-gray-400">Logged in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {wc_customer_info?.first_name}
                        </p>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        {userDropDownLinks.map((item) => (
                          <Menu.Item key={item.id}>
                            {({ active }) => (
                              <button
                                onClick={(e) => {
                                  if (item.onClick) {
                                    e.preventDefault();
                                    item.onClick();
                                  } else if (item.href) {
                                    router.push(item.href);
                                  }
                                }}
                                className={`${
                                  active ?
                                    "bg-gray-50 text-gray-900"
                                  : "text-gray-600"
                                } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors`}>
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={`${
                              active ? "bg-red-50" : ""
                            } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 font-bold transition-colors mt-1`}>
                            <FiLogOut /> Log Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>

        {/* Bottom border line */}
        <div className="hidden slg:block h-[1px] bg-gray-200" />

        {/* Desktop Search Bar (collapsible) */}
        <div
          className={`hidden slg:block overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 border-b border-gray-200 ${
            isSearchOpen ? "max-h-20 py-3" : "max-h-0 py-0"
          }`}>
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-11 text-sm bg-white rounded-xl px-5 pr-12 border border-gray-200 outline-none focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoFocus={isSearchOpen}
              />
              {isPending ?
                <ImSpinner2 className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-100 animate-spin" />
              : <FiSearch
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-primary-100 transition-colors"
                  onClick={handleSearch}
                />
              }
            </div>
          </div>
        </div>

        {/* Mobile Header (Hidden on Laptop) */}
        <div className="slg:hidden flex flex-col w-full px-3 py-3 sm:px-4 sm:py-4 gap-2.5 sm:gap-3 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiMenu
                className="text-xl sm:text-2xl text-black cursor-pointer"
                onClick={() => setDrawerVisible(true)}
              />
              <LogoImage className="!w-[40px]" />
            </div>
            <div onClick={onOpenCart} className="relative">
              <FiShoppingBag className="text-2xl text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 size-4 bg-blue-600 rounded-full text-[9px] flex items-center justify-center text-white">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          <div className="relative h-9 sm:h-10">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full h-full text-xs sm:text-sm bg-gray-100 rounded-lg px-3 sm:px-4 border-none outline-none focus:ring-2 focus:ring-primary-100"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {isPending ?
              <ImSpinner2 className="absolute right-3 top-1/3 text-primary-100 animate-spin" />
            : <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            }
          </div>
        </div>

        {/* Conditional Bottom Headers */}
        {pathname.includes("/category") ?
          <CategoryPageBottomHeader />
        : pathname.includes("/home-item") ?
          <ProductPageBottomHeader />
        : <HomePageBottomHeader />}
      </header>

      <Drawer
        open={isCartOpen}
        onClose={onCloseCart}
        placement="right"
        width={
          typeof window !== "undefined" && window.innerWidth > 768 ?
            500
          : "100%"
        }>
        <ProductTable onClose={onCloseCart} />
      </Drawer>

      <GlobalLoader isPending={isPending} />
      <MobileNav
        closeDrawer={() => setDrawerVisible(false)}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default Header;
