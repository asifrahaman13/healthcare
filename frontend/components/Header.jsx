import React, { useEffect, useState } from "react";
import axios from "axios";
import NavLink from "next/link";

const backend_domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const Header = () => {
  const [statistics, setStatistics] = useState({
    total_doctors: 0,
    total_users: 0,
    total_appointments:0
  });
  useEffect(() => {
    async function getStat() {
      try {
        const statistics = await axios.get(`${backend_domain}/utility/stats`);
        setStatistics(statistics.data);
      } catch (err) {}
    }
    getStat();
  }, []);

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Our Vision
              <br class="hidden lg:inline-block" />
              Your remedies
            </h1>
            <p class="mb-8 leading-relaxed">
              We are reshaping the healthcare industry of 21th century. Our
              vision is to provide perfect healthcare services to all over the
              globe. Get doctors advice from any where and keep your health in
              healthy conditions. We strongly respect your privacy and data.
            </p>

            <div class="flex justify-center">
              <NavLink href="/signin">
                <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Subscribe
                </button>
              </NavLink>
              <NavLink href="/about">
                <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Learn More
                </button>
              </NavLink>
            </div>
          </div>

          <div class="lg:max-w-lg lg:w-full md:w-1/2 ">
            <img
              class="object-cover object-center rounded h-full w-full opacity-75 "
              alt="hero"
              src="https://img.freepik.com/premium-vector/group-doctors-consulting-with-each-other_179970-2906.jpg?w=2000"
            />
          </div>
        </div>
        <section class="text-gray-600 body-font ">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4 text-center">
              <div class="p-4 sm:w-1/3 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  {statistics.total_users}
                </h2>
                <p class="leading-relaxed">Users</p>
              </div>

              <div class="p-4 sm:w-1/3 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  {statistics.total_doctors}
                </h2>
                <p class="leading-relaxed">Total Doctors</p>
              </div>
              <div class="p-4 sm:w-1/3 w-1/2">
                <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                  {statistics.total_appointments}
                </h2>
                <p class="leading-relaxed">Total Appointments</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Header;
