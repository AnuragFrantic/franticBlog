import mongoose from "mongoose";

// Blog Schema with SEO Fields
const Policy = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, trim: true },

        content: { type: String },

        metaDescription: { type: String },


    },
    { timestamps: true }
);

export default mongoose.models.Policy ||
    mongoose.model("Policy", Policy);
