import mongoose from "mongoose";

const connectDatabase = () => {
  const uri = `mongodb+srv://admin007:${pwd}@cluster0.lwvjx8t.mongodb.net/?retryWrites=true&w=majority`;
  try {
    mongoose.connect(uri);
    console.log("Connected to database!");
  } catch (e) {
    console.log(e);
  }
};

export default connectDatabase;
