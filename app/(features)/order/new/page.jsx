"use client";

import AddressField from "@/components/order/AddressField";
import CustomerForm from "@/components/order/CustomerForm";
import FormButtons from "@/components/order/FormButtons";
import OrderSummary from "@/components/order/OrderSummary";
import PriorityCheckBox from "@/components/order/PriorityCheckBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cart";
import { useOrderStore } from "@/lib/store/order";
import { useUserStore } from "@/lib/store/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str.trim()
  );

export default function CreateOrderPage() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clear);
  const addOrder = useOrderStore((s) => s.addOrder);

  const username = useUserStore((s) => s.username);
  const updateName = useUserStore((s) => s.updateName);
  const userAddress = useUserStore((s) => s.address);
  const setAddressStore = useUserStore((s) => s.setAddress);

  const [customer, setCustomer] = useState(username || "");
  const [addressInput, setAddressInput] = useState(userAddress || "");
  const [phone, setPhone] = useState("");
  const [priority, setPriority] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);

  const [errors, setErrors] = useState({
    customer: "",
    phone: "",
    address: "",
    cart: "",
  });

  useEffect(() => {
    if (username && !customer) setCustomer(username);
  }, [username, customer]);
  useEffect(() => {
    if (userAddress && !addressInput) setAddressInput(userAddress);
  }, [userAddress, addressInput]);

  const orderPrice = useMemo(
    () =>
      cart.reduce((sum, it) => {
        const qty = it.quantity ?? 1;
        const unit = it.unitPrice ?? it.price ?? 0;
        const line = it.totalPrice ?? unit * qty;
        return sum + line;
      }, 0),
    [cart]
  );

  const priorityPrice = useMemo(
    () => Math.round(orderPrice * 0.2),
    [orderPrice]
  );
  const totalToPay = priority ? orderPrice + priorityPrice : orderPrice;

  function validateAll() {
    const next = { customer: "", phone: "", address: "", cart: "" };
    if (customer.trim().length < 2) next.customer = "Nama minimal 2 karakter.";
    if (!isValidPhone(phone)) next.phone = "Nomor telepon tidak valid.";
    if (addressInput.trim().length < 6) next.address = "Alamat terlalu pendek.";
    if (cart.length === 0) next.cart = "Keranjang masih kosong.";
    setErrors(next);
    return !Object.values(next).some(Boolean);
  }

  function validateField(name, value) {
    setErrors((prev) => {
      const copy = { ...prev };
      if (name === "customer")
        copy.customer =
          value.trim().length < 2 ? "Nama minimal 2 karakter." : "";
      if (name === "phone")
        copy.phone = !isValidPhone(value) ? "Nomor telepon tidak valid." : "";
      if (name === "address")
        copy.address = value.trim().length < 6 ? "Alamat terlalu pendek." : "";
      return copy;
    });
  }

  const isFormInvalid =
    submitting ||
    !customer.trim() ||
    !phone.trim() ||
    !addressInput.trim() ||
    cart.length === 0 ||
    !!errors.customer ||
    !!errors.phone ||
    !!errors.address;

  async function handleGetPosition() {
    setLoadingAddress(true);
    try {
      await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      ).then(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const { data } = await axios.get(
          "https://api.bigdatacloud.net/data/reverse-geocode-client",
          { params: { latitude, longitude } }
        );
        const addr = `${data?.locality || ""}, ${data?.city || ""} ${
          data?.postcode || ""
        }, ${data?.countryName || ""}`.trim();
        setAddressInput(addr);
        setAddressStore?.(addr);
        setErrors((prev) => ({ ...prev, address: "" }));
      });
    } catch (e) {
      setErrors((prev) => ({
        ...prev,
        address: "Silakan masukkan alamat manual.",
      }));
    } finally {
      setLoadingAddress(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitting(true);
    try {
      const id = Date.now().toString();
      const createdAtISO = new Date().toISOString();
      const normalizedCart = cart.map((it) => {
        const name = it.name ?? it.title ?? `Product #${it.id}`;
        const quantity = it.quantity ?? 1;
        const unitPrice = it.unitPrice ?? it.price ?? 0;
        const totalPrice = it.totalPrice ?? unitPrice * quantity;
        return { id: it.id, name, quantity, unitPrice, totalPrice };
      });

      if (customer.trim() && customer.trim() !== username)
        updateName(customer.trim());

      const newOrder = {
        id,
        customer: customer.trim(),
        phone: phone.trim(),
        address: addressInput.trim(),
        priority,
        cart: normalizedCart,
        orderPrice,
        priorityPrice: priority ? priorityPrice : 0,
        createdAtISO,
      };
      addOrder(newOrder);
      clearCart();
      router.push(`/order/${id}`);
    } catch {
      alert("Failed creating your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-[#a21caf] font-grotesk">
        Ready to order? Let&apos;s go!
      </h2>
      <OrderSummary
        cart={cart}
        orderPrice={orderPrice}
        priority={priority}
        priorityPrice={priorityPrice}
        totalToPay={totalToPay}
        errors={errors}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomerForm
          customer={customer}
          setCustomer={setCustomer}
          username={username}
          updateName={updateName}
          errors={errors}
          validateField={validateField}
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Label htmlFor="phone" className="sm:basis-40">
            Phone number
          </Label>
          <div className="grow">
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={(e) => validateField("phone", e.target.value)}
              required
            />
            {errors.phone && (
              <p className="mt-2 text-xs text-red-700">{errors.phone}</p>
            )}
          </div>
        </div>
        <AddressField
          addressInput={addressInput}
          setAddressInput={setAddressInput}
          setAddressStore={setAddressStore}
          validateField={validateField}
          handleGetPosition={handleGetPosition}
          loadingAddress={loadingAddress}
          errors={errors}
        />
        <PriorityCheckBox priority={priority} setPriority={setPriority} />
        <FormButtons
          isFormInvalid={isFormInvalid}
          submitting={submitting}
          router={router}
        />
      </form>
    </div>
  );
}
