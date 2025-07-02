import mongoose from "mongoose";

async function connect(url) {
  try {
    return await mongoose
      .connect(url)
      .then(() => console.log("MongoDB connected.."))
      .catch((err) => console.log("error found", err));
  } catch (err) {
    return console.log("MongoDB connection failed", err);
  }
}

export default connect;
