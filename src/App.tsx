import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DoctorsListPage from './pages/DoctorsListPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDoctorsPage from './pages/AdminDoctorsPage';
import AdminSchedulesPage from './pages/AdminSchedulesPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

function App() {
  // Hanya memanggil useAuth() tanpa destructuring karena tidak digunakan di komponen ini
  // Tetapi kita perlu memanggilnya agar komponen Navbar bisa mengakses status auth
  useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
            <Route path="/admin/schedules/:doctorId" element={<AdminSchedulesPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;