import express from 'express';
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
import { User, Doctor } from '../../schemas/schemas.js';
import SendEmail from '../../email/email.js';
// Import the required libraries
import jwt from "jsonwebtoken";

// Load environment variables from .env file
config();
const SECRET_KEY = process.env.SECRET_KEY;

const utility_router = express.Router();

utility_router.get("/stats", async (req, res) => {
    try {
        const totalNumerOfDoctors = await Doctor.find().count();
        const totalNumerOfusers = await User.find().count();

        const totalAppointments = await Doctor.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: { $size: "$appointments" } }
                }
            }
        ]);
        res.send({ "total_doctors": totalNumerOfDoctors, "total_users": totalNumerOfusers, "total_appointments": totalAppointments[0].total });
    }
    catch (err) {
        res.status(404).send({ "error": err.message });
    }
})

utility_router.get("/get-cardiologists", async (req, res) => {
    try {
        const cardiologists = await Doctor.find({ department: "Cardiology" }).select('fullName education experience department address');

        res.send(cardiologists);
    } catch (err) {
        res.status(404).send({ "error": err.message });
    }
});

utility_router.get("/get-neurologists", async (req, res) => {
    try {
        const neurologists = await Doctor.find({ department: "Neurology" }).select('fullName education experience department address');
        res.send(neurologists);
    } catch (err) {
        res.status(404).send({ "error": err.message });
    }
});

utility_router.get("/get-psychologists", async (req, res) => {
    try {
        const psychologists = await Doctor.find({ department: "Psychology" }).select('fullName education experience department address');
        res.send(psychologists);
    } catch (err) {
        res.status(404).send({ "error": err.message });
    }
});

utility_router.get("/get-ophthalmologists", async (req, res) => {
    try {
        const ophthalmologists = await Doctor.find({ department: "Ophthalmology" }).select('fullName education experience department address');
        res.send(ophthalmologists);
    } catch (err) {
        res.status(404).send({ "error": err.message });
    }
});

utility_router.get("/get-dermatologists", async (req, res) => {
    try {
        const dermatologists = await Doctor.find({ department: "Dermatology" }).select('fullName education experience department address');
        res.send(dermatologists);
    } catch (err) {
        res.status(404).send({ "error": err.message });
    }
});

utility_router.post("/contact-us", async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // await transporter.sendMail(mailOptions);
        const emailSent = await SendEmail("asifrahaman137@gmail.com", message, `Concern by ${email}`, `Someone raise the following concerns.\nHi I am ${name},`);
        if (emailSent == true) {
            res.send({ "message": "Message sent successfully" })
        }
    }
    catch (err) {
        res.status(404).send({ "error": err.message });
    }
})

utility_router.get("/department-counts", async (req, res) => {
    try {
        const totalNumberOfPsychologists = await Doctor.find({ department: "Psychology" }).count();
        const totalCardiologists = await Doctor.find({ department: "Cardiology" }).count();
        const totalOphthalmologists = await Doctor.find({ department: "Ophthalmology" }).count();
        const totalNumberOfNeurologists = await Doctor.find({ department: "Neurology" }).count();
        const totalNumberOfDermatologists= await Doctor.find({ department: "Dermatology"}).count();
        res.send({ totalNumberOfPsychologists, totalCardiologists, totalOphthalmologists, totalNumberOfNeurologists ,totalNumberOfDermatologists})
    }
    catch (err) {
        res.status(404).send({ "error": err.message });
    }
})

export { utility_router }