"use client";
import { formatCurrency } from "@/lib/utils";

import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const OrderSummary = ({
  cart,
  orderPrice,
  priority,
  priorityPrice,
  totalToPay,
  errors,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-grotesk">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 ">
        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, idx) => {
              const name = item.name ?? item.title ?? `Product #${item.id}`;
              const qty = item.quantity ?? 1;
              const unit = item.unitPrice ?? item.price ?? 0;
              const lineTotal = item.totalPrice ?? unit * qty;
              return (
                <div key={item.id ?? idx}>
                  <div className="flex justify-between">
                    <span className="font-grotesk">
                      {name} × {qty}
                    </span>
                    <span>{formatCurrency(lineTotal)}</span>
                  </div>
                  {idx < cart.length - 1 && <Separator className="my-2" />}
                </div>
              );
            })}
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Products</span>
              <span>{formatCurrency(orderPrice)}</span>
            </div>
            {priority && (
              <div className="flex justify-between">
                <span>Priority (+20%)</span>
                <span>{formatCurrency(priorityPrice)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold">
              <span>Total to pay</span>
              <span>{formatCurrency(totalToPay)}</span>
            </div>
          </>
        )}
        {errors.cart && cart.length === 0 && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {errors.cart}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
