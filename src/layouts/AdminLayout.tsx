import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex w-full">
            {/* Admin Sidebar */}
            <aside className="h-screen bg-[#2D2D2D] text-white">
                <Sidebar />
            </aside>

            <div className="flex flex-col w-full">
                <AdminHeader />
                {/* Main content */}
                <main className="flex-1 overflow-y-auto px-10 bg-[#ececec]">{children}</main>
            </div>
        </div>
    );
}
