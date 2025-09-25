import HomeClient from "@/components/HomeClient";

const Home = () => {
  return (
    <div className="relative min-h-full">
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-25 pointer-events-none"
      />
      <div className="relative z-10 px-4 text-center py-16 sm:py-20">
        <h1 className="mb-8 text-xl font-semibold md:text-3xl text-[#a21caf] font-grotesk">
          Fast Store
          <br />
          <span className="text-[#ec4899] text-[24px]">
            Click. Shop. Delivered
          </span>
        </h1>
        <HomeClient />
      </div>
    </div>
  );
};

export default Home;
