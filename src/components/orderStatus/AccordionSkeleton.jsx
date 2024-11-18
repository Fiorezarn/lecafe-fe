function AccordionSkeleton() {
  return (
    <div className="animate-pulse flex justify-between items-center w-full p-4 bg-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="w-24 h-6 bg-gray-300 rounded"></div>
    </div>
  );
}

export default AccordionSkeleton;
