import api from "@/lib/api";

export const CategoryService = {
    // ✅ GET ALL
    getAll: async () => {
        const res = await api.get("/category");
        return res.data;
    },

    // ✅ CREATE (with optional icon upload)
    create: async (formData) => {
        const res = await api.post("/category", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    // ✅ UPDATE (with optional icon upload)
    update: async (id, formData) => {
        const res = await api.put(`/category/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    // ✅ DELETE
    remove: async (id) => {
        const res = await api.delete(`/category/${id}`);
        return res.data;
    },
};
