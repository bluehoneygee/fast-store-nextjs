import React from "react";

const CartOverview = () => {
  return (
    <div>
      <p>
        <span>4 product</span>
        <span>$322.55</span>
      </p>
      <Link href="/cart">Open cart →</Link>
    </div>
  );
};

export default CartOverview;
