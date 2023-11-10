import express from 'express';
import { Doctor } from '../../schemas/schemas.js';
import SendEmail from '../../email/email.js';
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
// Import the required libraries
import jwt from "jsonwebtoken";

// Load environment variables from .env file
config();
const SECRET_KEY = process.env.SECRET_KEY;

const doctor_signup_router = express.Router();


doctor_signup_router.post("/signup", async (req, res) => {
    const { fullName, education, address,  experience, email, department, password } = req.body;
    console.log(req.body)


    const doctor = await Doctor.findOne({ email })
    if (doctor) {
        res.status(203).send({ message: "Username already exitss" });
        return
    }

    // Generate and send OTP via email
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    console.log(process.env.USER_EMAIL, process.env.USER_PASSWORD);

    try {
        // await transporter.sendMail(mailOptions);
        const emailSent = await SendEmail(email, otp);
        console.log(emailSent)


        // Store doctor data in the database (including the OTP)
        const hashedPassword = await hash(password, 10);
        console.log(hashedPassword)

        try {
            const newUser = new Doctor({
                fullName,
                address,
                education,
                experience,
                email,
                department,
                password: hashedPassword,
                otp,
                isVerified: false,
            });
            console.log(fullName,
                education,
                address,
                experience,
                email,
                department,
                hashedPassword,
                otp)

            await newUser.save();

        }
        catch (err) {
            console.log(err)
        }


        res.json({
            success: true,
            message: "Please check your email for OTP verification.",
        });
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Signup failed. Please try again." });
    }
});

// Verify OTP API
doctor_signup_router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if OTP matches the one stored in the database
        const doctor = await Doctor.findOne({ email });

        if (doctor.isVerified) {
            res.status(400).json({ message: "OTP already verfified" });
        }

        if (doctor && doctor.otp === otp) {
            // Mark the doctor to be verified. 
            doctor.isVerified = true;

            await doctor.save();
            res.json({ success: true, message: "Email verified successfully." });
        } else {
            res
                .status(401)
                .json({ success: false, message: "Invalid OTP. Please try again." });
        }
    } catch (error) {
        console.error("Error in /verify-otp:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Resend OTP API
doctor_signup_router.post("/resend-otp", async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a new OTP
        const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

        // Send the new OTP via email
        const emailSent = await SendEmail(email, otp);


        // Update the OTP in the database
        const doctor = await Doctor.findOne({ email });
        if (doctor) {
            doctor.otp = otp;
            await doctor.save();
            res.json({
                success: true,
                message: "New OTP sent. Please check your email for verification.",
            });
        } else {
            res
                .status(401)
                .json({ success: false, message: "Doctor not found. Resending OTP failed." });
        }
    } catch (error) {
        console.error("Error in /resend-otp:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Login API
doctor_signup_router.post("/login", async (req, res) => {
    try {
        var { email, password } = req.body;

        // Check if the doctor exists and is verified
        const doctor = await Doctor.findOne({ email });

        var { email, fullName, education, experience, role, department } = doctor;


        if (doctor && doctor.isVerified) {
            const passwordMatch = compare(password, doctor.password);
            // If password matches then only generate the access token
            if (passwordMatch) {
                // Generate an access token
                const accessToken = jwt.sign(
                    {
                        email,
                        fullName,
                        education,
                        experience,
                        role,
                        department,
                    },
                    SECRET_KEY,
                    {
                        expiresIn: "1w", // Token expires in 1 hour, adjust this as needed
                    }
                );

                res.json({
                    success: true,
                    message: `Welcome, ${doctor.fullName}!`,
                    accessToken: accessToken, // Include the access token in the response
                });
            } else {
                res
                    .status(401)
                    .json({ success: false, message: "Incorrect email or password." });
            }
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid email or unverified account.",
            });
        }
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

doctor_signup_router.get("/doctor-details", async(req, res) => {
    const accessToken = req.headers.authorization; // Assuming you send the access token in the "Authorization" header


    // If there is no bearer token or if it is not bearer token then return error message.
    if (!accessToken || !accessToken.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Access token is missing or not in the correct format.",
        });
    }
    const token = accessToken.split("Bearer ")[1];


    // Verify the access token
    jwt.verify(token, SECRET_KEY, async(err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token.",
            });
        }

        // If the token is valid, you can access user details from the decoded payload
        const { email, fullName, education, experience, role, department } = decoded;

        const doctor=await Doctor.findOne({email})

        console.log(doctor)

        // You can now return the user details in the response
        res.json({
            success: true,
            userDetails: {
                email, fullName, address:doctor.address, education, experience, role, department, appointments:doctor.appointments
            },
        });
    });
});






export { doctor_signup_router }