import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { ROUTES } from "./constants/routes";
import { MemberPage } from "./pages/Member";
import { MemberDetailPage } from "./pages/MemberDetailPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.MEMBER} element={<MemberPage />} />
                <Route path={ROUTES.MEMBER_DETAIL} element={<MemberDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
