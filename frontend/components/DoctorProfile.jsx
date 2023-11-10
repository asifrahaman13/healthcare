import React, { useEffect, useState } from "react";
import axios from "axios";
import NavLink from "next/link"

const DoctorProfile = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    fullName: "",
    experience: "",
    department: "",
    email: "",
    education: "",
    appointments: [],
  });

  useEffect(() => {
    async function getUserProfile() {
      try {
        const doctor = await axios.get(
          "http://localhost:8000/doctors/doctor-details",
          {
            headers: {
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyZWVuQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiU2Vtb24iLCJlZHVjYXRpb24iOiJBaW1zIiwiZXhwZXJpZW5jZSI6MiwiZGVwYXJ0bWVudCI6Im9ycGhvbG9neSIsImlhdCI6MTY5OTU5MTY4NCwiZXhwIjoxNzAwMTk2NDg0fQ.sNoNlg7SUdg4DxW2j46nTwbGgG3xybNaje7xvkQtTVA"}`,
            },
          }
        );
        console.log(doctor.data.userDetails);
        setDoctorDetails(doctor.data.userDetails);
        console.log(doctorDetails);
      } catch (err) {
        console.log(err);
      }
    }
    getUserProfile();
  }, []);

  return (
    <>
      <center>
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
          <div class="flex items-center justify-center mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              class="w-20 h-20 rounded-full"
            />
          </div>

          <h2 class="text-2xl font-semibold text-gray-800 mb-2">John Doe</h2>
          <p class="text-gray-600 text-sm mb-4">Web Developer</p>

          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">My Email</h3>
            <p class="text-gray-600">{doctorDetails.email}</p>
          </div>

          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              My Education
            </h3>
            <p class="text-gray-600">{doctorDetails.education}</p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              My Department
            </h3>
            <p class="text-gray-600">{doctorDetails.department}</p>
            <div class="flex items-center space-x-4"></div>
          </div>
        </div>
      </center>

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {doctorDetails.appointments.map((item, idx) => (
              <div class="p-4 lg:w-1/3" key={idx}>
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    user email
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {item.user}
                  </h1>
                  <p class="leading-relaxed mb-3">
                    Click on the following to have the meet.
                  </p>
                  <NavLink class="text-indigo-500 inline-flex items-center" href={`/room/${item.meet_link}`}>
                    {item.meet_link}
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
                  </NavLink>
                  <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DoctorProfile;
