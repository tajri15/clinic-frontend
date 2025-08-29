import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Stats {
    totalPatients: number;
    totalDoctors: number;
    totalAppointments: number;
}

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: string }) => {
    // ... (kode StatCard tetap sama)
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (value === 0) return;
        const duration = 1000;
        let start = 0;
        const end = value;
        const incrementTime = (duration / end);
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);
        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-transparent hover:border-indigo-500/50 transition-all duration-300">
            <div className={`text-4xl text-indigo-400 ${icon}`}></div>
            <div>
                <p className="text-gray-400 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold text-white">{count}</p>
            </div>
        </div>
    );
};

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8 text-white">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {loading ? (
                    <p className="text-white">Loading stats...</p> // Tambahkan text-white
                ) : stats ? (
                    <>
                        <StatCard title="Total Pasien" value={stats.totalPatients} icon="fas fa-users" />
                        <StatCard title="Total Dokter" value={stats.totalDoctors} icon="fas fa-user-md" />
                        <StatCard title="Total Janji Temu" value={stats.totalAppointments} icon="fas fa-calendar-alt" />
                    </>
                ) : (
                    <p className="text-red-500">Gagal memuat statistik.</p> // Ganti warna jadi merah
                )}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">Panel Manajemen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/admin/doctors" className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-indigo-900 transition-colors flex flex-col justify-center items-center text-center transform hover:scale-105">
                    <div className="text-5xl mb-3 text-indigo-400"><i className="fas fa-stethoscope"></i></div>
                    <h2 className="text-xl font-bold text-white">Manage Doctors</h2>
                    <p className="text-gray-400 mt-2 text-sm">Tambah, hapus, dan atur jadwal dokter.</p>
                </Link>
            </div>
        </div>
    );
}