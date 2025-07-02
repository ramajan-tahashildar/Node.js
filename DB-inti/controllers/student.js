import student from "../models/model.js";

// add student to Database
async function handlerCreatStudent(req, res) {
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
}

//get allstudent
async function handlerGetStudent(req, res) {
  try {
    const allStudent = await student.find({});

    if (!allStudent) {
      return res.status(404).json({
        message: "No students found",
      });
    }
    res.status(200).json({
      message: "List of students",
      result: allStudent,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

//get student by USN
async function handlerGetStudentByUSN(req, res) {
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
}

//update the students details
async function handlerUpdateStudent(req, res) {
  try {
    const getUSN = req.params.USN;
    const body = req.body;
    const updatedData = await student.findOneAndUpdate(
      { USN: getUSN },
      { $set: body },
      { new: true }
    );
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
}

//delete student from database
async function handlerDeleteStudent(req, res) {
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
}

export {
  handlerCreatStudent,
  handlerGetStudent,
  handlerGetStudentByUSN,
  handlerUpdateStudent,
  handlerDeleteStudent,
};
