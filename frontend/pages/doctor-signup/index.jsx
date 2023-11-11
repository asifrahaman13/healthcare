import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

export default function Signup() {
  const router = useRouter();
  const departments = [
    "Neurology",
    "Ophthalmology",
    "Psychology",
    "Cardiology",
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    education: "",
    address: "",
    experience: "",
    email: "",
    password: "",
    department: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/doctors/signup`, formData);

      if (response.status === 203) {
        console.error("A user with the email address already exists");
      } else if (response.status === 200) {
        localStorage.setItem("email", formData.email);
        router.push("/doctor-otp");
      } else {
        console.error("Please fill in the details properly");
      }
    } catch (error) {
      console.error("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="bg-white w-full flex items-center justify-center">
          <div className="p-8 rounded shadow-lg w-full sm:w-96">
            <h1 className="text-2xl text-black font-bold mb-6">Signup</h1>
            <form onSubmit={handleSubmit}>
              {Object.entries(formData).map(([key, value]) => (
                <input
                  key={key}
                  type={key === "password" ? "password" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              ))}
              <select
                className="w-full mb-6 p-2 border border-gray-300 rounded"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select Department
                </option>
                {departments.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
