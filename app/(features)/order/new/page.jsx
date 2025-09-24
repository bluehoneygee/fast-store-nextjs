const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

import React from "react";

const OrderPage = () => {
  const cart = fakeProducts;
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <form>
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button>Order now</button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
