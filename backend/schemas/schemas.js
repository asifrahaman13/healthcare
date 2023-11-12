import { Schema, model } from "mongoose";

// Define a separate schema for key-value pairs
const MeetWithDoctorSchema = new Schema({
    doctor: {
        type: String,
    },
    meet_link: {
        type: String,
    },
    time: {
        type: String,
    },
});

// Define a separate schema for key-value pairs
const MeetWithUserSchema = new Schema({
    user: {
        type: String,
    },
    meet_link: {
        type: String,
    },
    time: {
        type: String,
    },
});


// Define a separate schema for key-value pairs
const PatientHistory = new Schema({
    doctor_email: {
        type: String,
    },
    remark: {
        type: String,
    },
    time: {
        type: String,
    },
});

// Create Mongoose schema for users
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
    appointments: {
        type: [MeetWithDoctorSchema],
        default: [],
    },
    histories:{
        type: [PatientHistory],
        default: [],
    }
});

// Create Mongoose schema for users
const DoctorSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    education: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    experience: {
        type: Number
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
    appointments: {
        type: [MeetWithUserSchema],
        default: [],
    }
});

const User = model("users", userSchema);
const Doctor = model("doctors", DoctorSchema)
const MeetWithDoctor = model('MeetWithDoctor', MeetWithDoctorSchema);
const MeetWithuser = model('MeetWithUser', MeetWithUserSchema);
const patientHistory=model('PatientHistory',PatientHistory)

export { User, Doctor, MeetWithDoctor, MeetWithuser, patientHistory };
