import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const EmptyCart = () => {
  return (
    <section className="px-4 py-16 max-w-xl mx-auto text-center space-y-6">
      <div className="mx-auto w-60 h-60 relative">
        <Image
          src="/empty-cart.svg"
          alt="Empty cart illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-semibold text-[#a21caf] font-grotesk">
          Your cart is empty
        </p>
        <p className="text-[#53385a]">
          Browse our menu and add some products to your cart.
        </p>
      </div>

      <Link href="/menu">
        <Button className="bg-[#ec4899] hover:bg-[#a21caf] text-white font-poppins">
          Go to menu
        </Button>
      </Link>
    </section>
  );
};

export default EmptyCart;
