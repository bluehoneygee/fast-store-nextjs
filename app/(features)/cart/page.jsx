import Link from "next/link";

const fakeProducts = [
  {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpack",
    quantity: 2,
    unitPrice: 109.95,
    totalPrice: 219.9,
  },
  {
    id: 2,
    name: "Mens Casual Premium Slim Fit T-Shirts",
    quantity: 1,
    unitPrice: 22.3,
    totalPrice: 22.3,
  },
  {
    id: 3,
    name: "Solid Gold Petite Micropave",
    quantity: 1,
    unitPrice: 168,
    totalPrice: 168,
  },
];

const CartPage = () => {
  const cart = fakeProducts;

  return (
    <div>
      <Link href="/menu">&larr; Back to menu</Link>
      <h2>Your cart, %NAME%</h2>
      <div>
        <Link href="/order/new">Order product</Link>
        <button>Clear cart</button>
      </div>
    </div>
  );
};

export default CartPage;
