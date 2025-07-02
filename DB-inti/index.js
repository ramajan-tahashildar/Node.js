import express from "express";
import mongoose from "mongoose";
import student from "./models/model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8000;

//mongoose connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected.."))
  .catch((err) => console.log("error found", err));

const db = student;

// Middleware to parse JSON
app.use(express.json());

// Custom regular middleware (executes on every request)
app.use((err, req, res, next) => {
  console.log("Middleware found some error", err.message);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
  next();
});

// Routes
app.post("/addStudent", async (req, res, next) => {
  try {
    const { firstName, lastName, email, USN, age, standered } = req.body;
    // if (!body.firstName || !body.lastName || !body.USN || !body.age || !body.standered){
    if (!firstName || !lastName || !email || !USN || !age || !standered) {
      return res.status(404).json({
        message: "All filed need to be filled",
      });
    }

    const result = await student.create({
      firstName,
      lastName,
      email,
      USN,
      age,
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
      student: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

app.get("/getStudents", async (req, res) => {
  try {
    const allUser = await student.find({});

    if (!allUser) {
      return res.status(404).json({
        message: "No students found",
      });
    }
    res.status(200).json({
      message: "List of students",
      result: allUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});
app.get("/getStudent/:USN", async (req, res) => {
  try {
    const getUSN = req.params.USN;
    const getStudent = await student.findOne({ USN: getUSN });
    if (!getStudent) {
      return res.status(404).json({
        message: `Student with id ${req.params.USN} not found`,
      });
    }

    res.status(200).json({
      message: `Student with id ${req.params.USN}`,
      result: getStudent,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

app.patch("/updateStudent/:USN", async (req, res) => {
  try {
    const getUSN = req.params.USN;
    const body = req.body;
    const updatedData = await student.findOneAndUpdate(
      { USN: getUSN },
      { $set: body },
      { new: true }
    );

    console.log(updatedData);
    if (!updatedData) {
      return res.status(404).json({
        message: `Student with id ${getUSN} not found`,
      });
    }
    res.status(200).json({
      messgae: "Student updated successfully",
      result: updatedData.toObject(),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

app.delete("/deleteStudent/:USN", async (req, res) => {
  try {
    const getUSN = req.params.USN;
    const deletedData = await student.findOneAndDelete({ USN: getUSN });
    if (!deletedData) {
      return res.status(404).json({
        message: `Student with id ${getUSN} not found`,
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
