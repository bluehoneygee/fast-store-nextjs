"use client";
import CartList from "@/components/CartList";
import EmptyCart from "@/components/EmptyCart";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { useUserStore } from "@/lib/store/user";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const CartPage = () => {
  const username = useUserStore((s) => s.username);
  const cart = useCartStore((s) => s.cart);
  const clear = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.total)();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <section className="px-4 py-6 max-w-3xl mx-auto">
      <Link
        href="/menu"
        className="text-sm text-[#a21caf] hover:text-[#ec4899] transition-colors"
      >
        &larr; Back to menu
      </Link>

      <h2 className="mt-6 text-xl font-semibold text-[#a21caf] font-grotesk">
        Your cart{username ? `, ${username}` : ""}
      </h2>

      <CartList />
      <div className="flex items-center justify-between mt-6">
        <p className="font-semibold text-[#53385a]">Total</p>
        <p className="font-semibold text-[#ec4899]">{formatCurrency(total)}</p>
      </div>

      <div className="mt-6 flex gap-3 font-poppins">
        <Link href="/order/new" className="w-full sm:w-auto">
          <Button className="w-full bg-[#ec4899] hover:bg-[#a21caf] text-white">
            Order products
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={clear}
          className="w-auto border border-[#ec4899] text-[#ec4899] hover:border-[#a21caf] hover:text-[#a21caf] transition-colors"
        >
          Clear cart
        </Button>
      </div>
    </section>
  );
};

export default CartPage;
