import { useCartStore } from "@/lib/store/cart";
import CartItem from "./CartItem";

const CartList = () => {
  const cart = useCartStore((s) => s.cart);
  return (
    <ul className="mt-4 space-y-3">
      {cart.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </ul>
  );
};

export default CartList;
