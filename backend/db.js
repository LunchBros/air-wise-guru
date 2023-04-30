import mongoose from "mongoose";

const connectDatabase = () => {
  const uri = process.env.MONGO_URI
  try {
    mongoose.connect(uri);
    console.log("Connected to database!");
  } catch (e) {
    console.log(e);
  }
};

export default connectDatabase;
