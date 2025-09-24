"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AddressField = ({
  addressInput,
  setAddressInput,
  setAddressStore,
  validateField,
  handleGetPosition,
  loadingAddress,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Label htmlFor="address" className="sm:basis-40">
        Address
      </Label>
      <div className="grow flex gap-2">
        <Input
          id="address"
          value={addressInput}
          onChange={(e) => {
            setAddressInput(e.target.value);
            setAddressStore?.(e.target.value);
          }}
          onBlur={(e) => validateField("address", e.target.value)}
          required
        />
        {addressInput.trim().length === 0 && (
          <Button
            type="button"
            onClick={handleGetPosition}
            disabled={loadingAddress}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {loadingAddress ? "Loading..." : "Get position"}
          </Button>
        )}
      </div>
      {errors.address && (
        <p className="mt-2 text-xs text-red-700">{errors.address}</p>
      )}
    </div>
  );
};

export default AddressField;
