import BorrowingSteps from "@/components/home/BorrowingSteps";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";


export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSlider />
      <NewArrivals />
      <BorrowingSteps />
      <TopCategories />
    </main>
  );
}
