import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await
            mongoose.connect(
                process.env.MONGO_URI
            ).then(() => console.log("db connected"))
                .catch((error) => console.log(`error occured from db and error is ${error}`));
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error", error: error.message });
    };
};