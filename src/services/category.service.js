// import api from "@/lib/api";

// export const CategoryService = {

//     // ✅ GET ALL
//     getAll: async () => {
//         const res = await api.get("/api/categories");
//         return res.data;
//     },

//     // ✅ CREATE (multipart/form-data)
//     create: async (formData) => {
//         const res = await api.post("/api/categories", formData);
//         return res.data;
//     },

//     // ✅ UPDATE
//     update: async (id, formData) => {
//         const res = await api.put(`/api/categories/${id}`, formData);
//         return res.data;
//     },

//     // ✅ DELETE
//     remove: async (id) => {
//         const res = await api.delete(`/api/categories/${id}`);
//         return res.data;
//     },

// };



import api from "@/lib/api";

export const CategoryService = {

    // ✅ GET ALL
    getAll: async () => {
        const res = await api.get("/api/categories");
        return res.data;
    },

    // ✅ CREATE
    create: async (formData) => {
        const res = await api.post("/api/categories", formData);
        return res.data;
    },

    // ✅ UPDATE (POST instead of PUT)
    update: async (id, formData) => {
        const res = await api.post(
            `/api/categories/update/${id}`,
            formData
        );
        return res.data;
    },

    // ✅ DELETE (POST instead of DELETE)
    remove: async (id) => {
        const res = await api.post(
            `/api/categories/delete/${id}`
        );
        return res.data;
    },

};
