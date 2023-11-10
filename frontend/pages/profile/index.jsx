import React, { useEffect, useState } from "react";
import UserProfile from "../../components/UserProfile";
import DoctorProfile from "../../components/DoctorProfile";

const index = () => {
  const [person, setPerson] = useState("");
  const [access_token, setAccessToken]=useState("")

  useEffect(() => {
    const user_access_token = localStorage.getItem("user_access_token");
    const doctor_access_token = localStorage.getItem("doctor_access_token");
    if (user_access_token) {
      setPerson("user");
      setAccessToken(user_access_token);
    }
    if (doctor_access_token) {
      setPerson("doctor");
      setAccessToken(doctor_access_token)
    }
  });

  return (
    <>
      {person === "user" && <UserProfile access_token={access_token}/>}
      {person === "doctor" && <DoctorProfile  access_token={access_token}/>}
    </>
  );
};

export default index;
