import { useState, useEffect } from 'react';
import api from '../services/api';
import DoctorCard from '../components/DoctorCard';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
}

export default function DoctorsListPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors');
                setDoctors(response.data);
            } catch (err) {
                setError('Gagal memuat daftar dokter.');
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Daftar Dokter Kami</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}