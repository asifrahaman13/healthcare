import React from "react";
import NavLink from "next/link";

const index = () => {
  return (
    <>
      <section class="text-gray-600 body-font ">
        <div class="container px-5 py-24 mx-auto ">
          <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              SELECT WHETHER YOU ARE DOCTOR OR A USER
            </h1>
            <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Select among the cards, whether you are a user or a doctor.
            </p>
          </div>
          <div class="flex flex-wrap -m-4 justify-center">
            <div class="p-4 md:w-1/3 bg-blue-300 mx-2">
              <NavLink href="/doctor-login">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    class="lg:h-48 md:h-36 w-full object-cover object-center"
                    src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
                    alt="blog"
                  />
                  <div class="p-6">
                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      CATEGORY
                    </h2>
                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                      I AM A DOCTOR
                    </h1>
                    <p class="leading-relaxed mb-3">
                      If you are a doctor and want to contribute in our website
                      then please click on this card.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div class="p-4 md:w-1/3 bg-yellow-300 mx-2">
              <NavLink href="/user-login">
                <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    class="lg:h-48 md:h-36 w-full object-cover object-center"
                    src="https://cdn3.vectorstock.com/i/1000x1000/78/17/man-person-thinking-icon-vector-10457817.jpg"
                    alt="blog"
                  />
                  <div class="p-6">
                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      CATEGORY
                    </h2>
                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                      I AM A USER
                    </h1>
                    <p class="leading-relaxed mb-3">
                      If you are a user looking for consultations form
                      specialist doctor then please click on this card.
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
