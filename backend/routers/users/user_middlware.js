import { User } from "../../schemas/schemas.js";
// Import the required libraries
import jwt from "jsonwebtoken";
import { config } from "dotenv";
// Load environment variables from .env file
config();

const SECRET_KEY = process.env.SECRET_KEY;

const checkUserRegistration = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;  // Assuming the email is sent in the request body
        const token = accessToken.split("Bearer ")[1];
        var email_address;
        // Check if the user exists in the database
        try {
            // Verify the access token
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                // If the token is valid, you can access user details from the decoded payload
                const { email } = decoded;
                console.log(email);
                email_address = email
            });
        }
        catch (err) {
        }

        if (email_address) {
            // User is registered, you can add the user object to the request for later use
            next(); // Continue to the next middleware or route handler
        } else {
            // User is not registered
            res.status(401).json({
                success: false,
                message: "User is not registered.",
            });
        }
    } catch (error) {
        console.error("Error in user registration check middleware:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export { checkUserRegistration }