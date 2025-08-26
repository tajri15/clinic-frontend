import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Jika tidak terautentikasi, redirect ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika terautentikasi, tampilkan halaman yang diminta
    return <Outlet />;
};