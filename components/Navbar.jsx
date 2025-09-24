import Link from "next/link";
import SearchOrder from "./SearchOrder";
import Username from "./Username";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#f9e2f3] uppercase font-bold px-4 py-3 border-b-2 sm:px-6 font-grotesk">
      <Link
        href="/"
        className="tracking-widest text-[#a21caf] hover:text-[#86198f] transition-colors"
      >
        Fast Store
      </Link>
      <SearchOrder />
      <Username />
    </nav>
  );
};

export default Navbar;
