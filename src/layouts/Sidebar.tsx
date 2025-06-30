import { SidebarHeader } from "@/components/admin/SidebarHeader";
import { SidebarList } from "@/components/admin/SidebarList";

export const Sidebar = () => {
    return (
        <div className="flex flex-col min-h-screen text-white]">
            <SidebarHeader />
            <SidebarList />
        </div>
    );
};
