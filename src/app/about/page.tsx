import AppLayout from "@src/components/AppLayout";
import Image from "next/image";
import { FiCheckCircle, FiTruck, FiShield, FiAward } from "react-icons/fi";

const stats = [
  { value: "10K+", label: "Products Listed" },
  { value: "5K+", label: "Happy Customers" },
  { value: "50+", label: "Brand Partners" },
  { value: "24/7", label: "Customer Support" },
];

const offerings = [
  "Kitchen Appliances — Refrigerators, blenders, microwaves, and more",
  "Laundry Appliances — Washing machines, dryers, and irons",
  "Office Equipment — Printers, scanners, and computing essentials",
  "Home Comfort — Air conditioners, heaters, fans, and purifiers",
  "Home Entertainment — TVs, sound systems, and multimedia devices",
  "Generators & Power — Inverters, generators, and stabilizers",
];

const whyChooseUs = [
  {
    icon: FiShield,
    title: "Authentic Products",
    description:
      "Every item is sourced directly from authorized distributors, ensuring 100% genuine quality.",
  },
  {
    icon: FiTruck,
    title: "Fast Delivery",
    description:
      "We deliver nationwide with reliable logistics partners, getting your orders to you quickly.",
  },
  {
    icon: FiAward,
    title: "Warranty Guaranteed",
    description:
      "All products come with manufacturer warranty so you can buy with complete confidence.",
  },
  {
    icon: FiCheckCircle,
    title: "Competitive Pricing",
    description:
      "We offer the best prices on the market without compromising on product quality.",
  },
];

const Page = () => {
  return (
    <AppLayout>
      <main className="bg-white mx-auto mt-28 md:mt-36 pb-10 slg:pb-20">
        {/* Hero Section */}
        <section className="relative w-full h-[260px] sm:h-[340px] slg:h-[420px] overflow-hidden">
          <Image
            src="/images/about-hero.png"
            alt="Prograsi Innovations showroom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 sm:pb-14 px-4 text-center">
            <h1 className="text-3xl sm:text-4xl slg:text-5xl font-black text-white tracking-tight">
              About Us
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl">
              Your trusted distributor of premium home appliances &amp;
              electronics in Nigeria.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary-100 text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 slg:grid-cols-4 divide-x divide-white/20">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-6 sm:py-8">
                <span className="text-2xl sm:text-3xl font-black">
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm font-medium mt-1 opacity-80">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Company Intro */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 slg:px-16 py-12 slg:py-20">
          <div className="grid slg:grid-cols-2 gap-10 slg:gap-16 items-center">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-black uppercase tracking-[3px] text-primary-100">
                Who We Are
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Welcome to Prograsi Innovations Limited
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-[180%]">
                Prograsi Innovations Limited is a leading distributor of
                high-quality home appliances and electronics in Nigeria. We are
                passionate about connecting Nigerian homes and businesses with
                the best technology products at competitive prices.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-[180%]">
                Founded with the vision of making premium appliances accessible
                to everyone, we partner with top global brands to deliver
                products that combine innovation, durability, and excellent
                value. From kitchen essentials to home entertainment, we have
                everything you need under one roof.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about-hero.png"
                alt="Our showroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-gray-50 py-12 slg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 slg:px-16 grid sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <span className="text-xs font-black uppercase tracking-[3px] text-primary-100">
                Our Mission
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3 mb-3">
                Bringing Quality to Every Home
              </h3>
              <p className="text-sm text-slate-600 leading-[180%]">
                To be the most reliable distributor of home appliances and
                electronics in Nigeria by offering genuine products, excellent
                customer service, and unmatched value that empowers Nigerian
                homes and businesses.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <span className="text-xs font-black uppercase tracking-[3px] text-primary-100">
                Our Vision
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3 mb-3">
                Technology for Everyone
              </h3>
              <p className="text-sm text-slate-600 leading-[180%]">
                To become West Africa&apos;s leading e-commerce platform for
                home appliances and electronics, making premium technology
                accessible and affordable for every household across the region.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="max-w-6xl mx-auto px-4 sm:px-8 slg:px-16 py-12 slg:py-20">
          <div className="text-center mb-10">
            <span className="text-xs font-black uppercase tracking-[3px] text-primary-100">
              Our Products
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              What We Offer
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {offerings.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <FiCheckCircle className="text-primary-100 text-lg mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-slate-900 py-12 slg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-8 slg:px-16">
            <div className="text-center mb-10">
              <span className="text-xs font-black uppercase tracking-[3px] text-primary-100">
                Our Promise
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Why Choose Us
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 slg:grid-cols-4 gap-6">
              {whyChooseUs.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="size-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                    <item.icon className="text-white text-xl" />
                  </div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default Page;
