import express from "express";
import mongoose from "mongoose";
import student from "./model.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = 8000;

//mongoose connection
mongoose
.connect(process.env.MONGODB_URL)
.then(()=> console.log("MongoDB connected.."))
.catch((err)=>console.log("error found", err))

const db = student;

// Middleware to parse JSON
app.use(express.json());

// Custom regular middleware (executes on every request)
app.use((err, req, res, next) => {
    console.log("Middleware found some error", err.message)
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
    })
    next();
});

// Routes
app.post("/addStudent",async(req,res,next)=>{
    try{
    const { firstName, lastName, email, USN, age, standered } = req.body;
    // if (!body.firstName || !body.lastName || !body.USN || !body.age || !body.standered){
    if(!firstName || !lastName || !email || !USN || !age || !standered){
        return res.status(404).json({
            message : "All filed need to be filled"
        })
    }

    const result = await student.create(
        {
            firstName, 
            lastName,
            email, 
            USN ,
            age ,      
            standered,
        });
    // const student = new db({
    //     firstName : body.firstName,
    //     lastName : body.lastName,
    //     email : body.email,
    //     USN : body.USN,
    //     age: body.age,
    //     standered : body.standered
    // })
    // student.save()
return res.status(200).json({
    messgae: "Student added successfully",
    student: result
});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
     
    }

})


app.get("/getStudents", (req, res) => {
    console.log("✅ You're in the GET API");
    res.status(200).json({ message: "List of students" });
});
app.get("/getStudent/:id", (req, res) => {
    console.log("✅ You're in the GET API with id");
    res.status(200).json({ message: `Student with id ${req.params.id}`})
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
