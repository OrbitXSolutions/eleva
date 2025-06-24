import Categories from "@/components/molecules/categories";
import Hero from "@/components/molecules/hero";
import NewArrivals from "@/components/organisms/new-arrivals";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
    </>
  );
}
