// import api from "@/lib/api";

// export const ContactService = {

//     // ✅ CREATE CONTACT
//     create: async (data) => {
//         const res = await api.post("/api/contact", data);
//         return res.data;
//     },

//     // ✅ GET ALL CONTACTS (ADMIN)
//     getAll: async () => {
//         const res = await api.get("/api/contact");
//         return res.data;
//     },

//     // ✅ GET CONTACT BY ID
//     getById: async (id) => {
//         const res = await api.get(`/api/contact/${id}`);
//         return res.data;
//     },

//     // ✅ DELETE CONTACT
//     remove: async (id) => {
//         const res = await api.delete(`/api/contact/${id}`);
//         return res.data;
//     },

// };



import api from "@/lib/api";

export const ContactService = {

    // ✅ CREATE CONTACT
    create: async (data) => {
        const res = await api.post("/api/contact", data);
        return res.data;
    },

    // ✅ GET ALL CONTACTS
    getAll: async () => {
        const res = await api.get("/api/contact");
        return res.data;
    },

    // ✅ GET CONTACT BY ID
    getById: async (id) => {
        const res = await api.get(`/api/contact/${id}`);
        return res.data;
    },

    // ✅ DELETE CONTACT (POST)
    remove: async (id) => {
        const res = await api.post(
            `/api/contact/delete/${id}`
        );
        return res.data;
    },

};

