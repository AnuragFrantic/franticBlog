import api from "@/lib/api";

export const TagService = {
    getAll: async () => {
        const res = await api.get("/tag");
        return res.data;
    },
};