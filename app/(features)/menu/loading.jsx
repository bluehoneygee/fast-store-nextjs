const Loading = () => {
  return (
    <ul className="px-4 py-6 max-w-2xl mx-auto space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b border-[#ec4899]/30 animate-pulse"
        >
          <div className="h-16 w-16 sm:h-12 sm:w-12 rounded-md bg-[#f9e2f3] shrink-0" />

          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 w-3/4 bg-[#f9e2f3] rounded" />
            <div className="h-3 w-full bg-[#f9e2f3] rounded" />
          </div>

          <div className="h-4 w-16 bg-[#f9e2f3] rounded sm:w-20 sm:text-right" />

          <div className="flex items-center gap-2">
            <div className="h-8 w-20 rounded-full bg-[#f9e2f3]" />
          </div>

          <div className="h-4 w-16 bg-[#f9e2f3] rounded sm:w-24 sm:text-right" />
        </li>
      ))}
    </ul>
  );
};

export default Loading;
