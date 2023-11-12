import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Success from "../../components/Success.jsx"

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const Page = ({ doctorDetails }) => {
  const [message, setMessage] = useState({
    msg: "",
    statuscode: 0,
  });
  const [value, onChange] = useState(new Date());
  const [getDoctorDetails, setDoctorDetails] = useState(doctorDetails);
  const router = useRouter();

  async function makeAppointment(e) {
    e.preventDefault();
    const formattedDate = `${value.getFullYear()}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${value.getDate().toString().padStart(2, '0')}T${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}:00`;
    console.log(formattedDate);
    const uniqueId = uuidv4();
    try {
      const user_access_token = localStorage.getItem('user_access_token')
      if (!user_access_token) {
        return
      }
      const appointment = await axios.post(`${BACKEND_DOMAIN}/users/appointment`, {
        email: localStorage.getItem('user_email'),
        appointments: {
          doctor_email: getDoctorDetails.email,
          meet_link: uniqueId,
          time: formattedDate
        }
      },
        {
          headers: {
            Authorization: `Bearer ${user_access_token}`
          }
        })
      console.log(appointment)
      if (appointment.status === 200) {
        console.log("yes")
        setMessage({ msg: "Your appointment is successful", statuscode: 200 });
      }
    }
    catch (err) {
      setMessage({ msg: "There was a problem asociated.", statuscode: 404 });

    }
    handleShowToast()
  }

  useEffect(() => {
    const { slug } = router.query;
    if (slug) {
      async function getDoctorDetails(doctor_id) {
        try {
          const response = await axios.get(`${BACKEND_DOMAIN}/users/get-doctor-details/${doctor_id}`);
          setDoctorDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      getDoctorDetails(slug);
    }
  }, [router.query]);

  const [showToast, setShowToast] = useState(false);

  // Function to show the toast
  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide the toast after 3 seconds (adjust as needed)
  };

  return (
    <>
      <div className="relative">
        {showToast && <Success message={message} />}
      </div>
      <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img src="https://img.freepik.com/premium-vector/young-smiling-doctor-with-stethoscope3d-vector-people-character-illustrationcartoon-minimal-style_365941-707.jpg" class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
              </div>
            </div>
            <div class="w-full text-center mt-20">
              <div class="flex justify-center lg:pt-4 pt-8 pb-0">
                <div class="p-3 text-center">
                  <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{getDoctorDetails.experience}</span>
                  <span class="text-sm text-slate-400">Experience</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{getDoctorDetails.fullName}</h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold">
              <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{getDoctorDetails.email}
            </div>
          </div>
          <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full px-4">
                Address
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {getDoctorDetails.address}
                </p>

              </div>
              <div class="w-full px-4">
                Education
                <p class="font-light leading-relaxed text-slate-600 mb-4">
                  {getDoctorDetails.education}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col items-center justify-center mb-16">
        <span className="title-font font-medium mb-8" onClick={makeAppointment}>
          Please select a date and time
        </span>
        <Calendar onChange={onChange} value={value} />
        <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center mt-4 hover:bg-gray-200 focus:outline-none">
          <span className="ml-4 flex items-start flex-col leading-none">
            <span className="title-font font-medium" onClick={makeAppointment}>
              Make an appointment now
            </span>
          </span>
        </button>
      </div>

    </>
  );
};

export async function getServerSideProps({ query }) {
  const { slug } = query;

  if (slug) {
    try {
      const response = await axios.get(`${BACKEND_DOMAIN}/users/get-doctor-details/${slug}`);
      const doctorDetails = response.data;

      return {
        props: {
          doctorDetails,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          doctorDetails: {},
        },
      };
    }
  }

  return {
    props: {
      doctorDetails: {},
    },
  };
}

export default Page;
