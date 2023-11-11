import React from "react";

const Footer = () => {
  return (
    <>
      <footer class="text-gray-100 body-font bg-slate-700">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
            <div class="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                HEALTHCARE SERVICES
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-100 hover:text-gray-800">Primary Care</a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Specialized Treatments
                  </a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Wellness Programs
                  </a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Emergency Care
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                OUR TEAM
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Medical Professionals
                  </a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">Support Staff</a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Administrative Team
                  </a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Career Opportunities
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                OUR TEAM
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Medical Professionals
                  </a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">Support Staff</a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Administrative Team
                  </a>
                </li>
                <li>
                  <a class="text-gray-100 hover:text-gray-800">
                    Career Opportunities
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="container px-5 py-8 flex flex-wrap mx-auto items-center">
            <div class="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
              <div class="relative sm:w-64 w-40 sm:mr-4 mr-2">
                <label
                  for="footer-field"
                  class="leading-7 text-sm text-gray-100"
                >
                  Subscribe for Health Tips
                </label>
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Subscribe
              </button>
              <p class="text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">
                Stay informed about your health with our newsletter.
                <br class="lg:block hidden" />
                Your well-being is our priority.
              </p>
            </div>

            <span class="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                ></svg>
              </a>
            </span>
          </div>
        </div>
        <div class="bg-gray-100">
          <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class="text-gray-500 text-sm text-center sm:text-left">
              © 2023 HealthHub —
              <a
                href="https://twitter.com/HealthHub"
                class="text-gray-100 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @HealthHub
              </a>
            </p>
            <span class="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
              Transforming lives through innovation in healthcare. Your
              wellness, our priority.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
