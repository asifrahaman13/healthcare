import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            👨🏼‍⚕️
            <Link href="/">
              <span className="ml-3 text-xl">Doco</span>
            </Link>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" href="/">
              Home
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/about">
              About
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/doctors">
              Doctors
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
