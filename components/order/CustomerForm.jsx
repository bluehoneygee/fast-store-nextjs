"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CustomerForm = ({
  customer,
  setCustomer,
  username,
  updateName,
  errors,
  validateField,
}) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Label htmlFor="customer" className="sm:basis-40">
        First Name
      </Label>
      <div className="grow">
        <Input
          id="customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          onBlur={(e) => {
            validateField("customer", e.target.value);
            if (e.target.value.trim() && e.target.value.trim() !== username) {
              updateName(e.target.value.trim());
            }
          }}
          required
        />
        {errors.customer && (
          <p className="mt-2 text-xs text-red-700">{errors.customer}</p>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
