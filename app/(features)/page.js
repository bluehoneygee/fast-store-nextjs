import HomeClient from "@/components/HomeClient";
import Image from "next/image";

const Home = () => {
  return (
    <div className="my-30 px-4 text-center sm:my-16">
      <div className="mb-2 flex justify-center">
        <Image
          src="/header.svg"
          alt="Fast Store header illustration"
          width={300}
          height={200}
          className="w-auto h-80"
          priority
        />
      </div>
      <h1 className="mb-8 text-xl font-semibold md:text-3xl text-[#a21caf] font-grotesk">
        Fast Store
        <br />
        <span className="text-[#ec4899] text-[24px]">
          Click. Shop. Delivered
        </span>
      </h1>
      <HomeClient />
    </div>
  );
};

export default Home;
