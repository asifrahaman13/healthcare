import express from 'express';
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
import { User } from '../../schemas/schemas.js';
import SendEmail from '../../email/email.js';
// Import the required libraries
import jwt from "jsonwebtoken";

// Load environment variables from .env file
config();

const SECRET_KEY = process.env.SECRET_KEY;

const user_signup_router = express.Router();

user_signup_router.get("/hello", async (req, res) => {
    res.send({ "message": "Hello world from users" })
})

user_signup_router.post("/signup", async (req, res) => {
    const { fullName, email, address, profession, password } = req.body;
    console.log(req.body)


    const user = await User.findOne({ email })
    if (user) {
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


        // Store user data in the database (including the OTP)
        const hashedPassword = await hash(password, 10);
        console.log(hashedPassword)

        try {
            console.log()
            const newUser = new User({
                fullName,
                address,
                email,
                profession,
                password: hashedPassword,
                otp,
                isVerified: false,
            });


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
user_signup_router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if OTP matches the one stored in the database
        const user = await User.findOne({ email });

        if (user.isVerified) {
            res.status(400).json({ message: "OTP already verfified" });
        }

        if (user && user.otp === otp) {
            // Mark the user to be verified. 
            user.isVerified = true;

            await user.save();
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
user_signup_router.post("/resend-otp", async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a new OTP
        const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

        // Send the new OTP via email
        const emailSent = await SendEmail(email, otp);


        // Update the OTP in the database
        const user = await User.findOne({ email });
        if (user) {
            user.otp = otp;
            await user.save();
            res.json({
                success: true,
                message: "New OTP sent. Please check your email for verification.",
            });
        } else {
            res
                .status(401)
                .json({ success: false, message: "User not found. Resending OTP failed." });
        }
    } catch (error) {
        console.error("Error in /resend-otp:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Login API
user_signup_router.post("/login", async (req, res) => {

    try {
        var { email, password } = req.body;
        try {
            // Check if the user exists and is verified
            const user = await User.findOne({ email });

            var { email, fullName, address, profession } = user;


            if (user && user.isVerified) {
                const passwordMatch = await compare(password, user.password);
                // If password matches then only generate the access token
                if (passwordMatch) {
                    // Generate an access token
                    const accessToken = jwt.sign(
                        {
                            email,
                            fullName,
                            address,
                            profession
                        },
                        SECRET_KEY,
                        {
                            expiresIn: "1w", // Token expires in 1 hour, adjust this as needed
                        }
                    );

                    res.json({
                        success: true,
                        message: `Welcome, ${user.fullName}!`,
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

        }
        catch (err) {
            res.send({ "message": "sorry no such user exits" })
        }

    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

user_signup_router.get("/user-details", async (req, res) => {
    const accessToken = req.headers.authorization; // Assuming you send the access token in the "Authorization" header
    try {
        // If there is no bearer token or if it is not bearer token then return error message.
        if (!accessToken || !accessToken.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token is missing or not in the correct format.",
            });
        }
        const token = accessToken.split("Bearer ")[1];


        // Verify the access token
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid access token.",
                });
            }

            // If the token is valid, you can access user details from the decoded payload
            const { email, fullName, address, profession } = decoded;
            const user = await User.findOne({ email })

            // Filter appointments with a time in the future
            const currentTimestamp = new Date().getTime();
            const filteredAppointments = user.appointments.filter(appointment => new Date(appointment.time).getTime() > currentTimestamp);

            // You can now return the user details in the response
            res.json({
                success: true,
                userDetails: {
                    email, fullName, address, profession, isSubscribed: user.isSubscribed, appointments: filteredAppointments
                },
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

});

user_signup_router.post("/subscribed", async (req, res) => {
    const accessToken = req.headers.authorization;
    try {
        // If there is no bearer token or if it is not bearer token then return error message.
        if (!accessToken || !accessToken.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token is missing or not in the correct format.",
            });
        }
        const token = accessToken.split("Bearer ")[1];
        // Verify the access token
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid access token.",
                });
            }
            // If the token is valid, you can access user details from the decoded payload
            const { email } = decoded;
            const user = await User.findOne({ email })

            user.isSubscribed = true;
            user.save();

            res.send({ "message": "Subscribed successfully" })
        });

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

export { user_signup_router }