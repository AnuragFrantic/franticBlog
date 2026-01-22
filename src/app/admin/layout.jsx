import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayout({ children }) {
    return (
        <AdminAuthGuard>
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
        </AdminAuthGuard>
    );
}
