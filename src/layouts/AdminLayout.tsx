import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutProps {
    children: React.ReactNode;
    onToggleDeleteMode?: () => void;
    isDeleteMode?: boolean;
    onUploadClick?: () => void;
}

export default function AdminLayout({
    children,
    onToggleDeleteMode,
    isDeleteMode,
    onUploadClick
}: AdminLayoutProps) {
    return (
        <div className="flex w-full">
            {/* Admin Sidebar */}
            <aside className="h-100% bg-[#2D2D2D] text-white">
                <Sidebar />
            </aside>

            <div className="flex flex-col w-full">
                <AdminHeader
                    onToggleDeleteMode={onToggleDeleteMode}
                    isDeleteMode={isDeleteMode}
                    onUploadClick={onUploadClick}
                />
                {/* Main content */}
                <main className="flex-1 overflow-y-auto px-10 bg-[#ececec]">{children}</main>
            </div>
        </div>
    );
}
