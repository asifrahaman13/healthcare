import React, { useState } from "react";
import axios from "axios";
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const Remarks = () => {
  const [remarks, setRemarks] = useState({
    patient_email: "",
    doctor_email: "",
    remark: "",
    time: "",
  });

  async function sendRemarks(e) {
    e.preventDefault();
    try {
      const currentDateTime = new Date();
      const formattedDateTime = currentDateTime
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      console.log(formattedDateTime);
      console.log(remarks);
      const user_remarks = await axios.post(
        `${BACKEND_DOMAIN}/doctors/patient-details`,
        {
          patient_email: remarks.patient_email,
          doctor_email: remarks.doctor_email,
          remark: remarks.remark,
          time: formattedDateTime,
        }
      );
      console.log(user_remarks);
    } catch (e) {
      console.log("Error sending Remarks");
    }
  }

  function handleChange(e) {
    setRemarks((remarks) => ({
      ...remarks,
      [e.target.name]: e.target.value,
    }));
    console.log(remarks);
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg w-full sm:w-1/3">
          <h1 className="text-2xl font-bold mb-6">Fill the Remarks </h1>
          <form onSubmit={sendRemarks}>
            <input
              type="text"
              placeholder="Patient Email"
              name="patient_email"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Doctor Email"
              name="doctor_email"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => handleChange(e)}
            />
            <textarea
              type="text"
              placeholder="Remarks"
              name="remark"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => handleChange(e)}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={(e) => {
                sendRemarks(e);
              }}
            >
              SEND REMARKS
            </button>
          </form>
          <p className="mt-4 text-green-500"></p>
        </div>
      </div>
    </>
  );
};

export default Remarks;
