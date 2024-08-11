const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex flex-row items-center">
        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="w-7 h-7 border-4 border-t-6 border-t-gray-400 border-royal-blue rounded-full animate-spin"></div>
        </div>
        {/* Loading Text */}
        <span className="text-2xl font-bold text-royal-blue ml-4 z-15">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
