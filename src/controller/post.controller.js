import Post from "@/models/Post";

/* ---------------- SLUG HELPERS ---------------- */

const makeSlug = (title = "") =>
    title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

/* ---------------- KEYWORDS PARSER ---------------- */

const parseKeywords = (keywords) => {
    if (!keywords) return [];

    if (Array.isArray(keywords)) return keywords;

    if (typeof keywords === "string") {
        try {
            const parsed = JSON.parse(keywords);
            if (Array.isArray(parsed)) return parsed;
        } catch (err) {
            return keywords
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean);
        }
    }

    return [];
};

/* ---------------- UNIQUE SLUG ---------------- */

const generateUniqueSlug = async (title, excludeId = null) => {
    const baseSlug = makeSlug(title);
    let slug = baseSlug;
    let count = 1;

    while (true) {
        const query = { slug };
        if (excludeId) query._id = { $ne: excludeId };

        const exists = await Post.findOne(query).select("_id");

        if (!exists) break;

        slug = `${baseSlug}-${count++}`;
    }

    return slug;
};

/* ===================================================== */
/* ===================== CREATE ======================== */
/* ===================================================== */

export async function createPost(data) {
    if (!data?.title?.trim()) throw new Error("Title is required");
    if (!data?.content?.trim()) throw new Error("Content is required");

    data.slug = await generateUniqueSlug(data.title);
    data.keywords = parseKeywords(data.keywords);

    return await Post.create(data);
}

/* ===================================================== */
/* ===================== GET LIST ====================== */
/* ===================================================== */

// export async function getPosts(filters = {}) {
//     const { keyword, page = 1, perPage = 10 } = filters;

//     const query = {};

//     if (keyword) {
//         query.$or = [
//             { title: { $regex: keyword, $options: "i" } },
//             { metaDescription: { $regex: keyword, $options: "i" } },
//             { content: { $regex: keyword, $options: "i" } },
//         ];
//     }

//     const skip = (Number(page) - 1) * Number(perPage);

//     const totalDocs = await Post.countDocuments(query);

//     const posts = await Post.find(query)
//         .populate("category")
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(Number(perPage));

//     return {
//         posts,
//         pagination: {
//             totalDocs,
//             totalPages: Math.ceil(totalDocs / perPage),
//             page: Number(page),
//             perPage: Number(perPage),
//         },
//     };
// }

export async function getPosts(filters = {}) {

    const { id, keyword, page = 1, perPage = 10 } = filters;

    const query = {};

    // ✅ FILTER BY ID (for edit page)
    if (id) {
        query._id = id;
    }

    // ✅ SEARCH
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { metaDescription: { $regex: keyword, $options: "i" } },
            { content: { $regex: keyword, $options: "i" } },
        ];
    }

    const skip = (Number(page) - 1) * Number(perPage);

    const totalDocs = await Post.countDocuments(query);

    const posts = await Post.find(query)
        .populate("category")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(perPage));

    return {
        posts,
        pagination: {
            totalDocs,
            totalPages: Math.ceil(totalDocs / perPage),
            page: Number(page),
            perPage: Number(perPage),
        },
    };
}


/* ===================================================== */
/* ===================== GET BY ID ===================== */
/* ===================================================== */

export async function getPostById(id) {
    return await Post.findById(id).populate("category");
}

/* ===================================================== */
/* ===================== GET BY SLUG =================== */
/* ===================================================== */

export async function getPostBySlug(slug) {
    return await Post.findOne({ slug }).populate("category");
}

/* ===================================================== */
/* ===================== LATEST POSTS ================== */
/* ===================================================== */

export async function latestPosts(exclude = {}) {
    const filter = {};

    if (exclude.id) filter._id = { $ne: exclude.id };
    if (exclude.slug) filter.slug = { $ne: exclude.slug };

    return await Post.find(filter)
        .populate("category")
        .sort({ createdAt: -1 })
        .limit(6);
}

/* ===================================================== */
/* ===================== UPDATE ======================== */
/* ===================================================== */

export async function updatePost(id, data) {
    const oldPost = await Post.findById(id);
    if (!oldPost) throw new Error("Post not found");

    if ("keywords" in data) {
        data.keywords = parseKeywords(data.keywords);
    }

    if (data?.title?.trim()) {
        data.slug = await generateUniqueSlug(data.title, id);
    }

    return await Post.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
}

/* ===================================================== */
/* ===================== DELETE ======================== */
/* ===================================================== */

export async function deletePost(id) {
    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");

    await Post.findByIdAndDelete(id);
    return true;
}
