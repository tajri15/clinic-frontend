import { useState, useEffect } from 'react';
import api from '../services/api';

interface Appointment {
    id: number;
    doctorName: string;
    appointmentTime: string;
    status: string;
}

export default function MyBookingsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/appointments/me');
                setAppointments(response.data);
            } catch (err) {
                setError('Gagal memuat riwayat janji temu.');
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    // Tambahkan text-white pada state loading dan error
    if (loading) return <div className="p-8 text-center text-white">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">Riwayat Janji Temu Saya</h1>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                {appointments.length > 0 ? (
                    <ul className="divide-y divide-gray-700">
                        {appointments.map(app => (
                            <li key={app.id} className="py-4">
                                <p className="font-bold text-lg text-white">Dr. {app.doctorName}</p>
                                <p className="text-gray-300">
                                    {new Date(app.appointmentTime).toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' })}
                                </p>
                                <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                    app.status === 'BOOKED' ? 'bg-blue-600 text-blue-100' : 'bg-gray-600 text-gray-100'
                                }`}>
                                    {app.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-300">Anda belum memiliki riwayat janji temu.</p>
                )}
            </div>
        </div>
    );
}
