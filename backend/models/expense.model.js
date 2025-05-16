import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authSchema",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("expenseSchema", expenseSchema);
