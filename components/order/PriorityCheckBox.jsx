"use client";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const PriorityCheckBox = ({ priority, setPriority }) => {
  return (
    <div className="flex items-center gap-5">
      <Checkbox
        id="priority"
        checked={priority}
        onCheckedChange={(v) => setPriority(Boolean(v))}
        className="data-[state=checked]:bg-[#a21caf] data-[state=checked]:border-[#a21caf] 
               hover:data-[state=checked]:bg-[#ec4899] 
               hover:data-[state=checked]:border-[#ec4899]"
      />
      <Label htmlFor="priority">Want to give your order priority? (+20%)</Label>
    </div>
  );
};

export default PriorityCheckBox;
