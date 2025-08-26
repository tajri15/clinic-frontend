import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorsListPage from './pages/DoctorsListPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import MyBookingsPage from './pages/MyBookingsPage'; // Import halaman baru
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-white mr-4 hover:text-indigo-400">Home</Link>
          <Link to="/doctors" className="text-white mr-4 hover:text-indigo-400">Dokter</Link>
          {isAuthenticated && (
            <Link to="/my-bookings" className="text-white mr-4 hover:text-indigo-400">Janji Temu Saya</Link>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.email}</span>
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

          {/* Rute yang Terproteksi */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-bookings" element={<MyBookingsPage />} />
          </Route>

        </Routes>
      </main>
    </div>
  )
}

export default App;