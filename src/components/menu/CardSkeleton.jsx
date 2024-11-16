function CardSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-[20px] shadow-lg h-[300px]">
      <div className="h-48 bg-gray-300 rounded-t-[20px]"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}

export default CardSkeleton;
