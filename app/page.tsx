import BestSellers from "@/components/BestSellers";
import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";

export default function Home() {
  return (
    <>
      <main className="mt-10">
        <Hero />
        <div className="mx-auto lg:w-[95vw] w-[92vw] mb-20">
          <BestSellers />
          <NewProducts />
        </div>
      </main>
    </>
  );
}
