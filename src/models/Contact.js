import mongoose from "mongoose";

const Contact = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },

        phone: { type: String, trim: true }, // duplicates allowed

        email: { type: String, trim: true },

        message: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Contact ||
    mongoose.model("Contact", Contact);
