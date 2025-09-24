import CartOverview from "@/components/CartOverview";
import Navbar from "@/components/Navbar";
import React from "react";

const featuresLayout = ({ children, ...props }) => {
  return (
    <main className="bg-stone-100 text-stone-700 grid grid-rows-[auto_1fr_auto] h-screen">
      <Navbar />
      <div className="overflow-y-auto">{children}</div>
      <CartOverview />
    </main>
  );
};

export default featuresLayout;
