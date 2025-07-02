import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
    children: React.ReactNode;
    onSubmit?: () => void;
}

export default function AdminLayout({ children, onSubmit }: AdminLayoutProps) {
    return (
        <div className="flex w-full">
            {/* Admin Sidebar */}
            <aside className="h-100% bg-[#2D2D2D] text-white">
                <Sidebar />
            </aside>

            <div className="flex flex-col w-full">
                <AdminHeader userName="전민경" onSubmit={onSubmit} /> {/* 전달 */}
                {/* Main content */}
                <main className="flex-1 overflow-y-auto px-10 bg-[#ececec]">{children}</main>
            </div>
        </div>
    );
}
