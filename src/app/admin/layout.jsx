import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                <AdminSidebar />

                {/* Content */}
                <div className="flex-1">
                    <AdminHeader />
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
