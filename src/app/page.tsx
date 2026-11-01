import BorrowingSteps from "@/components/home/BorrowingSteps";
import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import ReadingBenefits from "@/components/home/ReadingBenefits";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSlider />
      <NewArrivals />
      <BorrowingSteps />
      <ReadingBenefits />
    </main>
  );
}
