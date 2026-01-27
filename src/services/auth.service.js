import api from "@/lib/api";

export const AuthService = {
    login: async (payload) => {
        const res = await api.post("/api/auth/login", payload);
        return res.data;
    },

    register: async (payload) => {
        const res = await api.post("/api/auth/register", payload);
        return res.data; // { success, token, user }
    }
};
