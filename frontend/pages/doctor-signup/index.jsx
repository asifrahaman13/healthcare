import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    // if (passwordConfirmation !== password) {
    //   console.error("Passwords do not match");
    //   return;
    // }

    // Send a POST request to your Express.js API to handle signup
    try {
      const response = await axios.post("http://localhost:8000/doctors/signup", {
        fullName,
        education,
        address,
        experience,
        email,
        password,
        department,
      });

      if (response.status === 203) {
        console.error("A user with the email address already exists");
      } else if (response.status === 200) {
        // Successfully signed up, redirect to OTP page or display a success message
        localStorage.setItem("email", email);
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
              <input
                type="text"
                placeholder="Full Name"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Education"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setEducation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Experience"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setExperience(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Department"
                className="w-full mb-6 p-2 border border-gray-300 rounded"
                onChange={(e) => setDepartment(e.target.value)}
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
