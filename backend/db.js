import mongoose from "mongoose";

const connectDatabase = () => {
  // const pwd = process.env.MONGO_PWD
  // const uri = `mongodb+srv://admin007:${pwd}@cluster0.lwvjx8t.mongodb.net/?retryWrites=true&w=majority`;
  const devUri = "mongodb://localhost:27017/air-wise-guru"
  try {
    mongoose.connect(devUri);
    console.log("Connected to database!");
  } catch (e) {
    console.log(e);
  }
};

export default connectDatabase;
