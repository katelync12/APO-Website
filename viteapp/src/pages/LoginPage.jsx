import { StockImg, APOTorchVivid } from "../assets";
import { CustomButton } from "../components";

const LoginPage = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Left Half */}
      <div className="w-1/2 bg-white-200 sm:block hidden">
        <img
          src={StockImg}
          alt="Stock"
          className="object-cover w-[2000px] h-full"
        />
      </div>

      {/* Right Half */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full bg-white-200">
        {/* Logo */}
        <div className="absolute top-10">
          <img
            src={APOTorchVivid}
            alt="APO Logo"
            className="mb-8 w-80 h-auto"
          />
        </div>
        {/* Form Container */}
        <div className="w-full max-w-lg mt-24 p-2 flex flex-col items-center">
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
          <form className="w-full">
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
              />
            </div>

            <div className="flex flex-col items-center justify-between mt-8 mb-4">
              <CustomButton
                button_text={"Log In"}
                link={"#login"}
                color_styles={"bg-royal-blue text-white"}
                hover_color={"hover:bg-royal-blue-700"}
              />
              <a
                href="#"
                className="text-sm text-royal-blue hover:text-blue-600 underline"
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
              link={"#signingoogle"}
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