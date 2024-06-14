import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StockImg, APOTorchVivid } from "../assets";
import { CustomButton } from "../components";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in...");
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log("login success");
        navigate("/calendar");
      })
      .catch((error) => {
        console.error("Authentication error: ", error);
        setError("Invalid username or password");
      });
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Left Half */}
      <div className="sm:w-1/2 bg-white-200 sm:block hidden">
        <img
          src={StockImg}
          alt="Stock"
          className="object-cover w-[2000px] h-full"
        />
      </div>

      {/* Right Half */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center h-full bg-white-200 px-6">
        {/* Logo */}
        <div className="absolute top-10">
          <img
            src={APOTorchVivid}
            alt="APO Logo"
            className="mb-8 w-80 h-auto"
          />
        </div>
        {/* Form Container */}
        <div className="w-full max-w-lg mt-12 md:mt-24 p-2 flex flex-col items-center">
          {/* Welcome Text */}
          <div className="w-full text-left">
            <h1 className="mb-4 text-4xl font-bold text-royal-blue">
              Welcome Back!
            </h1>
            <p className="mb-6 text-md text-gray-500">
              Enter your account details to continue
            </p>
          </div>

          {/* Login Form */}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-3 py-2 border text-gray-700 bg-white-300 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Your Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border text-gray-700 text-black-100 bg-white-300 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="mb-4 text-red-500">{error}</p>}

            <div className="flex flex-col items-center justify-between mt-8 mb-4">
              <button
                type="submit"
                className="w-full px-3 py-2 bg-royal-blue text-white rounded-lg hover:bg-royal-blue-700"
              >
                Log In
              </button>
              <a
                href="#"
                className="text-sm text-royal-blue hover:text-blue-600 underline mt-4"
              >
                Forgot password?
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Sign Up Button */}
            <CustomButton
              button_text={"Sign in with Google"}
              link={"/accounts/google/login/"}
              color_styles={
                "bg-gray-100 text-royal-blue bg-gray-100 border-gray-300"
              }
              hover_color={
                "hover:text-blue-700 hover:bg-gray-200 hover:bg-gray-200"
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
