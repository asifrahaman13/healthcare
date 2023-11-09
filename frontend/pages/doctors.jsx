import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const Doctors = () => {
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
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center mt-32 mx-auto max-w-screen-2xl">
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
      </div>
    </section>
  );
};

export default Doctors;