import { useState, useEffect } from 'react';
import api from '../services/api';
import DoctorCard from '../components/DoctorCard';

// Definisikan tipe data untuk dokter
interface Doctor {
    id: number;
    name: string;
    specialization: string;
}

// Definisikan tipe data untuk object Page yang dikirim oleh Spring Boot
interface DoctorPage {
    content: Doctor[];
    totalPages: number;
    totalElements: number;
    number: number; // nomor halaman saat ini (dimulai dari 0)
    first: boolean;
    last: boolean;
}

export default function DoctorsListPage() {
    // State sekarang menyimpan seluruh object Page, bukan hanya array
    const [doctorPage, setDoctorPage] = useState<DoctorPage | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            setError(null);
            try {
                // Kirim request dengan parameter page dan size
                const response = await api.get(`/doctors?page=${currentPage}&size=6&sort=name,asc`);
                setDoctorPage(response.data);
            } catch (err) {
                setError('Gagal memuat daftar dokter.');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [currentPage]); // useEffect akan berjalan lagi setiap kali currentPage berubah

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!doctorPage || doctorPage.content.length === 0) return <div className="p-8 text-center">Tidak ada dokter ditemukan.</div>

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Daftar Dokter Kami</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctorPage.content.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>

            {/* --- Tombol Paginasi --- */}
            <div className="flex justify-center items-center mt-8 space-x-4">
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={doctorPage.first}
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-white">
                    Halaman {doctorPage.number + 1} dari {doctorPage.totalPages}
                </span>
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={doctorPage.last}
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}