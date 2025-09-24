"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    router.push(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-40 rounded-full bg-[#f8eaf2] px-4 py-2 text-sm transition-all duration-300 placeholder:text-[#a1a1aa] focus:outline-none focus:ring focus:ring-[#ec4899] focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
};

export default SearchOrder;
