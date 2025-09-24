"use client";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "./ui/button";

const MenuItem = ({ product }) => {
  const add = useCartStore((s) => s.add);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
  const cart = useCartStore((s) => s.cart);

  const { id, title, price, description, image } = product;
  const inCart = cart.find((it) => it.id === id);

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b border-[#ec4899]">
      <div className="relative h-16 w-16 sm:h-12 sm:w-12 rounded-md overflow-hidden bg-[#f9e2f3] shrink-0">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate text-stone-800 font-grotesk">
          {title}
        </p>
        <p className="text-sm text-stone-500 line-clamp-2">{description}</p>
      </div>

      <div className="text-[#ec4899] font-medium sm:w-20 sm:text-right font-poppins">
        {formatCurrency(price)}
      </div>

      <div className="flex flex-wrap items-center gap-2 font-poppins">
        {!inCart ? (
          <Button
            onClick={() => add(product, 1)}
            className="rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-semibold px-4 py-2 text-sm"
          >
            Add To Cart
          </Button>
        ) : (
          <>
            <Button
              onClick={() => decrement(id)}
              className="h-8 w-8 rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-bold p-0"
            >
              –
            </Button>
            <span className="w-6 text-center font-poppins">
              {inCart.quantity}
            </span>
            <Button
              onClick={() => increment(id)}
              className="h-8 w-8 rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-bold p-0"
            >
              +
            </Button>
            <Button
              onClick={() => remove(id)}
              className="rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-semibold px-4 py-2 text-sm"
            >
              Delete
            </Button>
          </>
        )}
      </div>

      <div className="font-semibold text-stone-800 sm:w-24 sm:text-right font-poppins">
        {inCart ? formatCurrency(inCart.totalPrice) : null}
      </div>
    </li>
  );
};

export default MenuItem;
