import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRoutes from "@/routes/MainRoute";
import AdminRoutes from "@/routes/AdminRoute";
import { Toaster } from "sonner";

export default function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-center" offset={{ top: 120 }} />
            <Routes>
                {/* 메인 섹션 라우트 */}
                <Route path="/*" element={<MainRoutes />} />
                {/* 관리자 섹션 라우트 */}
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
        </BrowserRouter>
    );
}
