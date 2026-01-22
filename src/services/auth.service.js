import api from "@/lib/api";

export const AuthService = {
    login: async (payload) => {
        const res = await api.post("/auth/login", payload);
        return res.data; // { success, token, user }
    },
};