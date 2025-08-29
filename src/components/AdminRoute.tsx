import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        // Jika belum login, tendang ke halaman login
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'ROLE_ADMIN') {
        // Jika sudah login TAPI bukan admin, tendang ke homepage
        return <Navigate to="/" replace />;
    }

    // Jika sudah login DAN seorang admin, izinkan akses
    return <Outlet />;
};