import React, { useEffect, useState } from "react";
import NavLink from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isUser, setIsUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user_access_token = localStorage.getItem("user_access_token");
    const doctor_access_token = localStorage.getItem("doctor_access_token");
    if (user_access_token || doctor_access_token) {
      setIsUser(true);
    }
  }, []);

  function deleteLocalStorage() {
    localStorage.removeItem("user_access_token");
    localStorage.removeItem("doctor_access_token");
    router.push("/");
    // window.location.reload();
  }
  return (
    <>
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <NavLink
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>

            <span class="ml-3 text-xl">Doco</span>
          </NavLink>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {isUser === true ? (
              <>
                <NavLink class="mr-5 hover:text-gray-900" href="/">
                  Home
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/chatbot">
                  Chatbot
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/about">
                  About
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/doctors">
                  Doctors
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/profile">
                  Profile
                </NavLink>
                <NavLink
                  href="/"
                  className="mr-5 hover:text-gray-900"
                  onClick={() => {
                    deleteLocalStorage();
                  }}
                >
                  Logout
                </NavLink>
                <NavLink
                  href="/profile"
                  class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                >
                  Profile
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink class="mr-5 hover:text-gray-900" href="/">
                  Home
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/chatbot">
                  Chatbot
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/about">
                  About
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/doctors">
                  Doctors
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/signin">
                  Signin
                </NavLink>
                <NavLink class="mr-5 hover:text-gray-900" href="/login">
                  Login
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
