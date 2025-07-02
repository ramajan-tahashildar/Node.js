import express from "express";
import middleware from "./middleware/index.js";
import connect from "./connection.js";
import dotenv from "dotenv";
import router from "./routes/student.js";
dotenv.config();

const app = express();
const PORT = 8000;

//mongoose connection
connect(process.env.MONGODB_URL);

// Middleware to parse JSON
app.use(express.json());

// Custom regular middleware (executes on every request)
app.use(middleware("./log.txt"));

// Routes
app.use("/student", router);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
