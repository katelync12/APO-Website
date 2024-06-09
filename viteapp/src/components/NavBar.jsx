import { useState, useEffect, useRef } from "react";
import { APOBadge } from "../assets";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);

  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDoubleDropdown = () =>
    setIsDoubleDropdownOpen(!isDoubleDropdownOpen);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsNavOpen(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setIsDoubleDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navbarElementStyles =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  const dropdownElementStyles =
    "block px-4 py-2 text-white hover:bg-royal-blue-800 dark:hover:bg-royal-blue-800 dark:hover:text-white";

  const doubleDropdownElementStyles =
    "block px-4 py-2 hover:bg-royal-blue-800 dark:hover:bg-royal-blue-800 dark:text-gray-200 dark:hover:text-white";

  return (
    <nav className="bg-royal-blue border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={APOBadge} className="h-8" alt="APO Online" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            APO Online
          </span>
        </a>
        <button
          onClick={toggleNav}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          aria-expanded={isNavOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          ref={navRef}
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className={`${navbarElementStyles}`}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a href="/calendar" className={`${navbarElementStyles}`}>
                Calendar
              </a>
            </li>
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-navy-blue md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-navy-blue dark:bg-navy-blue md:dark:hover:bg-transparent"
              >
                Account
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 3"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-navy-blue dark:divide-gray-600`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li>
                    <a
                      href="/event/create"
                      className={`${dropdownElementStyles}`}
                    >
                      Create Event
                    </a>
                  </li>
                  <li className="relative">
                    <button
                      onClick={toggleDoubleDropdown}
                      className="flex items-center justify-between w-full px-4 py-2 text-white  dark:bg-navy-blue hover:bg-royal-blue-800 dark:hover:bg-royal-blue-800 dark:hover:text-white"
                    >
                      My Account
                      <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      className={`${
                        isDoubleDropdownOpen ? "block" : "hidden"
                      } absolute left-full top-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-navy-blue-600`}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="doubleDropdownButton"
                      >
                        <li>
                          <a
                            href="#"
                            className={`${doubleDropdownElementStyles}`}
                          >
                            Overview
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className={`${doubleDropdownElementStyles}`}
                          >
                            My downloads
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className={`${doubleDropdownElementStyles}`}
                          >
                            Billing
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className={`${doubleDropdownElementStyles}`}
                          >
                            Rewards
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      href="/account/create"
                      className={`${dropdownElementStyles}`}
                    >
                      Create New Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="/account/roles"
                      className={`${dropdownElementStyles}`}
                    >
                      Edit Roles
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="/" // takes back to login page for now?
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-royal-blue-800 dark:hover:bg-royal-blue-800 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </li>
            <li>
              <a href="/requirements" className={`${navbarElementStyles}`}>
                Requirements
              </a>
            </li>
            <li>
              <a href="/profile" className={`${navbarElementStyles}`}>
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
