
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";

const Router = () => {
    return (
        
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/tasks" element={<ProtectedRoute element={Tasks} />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        
    );
};

export default Router;