import express from 'express';
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
import { User, Doctor, MeetWithDoctor, MeetWithuser } from '../../schemas/schemas.js';
import SendEmail from '../../email/email.js';
// Import the required libraries
import jwt from "jsonwebtoken";
import { checkUserRegistration } from './user_middlware.js';

// Load environment variables from .env file
config();
const SECRET_KEY = process.env.SECRET_KEY;

const user_appointment_router = express.Router();

// Create a new appointment for a user
user_appointment_router.post('/appointment', checkUserRegistration, async (req, res) => {
    const accessToken = req.headers.authorization;  // Assuming the email is sent in the request body
    const token = accessToken.split("Bearer ")[1];
    
    let decoded; // Define 'decoded' in the outer scope

    // Verify the access token
    jwt.verify(token, SECRET_KEY, (err, tokenData) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token.",
            });
        }

        // If the token is valid, set 'decoded' to tokenData
        decoded = tokenData;
    });

    try {
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token.",
            });
        }

        const { email } = decoded;
        const { appointments } = req.body;
        const { doctor_email, meet_link } = appointments;

    
        console.log(req.body)

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Create a new appointment using the MeetWithDoctor schema
        const newAppointment = new MeetWithDoctor({
            doctor: doctor_email,
            meet_link,
        });

        // Push the new appointment to the 'appointments' array within the 'user.appointments' object
        user.appointments.push(newAppointment);

        // Save the updated user document
        await user.save();

        try {
            const doctor = await Doctor.findOne({ email: doctor_email })

            if (doctor == null) {
                res.status(400).send({ success: false, message: "The doctor does not exist" });
            }

            // Create a new appointment using the MeetWithDoctor schema
            const newAppointmentWithUser = new MeetWithuser({
                user: email,
                meet_link,
            });

            // Push the new appointment to the 'appointments' array within the 'user.appointments' object
            doctor.appointments.push(newAppointmentWithUser);

            // Save the updated user document
            await doctor.save();
        }
        catch (err) {
            res.send({ "message": "The doctor does not exits" })
        }

        res.json({
            success: true,
            message: "Appointment added successfully.",
        });

    } catch (err) {
        console.error("Error adding appointment:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


user_appointment_router.get("/get-all-doctors", async (req, res) => {
    console.log(req.body);
    try {
        const doctors = await Doctor.find();
        console.log(doctors)

        const filteredDoctors = doctors.map(doctor => ({
            _id: doctor._id,
            fullName: doctor.fullName,
            education: doctor.education,
            address: doctor.address,
            experience: doctor.experience,
            department: doctor.department
        }));

        res.send(filteredDoctors)

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})


user_appointment_router.get("/get-doctor-details/:_id", async (req, res) => {
    console.log(req.params.id);

    const _id=req.params._id;

    try{

        const doctor=await Doctor.findById({_id});

        console.log(doctor)
        res.send({_id: doctor._id,
            fullName: doctor.fullName,
            education: doctor.education,
            address: doctor.address,
            email: doctor.email,
            experience: doctor.experience});

    }
    catch(err){
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

export { user_appointment_router }