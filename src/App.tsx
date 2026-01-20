import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRoutes from "@/routes/MainRoute";
import AdminRoutes from "@/routes/AdminRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 메인 섹션 라우트 */}
                <Route path="/*" element={<MainRoutes />} />
                {/* 관리자 섹션 라우트 */}
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
        </BrowserRouter>
    );
}
