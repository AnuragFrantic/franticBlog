import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },

        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },

        description: { type: String, default: "" },

        icon: { type: String, default: "" }, // image URL

        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.Category ||
    mongoose.model("Category", CategorySchema);
