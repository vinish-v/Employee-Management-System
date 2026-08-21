import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    }
    catch (error) {
        console.error("Mongo DB connection failed", error.message);
        process.exit(1);
    }
}
export default connectDb;