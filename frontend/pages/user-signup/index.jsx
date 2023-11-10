import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

export default function Signup() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    profession: "",
    password: "",
  });

  function handleChange(e) {
    setUserDetails((userDetails) => ({
      ...userDetails,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your Express.js API to handle signup
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/users/signup`, {
        fullName: userDetails.fullName,
        email: userDetails.email,
        address: userDetails.address,
        profession: userDetails.profession,
        password: userDetails.password,
      });

      if (response.status === 203) {
        console.error("A user with the email address already exists");
      }

      if (response.status === 200) {
        localStorage.setItem("email", userDetails.email);
        router.push("/user-otp");
      } else {
        console.error("Please fill in the details properly");
        // Handle signup failure
      }
    } catch (error) {
      console.error("Signup failed. Please try again.", error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        <div className="bg-white w-full flex items-center justify-center">
          <div className="p-8 rounded shadow-lg w-full sm:w-96">
            <h1 className="text-2xl text-black font-bold mb-6">Signup</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => handleChange(e)}
              />

              <input
                type="text"
                placeholder="Email Address"
                name="email"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full mb-6 p-2 border border-gray-300 rounded"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="profession"
                placeholder="Profession"
                className="w-full mb-6 p-2 border border-gray-300 rounded"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full mb-6 p-2 border border-gray-300 rounded"
                onChange={(e) => handleChange(e)}
              />
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
