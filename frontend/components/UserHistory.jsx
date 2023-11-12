import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const UserHistory = ({ id }) => {
  const [userHistoryData, setUserHistoryData] = useState([]);
  const router = useRouter();

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

  async function getUserHistory() {
    const { id } = router.query;
    console.log("The id is ", id);
    try {
      const user_history = await axios.post(
        `${BACKEND_DOMAIN}/doctors/patients-history`,
        {
          meet_link: id,
        }
      );
      console.log(user_history.data);
      setUserHistoryData(user_history.data);
    } catch (e) {}
  }

  useEffect(() => {
    getUserHistory();
  }, [router.query]);

  return (
    <>
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mt-4 text-gray-900">Patients previous history</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Followings are the patients hisoty over our website. You will see the previous remarks of the doctors here, doctor email as well as the timestamp when the doctor made the remark.</p>
    </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {userHistoryData.map((item, idx) => (
              <div class="p-4 lg:w-1/3">
                <div class="h-full bg-yellow-300 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {item.doctor_email}
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Remarks
                  </h1>
                  <p class="leading-relaxed mb-3">{item.remark}</p>

                  <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                 
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
                      {formatTime(item.time)}
                 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserHistory;
