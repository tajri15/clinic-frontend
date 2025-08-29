import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorsListPage from './pages/DoctorsListPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute'; // Import AdminRoute
import AdminDashboardPage from './pages/AdminDashboardPage'; // Import halaman admin
import AdminDoctorsPage from './pages/AdminDoctorsPage'; // Import halaman admin
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-white mr-4 hover:text-indigo-400">Home</Link>
          <Link to="/doctors" className="text-white mr-4 hover:text-indigo-400">Dokter</Link>
          {isAuthenticated && user?.role === 'ROLE_PATIENT' && (
            <Link to="/my-bookings" className="text-white mr-4 hover:text-indigo-400">Janji Temu Saya</Link>
          )}
          {/* Link ini hanya muncul jika user adalah admin */}
          {isAuthenticated && user?.role === 'ROLE_ADMIN' && (
            <Link to="/admin/dashboard" className="text-white mr-4 hover:text-indigo-400">Admin Dashboard</Link>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.email} ({user?.role.replace('ROLE_', '')})</span>
              <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4 hover:text-indigo-400">Login</Link>
              <Link to="/register" className="text-white hover:text-indigo-400">Register</Link>
            </>
          )}
        </div>
      </nav>
      <main>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/doctors" element={<DoctorsListPage />} />
          <Route path="/doctors/:doctorId" element={<DoctorDetailPage />} />

          {/* Rute Terproteksi untuk Pasien */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Route>

          {/* Rute Terproteksi untuk Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          </Route>

        </Routes>
      </main>
    </div>
  )
}

export default App;