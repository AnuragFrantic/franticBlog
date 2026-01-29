// import api from "@/lib/api";

// export const PolicyService = {

//     // ✅ GET ALL POLICIES
//     getAll: async () => {
//         const res = await api.get("/api/policy");
//         return res.data;
//     },

//     // ✅ GET SINGLE POLICY BY ID
//     getById: async (id) => {
//         const res = await api.get(`/api/policy/${id}`);
//         return res.data;
//     },

//     // ✅ CREATE POLICY
//     create: async (data) => {
//         const res = await api.post("/api/policy", data);
//         return res.data;
//     },

//     // ✅ UPDATE POLICY
//     update: async (id, data) => {
//         const res = await api.put(`/api/policy/${id}`, data);
//         return res.data;
//     },

//     // ✅ GET POLICY BY SLUG
//     getBySlug: async (slug) => {
//         const res = await api.get(`/api/policy/slug/${slug}`);
//         return res.data;
//     },

//     // ✅ DELETE POLICY
//     remove: async (id) => {
//         const res = await api.delete(`/api/policy/${id}`);
//         return res.data;
//     },

// };



import api from "@/lib/api";

export const PolicyService = {

    // ✅ GET ALL
    getAll: async () => {
        const res = await api.get("/api/policy");
        return res.data;
    },

    // ✅ GET BY ID
    getById: async (id) => {
        const res = await api.get(`/api/policy/${id}`);
        return res.data;
    },

    // ✅ CREATE
    create: async (data) => {
        const res = await api.post("/api/policy", data);
        return res.data;
    },

    // ✅ UPDATE (POST)
    update: async (id, data) => {
        const res = await api.post(
            `/api/policy/update/${id}`,
            data
        );
        return res.data;
    },

    // ✅ GET BY SLUG
    getBySlug: async (slug) => {
        const res = await api.get(`/api/policy/slug/${slug}`);
        return res.data;
    },

    // ✅ DELETE (POST)
    remove: async (id) => {
        const res = await api.post(
            `/api/policy/delete/${id}`
        );
        return res.data;
    },

};
