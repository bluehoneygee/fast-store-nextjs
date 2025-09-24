"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrderStore } from "@/lib/store/order";
import { calcMinutesLeft, formatCurrency, formatDate } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function OrderDetailLocal() {
  const { orderID } = useParams();
  const router = useRouter();
  const getOrder = useOrderStore((s) => s.getOrder);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const order = hydrated ? getOrder(orderID) ?? null : null;

  const createdAtISO = order?.createdAtISO ?? null;

  const estimatedDelivery = useMemo(() => {
    if (!createdAtISO) return null;
    const t = new Date(createdAtISO).getTime() + 60 * 60 * 1000;
    return new Date(t).toISOString();
  }, [createdAtISO]);

  const deliveryIn = estimatedDelivery ? calcMinutesLeft(estimatedDelivery) : 0;
  const status =
    estimatedDelivery && deliveryIn >= 0 ? "preparing" : "delivered";

  if (!hydrated) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-stone-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-stone-100 rounded animate-pulse" />
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="h-5 w-24 bg-stone-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-stone-100 rounded animate-pulse" />
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="h-5 w-20 bg-stone-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-stone-100 rounded animate-pulse" />
        </div>
        <Separator />
        <div className="h-10 w-48 bg-stone-200 rounded animate-pulse ml-auto" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center space-y-3">
        <h1 className="text-xl font-bold">Order not found</h1>
        <p className="text-muted-foreground">
          Coba buat order baru dari cart kamu.
        </p>
        <Button onClick={() => router.push("/menu")}>Create new order</Button>
      </div>
    );
  }

  const { id, priority, cart = [], orderPrice, priorityPrice } = order;
  const totalToPay = orderPrice + (priority ? priorityPrice : 0);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold font-grotesk text-[#a21caf]">
            Order #{id}
          </h1>
          <div className="flex items-center gap-2 font-poppins">
            {priority && <Badge variant="destructive">Priority</Badge>}
            <Badge variant="secondary" className="capitalize">
              {status}
            </Badge>
          </div>
        </div>
        {createdAtISO && (
          <p className="text-sm text-muted-foreground">
            Placed: {formatDate(createdAtISO)}
          </p>
        )}
      </header>

      <Separator />

      <section className="space-y-1">
        <h2 className="font-semibold font-grotesk">Status</h2>
        <p>
          {estimatedDelivery && deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left`
            : "Order should have arrived"}
        </p>
        {estimatedDelivery && (
          <p className="text-sm text-muted-foreground">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        )}
      </section>

      <Separator />

      <section className="space-y-2">
        <h2 className="font-semibold font-grotesk">Items</h2>

        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No items found for this order.
          </p>
        ) : (
          cart.map((item, idx) => (
            <div key={item.id ?? idx}>
              <div className="flex justify-between">
                <span className="font-grotesk">
                  {item.name} × {item.quantity}
                </span>
                <span>{formatCurrency(item.totalPrice)}</span>
              </div>
              {idx < cart.length - 1 && <Separator className="my-2" />}
            </div>
          ))
        )}
      </section>

      <Separator />

      <section className="space-y-1">
        <h2 className="font-semibold font-grotesk">Payment</h2>
        <p>Products: {formatCurrency(orderPrice)}</p>
        {priority && <p>Priority (+20%): {formatCurrency(priorityPrice)}</p>}
        <Separator className="my-2 opacity-50" />
        <p className="font-semibold font-grotesk">
          To pay on delivery: {formatCurrency(totalToPay)}
        </p>
      </section>

      <div className="flex justify-end">
        <Button
          onClick={() => router.push("/menu")}
          className="bg-[#ec4899] hover:bg-[#a21caf] text-white font-poppins"
        >
          Create another order
        </Button>
      </div>
    </div>
  );
}
