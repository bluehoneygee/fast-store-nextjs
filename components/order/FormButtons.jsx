"use client";

import { Button } from "../ui/button";

const FormButtons = ({ isFormInvalid, submitting, router }) => {
  return (
    <div className="flex gap-3 font-poppins">
      <Button
        type="submit"
        disabled={isFormInvalid}
        className="bg-[#ec4899] hover:bg-[#a21caf] text-white"
      >
        {submitting ? "Placing order..." : "Order now"}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="border border-[#ec4899] text-[#ec4899] hover:border-[#a21caf] hover:text-[#a21caf]"
      >
        ← Go back
      </Button>
    </div>
  );
};

export default FormButtons;
