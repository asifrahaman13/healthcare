import express from "express";
import connectToMongo from "./connection/connection.js";
import cors from "cors";
const app = express();
import { config } from "dotenv";
import { doctor_signup_router } from "./routers/doctors/doctors_signup.js";
import { user_signup_router } from "./routers/users/user_signup.js";
import { user_appointment_router } from "./routers/users/user_interaction.js";
import {utility_router} from "./routers/utility/utility.js";

// Call the connectToMongo function to establish the connection
(async () => {
    try {
        await connectToMongo();
        console.log("Connected to MongoDB");
        // You can start your application logic here
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

// Load environment variables from .env file
config();


const port = 8000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/doctors/", doctor_signup_router)
app.use("/users/", user_signup_router)
app.use("/users/", user_appointment_router)
app.use("/utility/", utility_router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
