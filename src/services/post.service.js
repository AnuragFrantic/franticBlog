import api from "@/lib/api";

export const PostService = {
    // ✅ GET ALL (with pagination/search)
    getAll: async (params = {}) => {
        // params: { page, perPage, keyword }
        const res = await api.get("/post", { params });
        return res.data;
    },

    // ✅ GET BY ID
    getById: async (id) => {
        const res = await api.get("/post", {
            params: { id },
        });
        return res.data;
    },

    // ✅ GET BY SLUG (backend expects url query)
    getBySlug: async (slug) => {
        const res = await api.get("/post", {
            params: { url: slug },
        });
        return res.data;
    },

    // ✅ LATEST POSTS
    latest: async ({ id, url } = {}) => {
        // backend supports excluding current one
        const res = await api.get("/post/latest", {
            params: { id, url },
        });
        return res.data;
    },

    // ✅ CREATE (multer banner + thumbnail OR coverImage depends on backend)
    create: async (formData) => {
        const res = await api.post("/post", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    // ✅ UPDATE
    update: async (id, formData) => {
        const res = await api.put(`/post/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    // ✅ DELETE
    remove: async (id) => {
        const res = await api.delete(`/post/${id}`);
        return res.data;
    },
};
