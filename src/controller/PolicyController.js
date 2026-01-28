import Policy from "@/models/Policy";
import { connectDB } from "@/lib/db";


const makeSlug = (title = "") =>
    title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");



const generateUniqueSlug = async (title, excludeId = null) => {
    const baseSlug = makeSlug(title);
    let slug = baseSlug;
    let count = 1;

    while (true) {
        const query = { slug };
        if (excludeId) query._id = { $ne: excludeId };

        const exists = await Policy.findOne(query).select("_id");

        if (!exists) break;

        slug = `${baseSlug}-${count++}`;
    }

    return slug;
};

/* ============================
   CREATE POLICY
============================ */
export const createPolicy = async (data) => {
    try {
        await connectDB();

        const slug = await generateUniqueSlug(data.title);

        const policy = await Policy.create({
            title: data.title,
            slug,
            content: data.content,
            metaDescription: data.metaDescription,
        });

        return policy;
    } catch (error) {
        throw new Error(error.message);
    }
};


/* ============================
   GET ALL POLICIES
============================ */
export const getAllPolicies = async () => {
    try {
        await connectDB();
        return await Policy.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error.message);
    }
};

/* ============================
   GET POLICY BY SLUG
============================ */
export const getPolicyBySlug = async (slug) => {
    try {
        await connectDB();
        return await Policy.findOne({ slug });
    } catch (error) {
        throw new Error(error.message);
    }
};

/* ============================
   GET POLICY BY ID
============================ */
export const getPolicyById = async (id) => {
    try {
        await connectDB();
        return await Policy.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/* ============================
   UPDATE POLICY
============================ */
export const updatePolicy = async (id, data) => {
    try {
        await connectDB();

        if (data.title) {
            data.slug = await generateUniqueSlug(data.title, id);
        }

        return await Policy.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    } catch (error) {
        throw new Error(error.message);
    }
};


/* ============================
   DELETE POLICY
============================ */
export const deletePolicy = async (id) => {
    try {
        await connectDB();
        return await Policy.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
};
