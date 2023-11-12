import React, { useEffect, useState } from "react";
import NavLink from "next/link";
import ReactTyped from "react-typed";
import axios from "axios";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const Doctors = () => {
  const [departmentalStats, setDepartmentalStats] = useState({
    totalNumberOfPsychologists: 0,
    totalCardiologists: 0,
    totalOphthalmologists: 0,
    totalNumberOfNeurologists: 0,
    totalNumberOfDermatologists:0
  });

  async function getDepartmentCounts() {
    try {
      const departmentCounts = await axios.get(
        `${BACKEND_DOMAIN}/utility/department-counts`
      );
      setDepartmentalStats(departmentCounts.data);
      console.log(departmentCounts.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDepartmentCounts();
  }, []);

  return (
    <>
      <div class="flex flex-col text-center w-full pt-8 bg-blue-100">
        <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
          ROOF PARTY POLAROID
        </h2>
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          SEE OUR REGISTERED DOCTORS
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          <ReactTyped
            strings={[
              "Select from the cards below. For example if you want constultancy from the Psychologist then click on the PSYCHOLOGY CARD.Remeber you can have constultancy with any doctors any point of time. Make sure to have an appointment with the doctor to have more in depth treatment.",
            ]}
            typeSpeed={10}
            loop
          />
        </p>
      </div>
      <section class="text-gray-600 body-font bg-blue-100">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/3 transform transition-transform hover:translate-y-[-8px]">
              <NavLink href="/specialists/psychologists">
                <div class="h-full bg-yellow-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    PSYCHOLOGY
                  </h1>
                  <p class="leading-relaxed mb-3">
                    want to connect with psychologists? You are on the right
                    track. Click here.
                  </p>
                  <p className="mt-8"> Total Doctors</p>
                  <h1 className="text-2xl font-bold">
                    {departmentalStats.totalNumberOfPsychologists}
                  </h1>
                </div>
              </NavLink>
            </div>

            <div class="p-4 lg:w-1/3 transform transition-transform hover:translate-y-[-8px]">
              <NavLink href="/specialists/neurologists">
                <div class="h-full bg-orange-200 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    NEUROLOGY
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Want to connect to neurologists? Get quick access to your
                    health reports here.
                  </p>
                  <p className="mt-8"> Total Doctors</p>
                  <h1 className="text-2xl font-bold">
                    {departmentalStats.totalNumberOfNeurologists}
                  </h1>
                </div>
              </NavLink>
            </div>
            <div class="p-4 lg:w-1/3 transform transition-transform hover:translate-y-[-8px]">
              <NavLink href="/specialists/ophthalmologists">
                <div class="h-full bg-green-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    OPTHALMOLOGY
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Connect with the best opthalmologits here to all over the
                    globe.
                  </p>
                  <p className="mt-8"> Total Doctors</p>
                  <h1 className="text-2xl font-bold">
                    {departmentalStats.totalOphthalmologists}
                  </h1>
                </div>
              </NavLink>
            </div>
            <div class="p-4 lg:w-1/3 transform transition-transform hover:translate-y-[-8px]">
              <NavLink href="/specialists/cardiologists">
                <div class="h-full bg-red-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    CARDIOLOGY
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Get the health checkup from the best cardiologirst all over
                    the world.
                  </p>
                  <p className="mt-8"> Total Doctors</p>
                  <h1 className="text-2xl font-bold">
                    {departmentalStats.totalCardiologists}
                  </h1>
                </div>
              </NavLink>
            </div>
            <div class="p-4 lg:w-1/3 transform transition-transform hover:translate-y-[-8px]">
              <NavLink href="/specialists/dermatologists">
                <div class="h-full bg-blue-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                  Dermatology
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Get rid of your skin problems with our experts. We have doctors from all around the globe.
                  </p>
                  <p className="mt-8"> Total Doctors</p>
                  <h1 className="text-2xl font-bold">
                    {departmentalStats.totalNumberOfDermatologists}
                  </h1>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
