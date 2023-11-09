import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const Page = ({ doctorDetails }) => {
  const [getDoctorDetails, setDoctorDetails] = useState(doctorDetails);
  const router = useRouter();

  async function makeAppointment(e) {
    e.preventDefault();

    const uniqueId = uuidv4();

    try {
      const appointment = await axios.post(`${BACKEND_DOMAIN}/users/appointment`, {
        email: "johndoe@example.com",
        appointments: {
          doctor_email: getDoctorDetails.email,
          meet_link: uniqueId
        }
      },
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwiYWRkcmVzcyI6InVzZXJfcm9sZSIsInByb2Zlc3Npb24iOiJTb21lIERlcGFydG1lbnQiLCJpYXQiOjE2OTk1NTMyODMsImV4cCI6MTcwMDE1ODA4M30.f3hVb718C24ZFwl1H57RUOvCkImJ7SdQ-mgGS8IRlJk"}`
          }
        })
      console.log(appointment)

    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const { slug } = router.query;
    if (slug) {
      async function getDoctorDetails(doctor_id) {
        try {
          const response = await axios.get(`${BACKEND_DOMAIN}/users/get-doctor-details/${doctor_id}`);
          console.log(response.data);
          setDoctorDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      getDoctorDetails(slug);
    }
  }, [router.query]);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className=" from-blue-100 to-blue-200 rounded-lg  p-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-semibold text-blue-600">Doctor Details</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Full Name:</span>
                <span className="ml-2 text-xl font-medium text-blue-800">{getDoctorDetails.fullName}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Education:</span>
                <span className="ml-2 text-xl font-medium text-blue-800">{getDoctorDetails.education}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Address:</span>
                <span className="ml-2 text-xl font-medium text-blue-800">{getDoctorDetails.address}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="ml-2 text-xl font-medium text-blue-800">{getDoctorDetails.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700">Experience:</span>
                <span className="ml-2 text-xl font-medium text-blue-800">{getDoctorDetails.experience}</span>
              </div>
              <button class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none">

                <span class="ml-4 flex items-start flex-col leading-none">

                  <span class="title-font font-medium" onClick={(e) => { makeAppointment(e) }}>Make an appointment now</span>
                </span>
              </button>
            </div>
          </div>
        </div>
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
