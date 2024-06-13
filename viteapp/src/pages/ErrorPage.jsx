import { NavBar } from "../components";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      <NavBar />
      <div className="flex-grow w-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-royal-blue">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
