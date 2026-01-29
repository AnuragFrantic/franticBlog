// import api from "@/lib/api";

// export const PostService = {

//     // ✅ GET ALL (pagination/search)
//     getAll: async (params = {}) => {
//         const res = await api.get("/api/posts", { params });
//         return res.data;
//     },

//     // ✅ GET SINGLE BY ID
//     getById: async (id) => {
//         const res = await api.get(`/api/posts/${id}`);
//         return res.data;
//     },

//     // ✅ GET BY SLUG
//     getBySlug: async (slug) => {
//         const res = await api.get("/api/posts", {
//             params: { slug },
//         });
//         return res.data;
//     },

//     // ✅ CREATE
//     create: async (formData) => {
//         const res = await api.post("/api/posts", formData);
//         return res.data;
//     },

//     // ✅ UPDATE
//     update: async (id, formData) => {
//         const res = await api.put(`/api/posts/${id}`, formData);
//         return res.data;
//     },

//     // ✅ DELETE
//     remove: async (id) => {
//         const res = await api.delete(`/api/posts/${id}`);
//         return res.data;
//     },

// };



import api from "@/lib/api";

export const PostService = {

    // ✅ GET ALL
    getAll: async (params = {}) => {
        const res = await api.get("/api/posts", { params });
        return res.data;
    },

    // ✅ GET BY ID
    getById: async (id) => {
        const res = await api.get(`/api/posts/${id}`);
        return res.data;
    },

    // ✅ GET BY SLUG
    getBySlug: async (slug) => {
        const res = await api.get("/api/posts", { params: { slug } });
        return res.data;
    },

    // ✅ CREATE
    create: async (formData) => {
        const res = await api.post("/api/posts", formData);
        return res.data;
    },

    // ✅ UPDATE (POST)
    update: async (id, formData) => {
        const res = await api.post(
            `/api/posts/update/${id}`,
            formData
        );
        return res.data;
    },

    // ✅ DELETE (POST)
    remove: async (id) => {
        const res = await api.post(
            `/api/posts/delete/${id}`
        );
        return res.data;
    },

};
