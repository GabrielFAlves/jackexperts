
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound.js";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Register from "./pages/Register/index.js";

const Router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tasks" element={<ProtectedRoute element={Tasks} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Router;