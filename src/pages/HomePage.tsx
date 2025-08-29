import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
    // Ambil status autentikasi dan data user dari context
    const { isAuthenticated, user } = useAuth();

    // Fungsi untuk menampilkan tombol Call-to-Action (CTA) yang berbeda
    const renderCallToAction = () => {
        if (!isAuthenticated) {
            // Tampilan untuk TAMU (belum login)
            return (
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
                    <Link 
                        to="/doctors" 
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-10 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
                    >
                        Lihat Daftar Dokter
                    </Link>
                    <Link 
                        to="/register" 
                        className="bg-transparent border-2 border-indigo-500 text-white font-bold py-4 px-10 rounded-full hover:bg-indigo-500/10 transition-all transform hover:scale-105"
                    >
                        Daftar Sekarang
                    </Link>
                </div>
            );
        }

        if (user?.role === 'ROLE_ADMIN') {
            // Tampilan untuk ADMIN
            return (
                 <Link 
                    to="/admin/dashboard" 
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 px-10 rounded-full hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/30 animate-fade-in-up animation-delay-600"
                >
                    Buka Dasbor Admin
                </Link>
            );
        }

        if (user?.role === 'ROLE_PATIENT') {
            // Tampilan untuk PASIEN
            return (
                 <Link 
                    to="/my-bookings" 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-10 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 animate-fade-in-up animation-delay-600"
                >
                    Lihat Janji Temu Saya
                </Link>
            );
        }

        return null; // Fallback jika role tidak dikenali
    };

    return (
        <div className="text-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-center py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-gray-900/70"></div>
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
                
                <div className="relative z-10 max-w-6xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in-down">
                        Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">ClinicAPI</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
                        {isAuthenticated ? `Halo, ${user?.email}! Siap untuk mengelola kesehatan Anda?` : 'Solusi mudah untuk menemukan dokter dan membuat janji temu secara online. Cepat, efisien, dan terpercaya.'}
                    </p>
                    {renderCallToAction()}
                </div>
            </section>

            {/* Bagian "How It Works" dan "Features" tetap sama */}
            <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Bagaimana Cara Kerjanya?</h2>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">Hanya perlu 3 langkah mudah untuk mendapatkan layanan kesehatan terbaik</p>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="group bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm">
                            <div className="text-indigo-400 text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-600/20 to-indigo-400/10 rounded-full flex items-center justify-center">
                                    <i className="fas fa-search"></i>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">1. Cari Dokter</h3>
                            <p className="text-gray-400">Temukan dokter spesialis yang Anda butuhkan dari daftar profesional kami.</p>
                        </div>
                        <div className="group bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm">
                            <div className="text-indigo-400 text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-600/20 to-indigo-400/10 rounded-full flex items-center justify-center">
                                    <i className="fas fa-calendar-check"></i>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">2. Pilih Jadwal</h3>
                            <p className="text-gray-400">Lihat jadwal praktek yang tersedia dan pilih waktu yang paling sesuai untuk Anda.</p>
                        </div>
                        <div className="group bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm">
                            <div className="text-indigo-400 text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-600/20 to-indigo-400/10 rounded-full flex items-center justify-center">
                                    <i className="fas fa-book-medical"></i>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">3. Buat Janji Temu</h3>
                            <p className="text-gray-400">Daftar atau login untuk mengonfirmasi janji temu Anda secara instan.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}