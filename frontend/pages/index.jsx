import Contact from "../components/Contact.jsx";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import Services from "../components/Services.jsx";
import Header from "../components/Header.jsx";
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
export default function Home() {
  const [doctors, setDoctors] = useState([
    {
      _id: "",
      fullName: "",
      educations: "", // Fixed the typo in "educations"
      department: "",
      address: "",
    },
  ]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/users/get-all-doctors`,
        {}
      );

      setDoctors(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="bg-gray-100 font-sans">
        <div className="text-black py-20 shadow-lg bg-gradient-to-r from-blue-200 to-indigo-400 bg-opacity-50">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-black">
              Your Health, Our Priority
            </h1>
            <p className="text-lg mb-8 text-black">
              Providing quality healthcare services for a healthier tomorrow.
            </p>
            <a
              href="#services"
              className="bg-white py-2 px-6 rounded-full font-semibold hover:bg-blue-200 transition duration-300 text-black shadow-md"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        <Header />
        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container mx-auto text-center">
            <Services />
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-gray-200 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">See our Doctors</h2>
            {/* Add information about your healthcare organization */}
          </div>
        </section>

        <div className="flex flex-wrap -m-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-8 items-center mt-32 mx-auto max-w-screen-2xl">
            {doctors.map((item, idx) => (
              <div className="product max-w-2xl overflow-hidden shadow-lg flex flex-col h-full group hover:transition duration-300 transform hover:-translate-y-2 hover:shadow-xl mb-8 mx-4 rounded-xl">
                <Link href={`/doctor/${item._id}`}>
                  <img
                    src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                    className="w-full h-40 object-cover text-gray-900"
                  />
                  <div className="px-3 py-2 flex-grow">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-sm mb-1 text-gray-900">
                        {item._id}
                      </div>
                      <span className="text-gray-900 text-xl"></span>
                    </div>
                    <p className="text-gray-900 text-sm">{item.fullName}</p>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-sm mb-1 text-gray-900">
                        {item.address}
                      </div>
                      <span className="text-gray-900 text-xl"></span>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <span className="text-gray-900 text-sm"></span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <section id="about" className="bg-gray-200 py-16 mt-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Partners all over the globe
            </h2>
            {/* Add information about your healthcare organization */}
          </div>
        </section>
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
              <div class="p-4 lg:w-1/3">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Raclette Blueberry Nextious Level
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <a class=" inline-flex items-center">
                    Learn More
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                  <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                    <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        class="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        class="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
              <div class="p-4 lg:w-1/3">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Ennui Snackwave Thundercats
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <a class="text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                  <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                    <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        class="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        class="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
              <div class="p-4 lg:w-1/3">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Selvage Poke Waistcoat Godard
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <a class="text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                  <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                    <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        class="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        class="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Contact />
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-indigo-500 text-xs tracking-widest font-medium mb-1">
              ROOF PARTY POLAROID
            </h2>
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-900">
              See Our Customers' Feedback
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-green-300 rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9-9-24 7 7h4l3 9z"></path>
                  </svg>
                </div>
                <h2 className="text-gray-900 text-lg font-medium">Sam Karn</h2>
              </div>
              <p className="text-base leading-relaxed">
                "This charging station is a game-changer for me! As a frequent
                road tripper, I rely on dependable charging points, and this one
                never disappoints. It's always in good working condition, and
                the multiple ports ensure I can charge both my EV and my
                friend's without any hassle. Thumbs up!"
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center text-indigo-500"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="bg-green-300 rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9-9-24 7 7h4l3 9z"></path>
                  </svg>
                </div>
                <h2 className="text-gray-900 text-lg font-medium">John Wick</h2>
              </div>
              <p className="text-base leading-relaxed">
                "I definitely got one of the best services from ASTRA. They give
                quality services. Earlier it was very inconvenitent to find the
                proper EV aound. Now it is quite easy and at the same time
                conveninet to find them all due to ASTRA."
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center text-indigo-500"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="bg-green-300 rounded-lg p-8 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 mr-3 flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9-9-24 7 7h4l3 9z"></path>
                  </svg>
                </div>
                <h2 className="text-gray-900 text-lg font-medium">Jain Paul</h2>
              </div>
              <p className="text-base leading-relaxed">
                "In the ever increasing world of power consumption where green
                energey is exploding we need a proper system to manage the
                entire ecosystem. Astra are among those organizations which
                solves the problem to a large scale. "
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center text-indigo-500"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            {/* Add two more reviews here with similar structure */}
          </div>
        </div>
      </section>
    </>
  );
}
