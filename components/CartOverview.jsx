"use client";

import { useCartStore } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const CartOverview = () => {
  const cart = useCartStore((s) => s.cart);

  const totalCartQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );
  const totalCartPrice = cart.reduce(
    (sum, item) =>
      sum + (item.totalPrice ?? (item.price ?? 0) * (item.quantity ?? 1)),
    0
  );

  if (!totalCartQuantity) return null;
  return (
    <div className="flex items-center justify-between border-t border-[#a21caf] px-4 py-2 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-[#a21caf] sm:space-x-6">
        <span className="font-grotesk font-bold">
          {totalCartQuantity} products
        </span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link href="/cart" className="font-grotesk text-[#a21caf] font-bold">
        Open cart →
      </Link>
    </div>
  );
};

export default CartOverview;
