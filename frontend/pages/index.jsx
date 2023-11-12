import Contact from "../components/Contact.jsx";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Services from "../components/Services.jsx";
import Header from "../components/Header.jsx";
import ReactTyped from "react-typed";
import Faqs from "../components/Faqs.jsx";

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

  async function fetchDoctors() {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/users/get-all-doctors`,
        {}
      );

      setDoctors(response.data);
      console.log(doctors)
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="bg-gray-100 font-sans">
        <div className="text-black py-20 shadow-lg bg-gradient-to-r from-blue-200 to-indigo-400 bg-opacity-50">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 text-black typing-effect">
              <ReactTyped strings={["Welcome to Doco"]} typeSpeed={100} loop />
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
    
            <Services />
       

       {doctors==[] && <>
          {/* About Us Section */}
          <section id="about" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              <ReactTyped strings={["See our doctors"]} typeSpeed={100} loop />
            </h2>
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
       </>}

     

        <section id="about" className="py-16 mt-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              <ReactTyped
                strings={["Why choose us?"]}
                typeSpeed={100}
                loop
              />
            </h2>
            {/* Add information about your healthcare organization */}
          </div>
        </section>
        <section class="text-gray-600 body-font bg-yellow-200">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-4">
              <div class="p-4 lg:w-1/3">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24overflow-hidden text-center relative hover:transition duration-300 transform  hover:-translate-y-2 hover:shadow-xl rounded-xl">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Telehealth Services
                  </h1>
                  <p class="leading-relaxed">
                    Experience accessible and convenient healthcare with our
                    Telehealth Services. Connect with experienced healthcare
                    professionals from the comfort of your home. Whether you
                    need a consultation, prescription refill, or general medical
                    advice, our telehealth platform is here to provide you with
                    the care you deserve. Embrace the future of healthcare with
                    seamless virtual appointments.
                  </p>
                  
                </div>
              </div>
              <div class="p-4 lg:w-1/3">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 overflow-hidden text-center relative hover:transition duration-300 transform  hover:-translate-y-2 hover:shadow-xl rounded-xl">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Specialized Care Programs
                  </h1>
                  <p class="leading-relaxed">
                    Discover personalized healthcare through our Specialized
                    Care Programs. Tailored to meet your unique needs, our
                    programs cover a range of health concerns, from chronic
                    conditions to mental health support. Our dedicated team of
                    experts will work with you to create a comprehensive care
                    plan, ensuring you receive the specialized attention
                    required for your well-being. Your health journey, our
                    commitmen
                  </p>
                 
                </div>
              </div>
              <div class="p-4 lg:w-1/3 hover:transition duration-300 transform">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 overflow-hidden text-center relative hover:transition duration-300 transform  hover:-translate-y-2 hover:shadow-xl rounded-xl">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Health and Wellness Resources
                  </h1>
                  <p class="leading-relaxed">
                    Empower yourself with knowledge through our Health and
                    Wellness Resources. Access a wealth of information on
                    maintaining a healthy lifestyle, preventive care, and
                    overall well-being. Explore articles, videos, and guides
                    curated by our team of healthcare professionals. Stay
                    informed, stay healthy. Your journey to wellness starts
                    here." Feel free to adapt and modify these texts based on
                    the specific details and branding of your healthcare
                    website.
                  </p>
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
              <ReactTyped
                strings={["See Our Customers' Feedback"]}
                typeSpeed={100}
                loop
              />
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

      <Faqs />
    </>
  );
}
