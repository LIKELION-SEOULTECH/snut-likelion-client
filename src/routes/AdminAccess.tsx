import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { getRoleFromToken } from "@/utils/auth";

export default function AdminAccess({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("accessToken");
    const role = getRoleFromToken();

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (role !== "ROLE_ADMIN" && role !== "ROLE_MANAGER") {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <>{children}</>;
}
