import AppLayout from "@src/components/AppLayout";
import ShoopingCartReview from "@src/components/PageFragments/ShoopingCartReview";
import DiscountCode from "./_components/DiscountCode";

const Page = () => {
  return (
    <AppLayout>
      <main className="flex flex-col xl:flex-row gap-4 w-full px-3 xl:px-6 max-w-[1440px] mx-auto mt-28 slg:mt-40 mb-8 md:mb-64">
        <div className="flex-1">
          <ShoopingCartReview />
        </div>
        <div className="flex-[.5]">
          <DiscountCode />
        </div>
      </main>
    </AppLayout>
  );
};

export default Page;
