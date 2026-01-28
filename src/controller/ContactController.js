import Contact from "@/models/Contact";
import { connectDB } from "@/lib/db";

/* ============================
   CREATE CONTACT
============================ */
export const createContact = async (data) => {
    try {
        await connectDB();

        const contact = await Contact.create({
            name: data.name,
            phone: data.phone,
            email: data.email,
            message: data.message,
        });

        return contact;
    } catch (error) {
        throw new Error(error.message);
    }
};

/* ============================
   GET ALL CONTACTS
============================ */
export const getAllContacts = async () => {
    try {
        await connectDB();
        return await Contact.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error.message);
    }
};

/* ============================
   GET CONTACT BY ID
============================ */
export const getContactById = async (id) => {
    try {
        await connectDB();
        return await Contact.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

/* ============================
   DELETE CONTACT
============================ */
export const deleteContact = async (id) => {
    try {
        await connectDB();
        return await Contact.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
};
