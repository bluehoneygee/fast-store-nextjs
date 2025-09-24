import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#f9e2f3]">
      <Image
        src="/404.svg"
        alt="404 illustration"
        width={300}
        height={300}
        className="mb-6"
      />

      <h2 className="text-3xl font-bold mb-4 text-[#a21caf]">
        404 – Page Not Found
      </h2>
      <p className="text-gray-700 mb-6">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-[#ec4899] text-white rounded hover:bg-[#a21caf] transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;
