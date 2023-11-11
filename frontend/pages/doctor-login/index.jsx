import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/doctors/login`, {
        email,
        password,
      });
      if (response.data.success) {
        setMessage(response.data.message);
        localStorage.setItem("doctor_access_token", response.data.accessToken);

        router.push("/profile");
      } else {
        console.error("Sorry wrong credentials");
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Sorry wrong credentials");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg w-full sm:w-96">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-green-500">{message}</p>
        </div>
      </div>
    </>
  );
}
