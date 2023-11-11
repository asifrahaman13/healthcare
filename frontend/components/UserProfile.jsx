import React, { useEffect, useState } from "react";
import axios from "axios";
import NavLink from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const backend_domain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const UserProfile = ({ access_token }) => {
  async function handleSubmit() {
    try {
      const subscribe = await axios.post(
        `${BACKEND_DOMAIN}/users/subscribed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      handleSubmit();
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "",
    address: "",
    profession: "",
    isSubscribed: false,
    appointments: [],
  });

  function formatTime(inputTime) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedTime = new Date(inputTime).toLocaleDateString(
      "en-US",
      options
    );
    return formattedTime;
  }

  useEffect(() => {
    async function getUserProfile() {
      try {
        const user = await axios.get(`${backend_domain}/users/user-details`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setUserDetails(user.data.userDetails);
      } catch (err) {
        console.log(err);
      }
    }
    getUserProfile();
  }, []);

  return (
    <>
      <section class="text-gray-600 body-font shadow-lg bg-gradient-to-r from-orange-200 to-orange-400 bg-opacity-50">
        <div class="container px-5 py-24 mx-auto">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
              My details
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              These are the details filled up by y ou during signup. We respect
              your privacy and these will be kept as secret. Feel free to make
              appointments from docts and discuss about their issues.
            </p>
          </div>
          <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">Name</span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">
                  {userDetails.fullName}
                </span>
              </div>
            </div>

            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">Email Address</span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">{userDetails.email}</span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">My Address</span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">
                  {userDetails.address}
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">Profession</span>
              </div>
            </div>

            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">
                  {userDetails.profession}
                </span>
              </div>
            </div>

            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">Subscripion status</span>
              </div>
            </div>

            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span class="title-font font-medium">
                  {userDetails.isSubscribed === true ? (
                    <>You are subscribed</>
                  ) : (
                    <>Please select pro plan</>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!userDetails.isSubscribed && (
        <section class="text-gray-600 body-font overflow-hidden  shadow-lg bg-gradient-to-r from-green-200 to-blue-400 bg-opacity-50">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
              <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                Pricing
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                We have two plans. One is the basic plan where you can have
                unlimited access to the chatbots. To schedule appointments with
                the doctors you need to have a pro plan.
              </p>
            </div>
            <div class="flex flex-wrap -m-4 justify-center">
              <div class="p-4 xl:w-1/4 md:w-1/2 w-full transform transition-transform hover:translate-y-[-8px] bg-red-200 m-2">
                <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                  <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                    START
                  </h2>
                  <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                    Free
                  </h1>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Vexillologist pitchfork
                  </p>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Tumeric plaid portland
                  </p>
                  <p class="flex items-center text-gray-600 mb-6">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Mixtape chillwave tumeric
                  </p>
                  <button class="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                    By default [No need to subscribe]
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-auto"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <p class="text-xs text-gray-500 mt-3">
                    Literally you probably haven't heard of them jean shorts.
                  </p>
                </div>
              </div>

              <div class="p-4 xl:w-1/4 md:w-1/2 w-full transform transition-transform hover:translate-y-[-8px] bg-green-200 m-2">
                <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden ">
                  <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                    POPULAR
                  </span>
                  <h2 class="text-sm tracking-widest title-font mb-1 font-medium">
                    PRO
                  </h2>
                  <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                    <span>₹ 200</span>
                    <span class="text-lg ml-1 font-normal text-gray-500">
                      /mo
                    </span>
                  </h1>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Vexillologist pitchfork
                  </p>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Tumeric plaid portland
                  </p>
                  <p class="flex items-center text-gray-600 mb-2">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Hexagon neutra unicorn
                  </p>
                  <p class="flex items-center text-gray-600 mb-6">
                    <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        class="w-3 h-3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>
                    Mixtape chillwave tumeric
                  </p>
                  <form
                    action="/api/checkout_sessions"
                    method="POST"
                    className="max-w-sm mx-auto"
                  >
                    <button class="flex items-center mt-auto text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded">
                      Subscribe now
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4 ml-auto"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </form>
                  <p class="text-xs text-gray-500 mt-3">
                    Literally you probably haven't heard of them jean shorts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div class="text-center mt-32">
        <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4 mt-4">
          My appointments
        </h1>
        <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          Click on the cards which will take you to the video calls.
        </p>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {userDetails.appointments.map((item, idx) => (
              <div class="p-4 lg:w-1/3" key={idx}>
                <NavLink
                  class="text-indigo-500 inline-flex items-center"
                  href={`/room/${item.meet_link}`}
                >
                  <div class="bg-yellow-300 h-full bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative transition duration-300 ease-in-out transform hover:scale-105">
                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-800 mb-1">
                      user email
                    </h2>
                    <h1 class="title-font sm:text-sm text-xl font-medium text-gray-900 ">
                      {item.doctor}
                    </h1>
                    <h2 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {formatTime(item.time)}
                    </h2>

                    <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
