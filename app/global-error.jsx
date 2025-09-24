"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GlobalError = ({ error, reset }) => {
  const router = useRouter();

  let message = error?.message || "Unexpected error occurred.";

  if (message.includes("ENOTFOUND")) {
    message = "Server not found. Please check the API URL.";
  } else if (message.includes("ECONNREFUSED")) {
    message = "Could not connect to the server.";
  } else if (message.includes("ECONNABORTED")) {
    message = "Request timed out. Please try again.";
  } else if (message.includes("Network Error")) {
    message = "Network error. Please check your internet connection.";
  }
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#f9e2f3]">
        <Image
          src="/error-page.svg"
          alt="Error illustration"
          width={300}
          height={300}
          className="mb-6"
        />

        <h1 className="text-2xl font-bold text-[#a21caf]">
          Something went wrong :(
        </h1>

        <p className="my-4 text-[#53385a]">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded bg-[#ec4899] hover:bg-[#a21caf] text-white transition-colors"
          >
            Try again
          </button>

          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded border border-[#ec4899] text-[#ec4899] hover:border-[#a21caf] hover:text-[#a21caf] transition-colors"
          >
            ← Go back
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
