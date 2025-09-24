import { calcMinutesLeft, formatCurrency, formatDate } from "@/lib/utils";

export const order = {
  id: "XYZ123",
  status: "preparing", // "preparing" | "on-the-way" | "delivered"
  customer: "Anggi",
  phone: "+62-812-3456-7890",
  address: "Jl. Merdeka No. 45, Jakarta, Indonesia",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      id: 1,
      name: "Fjallraven - Foldsack No. 1 Backpack",
      quantity: 1,
      unitPrice: 109.95,
      totalPrice: 109.95,
    },
    {
      id: 2,
      name: "Mens Casual Premium Slim Fit T-Shirts",
      quantity: 2,
      unitPrice: 22.3,
      totalPrice: 44.6,
    },
    {
      id: 3,
      name: "Solid Gold Petite Micropave",
      quantity: 1,
      unitPrice: 168,
      totalPrice: 168,
    },
  ],
  position: "-6.200,106.816",
  orderPrice: 322.55,
  priorityPrice: Math.round(322.55 * 0.2),
};

const OrderDetailPage = () => {
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const totalToPay = orderPrice + (priority ? priorityPrice : 0);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
};

export default OrderDetailPage;
