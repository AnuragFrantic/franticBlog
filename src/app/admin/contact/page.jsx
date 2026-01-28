"use client";

import { useEffect, useState } from "react";
import { ContactService } from "@/services/contactservice";
import { Trash2 } from "lucide-react";

export default function AdminContactPage() {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const res = await ContactService.getAll();
            setContacts(res?.contacts || res || []);
        } catch (err) {
            console.error("Fetch contacts error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this contact?")) return;

        try {
            await ContactService.remove(id);
            fetchContacts();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Contact Submissions
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : contacts.length === 0 ? (
                <p>No contacts found.</p>
            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow">

                    <table className="w-full border-collapse">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Message</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {contacts.map((c) => (
                                <tr key={c._id} className="border-t">

                                    <td className="p-3">{c.name}</td>
                                    <td className="p-3">{c.email || "-"}</td>
                                    <td className="p-3">{c.phone}</td>

                                    <td className="p-3 max-w-sm truncate">
                                        {c.message || "-"}
                                    </td>

                                    <td className="p-3">
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(c._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}
