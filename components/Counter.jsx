import { Button } from "./ui/button";

const Counter = ({ value = 0, onDec, onInc, size = "md", className = "" }) => {
  const sizes = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        type="button"
        onClick={onDec}
        aria-label="decrease"
        className={`${sizes[size]} rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-bold p-0`}
      >
        –
      </Button>

      <span className="min-w-6 text-center font-semibold text-stone-800">
        {value}
      </span>

      <Button
        type="button"
        onClick={onInc}
        aria-label="increase"
        className={`${sizes[size]} rounded-full bg-[#ec4899] hover:bg-[#a21caf] text-white font-bold p-0`}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
