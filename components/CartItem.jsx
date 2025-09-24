"use client";

import { useCartStore } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CartItem = ({ item }) => {
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);

  return (
    <li className="flex items-center justify-between py-4 border-b border-[#ec4899]/30 font-poppins ">
      <div className="flex-1 text-stone-800">
        <span className="mr-2 font-semibold text-[#a21caf]">
          {item.quantity}×
        </span>
        <span className="font-grotesk">{item.name}</span>
      </div>

      <div className="w-24 text-right font-semibold text-[#ec4899]">
        {formatCurrency(item.totalPrice)}
      </div>

      <div className="flex items-center gap-2 mx-4">
        <Button
          onClick={() => decrement(item.id)}
          className="h-10 w-10 rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-bold p-0"
          aria-label="decrease"
        >
          –
        </Button>
        <span className="font-semibold text-stone-800">{item.quantity}</span>
        <Button
          onClick={() => increment(item.id)}
          className="h-10 w-10 rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-bold p-0"
          aria-label="increase"
        >
          +
        </Button>
      </div>

      <Button
        onClick={() => remove(item.id)}
        className="px-4 py-2 rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-semibold"
      >
        Delete
      </Button>
    </li>
  );
};

export default CartItem;
