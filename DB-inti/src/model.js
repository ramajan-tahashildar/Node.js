import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    firstName: {
        type : String ,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    USN: {
        type : String,
        required : true,
        unique : true
    },
    email: {
        type : String,
    },
    age: {
        type : Number,
        required : true
    },
    standered: {
        type : Number,
        required : true
    },  
},
    {
        timestamps : true
    })

const student = mongoose.model("students", studentSchema);

export default student;

// models/student.js
// import mongoose from 'mongoose';

// const studentSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   USN: { type: String, unique: true },
//   age: Number,
//   standered: String
// });

// export default mongoose.model("student", studentSchema);
