const PermissionError = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white-200">
      <h1 className="text-red-600 font-bold mb-6">ERROR</h1>
      <p className="text-navy-blue font-medium">
        You don&apos;t have permission to view this page
      </p>
    </div>
  );
};

export default PermissionError;
