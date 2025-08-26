import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Schedule {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

export default function DoctorDetailPage() {
    const { doctorId } = useParams<{ doctorId: string }>();
    const { isAuthenticated } = useAuth();

    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State untuk form booking
    const [appointmentTime, setAppointmentTime] = useState('');
    const [bookingError, setBookingError] = useState<string | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        if (doctorId) {
            const fetchSchedules = async () => {
                try {
                    const response = await api.get(`/doctors/${doctorId}/schedules`);
                    setSchedules(response.data);
                } catch (err) {
                    setError('Gagal memuat jadwal dokter.');
                } finally {
                    setLoading(false);
                }
            };
            fetchSchedules();
        }
    }, [doctorId]);

    const handleBooking = async (e: FormEvent) => {
        e.preventDefault();
        setIsBooking(true);
        setBookingError(null);
        setBookingSuccess(null);

        if (!appointmentTime) {
            setBookingError("Silakan pilih tanggal dan waktu janji temu.");
            setIsBooking(false);
            return;
        }

        try {
            await api.post('/appointments', {
                doctorId: Number(doctorId),
                appointmentTime: appointmentTime
            });
            setBookingSuccess("Janji temu berhasil dibuat!");
            setAppointmentTime('');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Gagal membuat janji temu. Slot mungkin tidak tersedia.";
            setBookingError(errorMessage);
        } finally {
            setIsBooking(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading jadwal...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Jadwal Praktek</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                {schedules.length > 0 ? (
                    <ul className="space-y-3">
                        {schedules.map(schedule => (
                            <li key={schedule.id} className="text-lg">
                                <span className="font-semibold text-indigo-400 w-24 inline-block">{schedule.dayOfWeek}:</span>
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Dokter ini belum memiliki jadwal.</p>
                )}
            </div>

            {/* --- BAGIAN BOOKING --- */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Buat Janji Temu</h2>
                {isAuthenticated ? (
                    <form onSubmit={handleBooking}>
                        <div className="mb-4">
                            <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-300 mb-2">Pilih Tanggal & Waktu</label>
                            <input 
                                type="datetime-local" 
                                id="appointmentTime"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {bookingSuccess && <div className="text-green-400 mb-4">{bookingSuccess}</div>}
                        {bookingError && <div className="text-red-400 mb-4">{bookingError}</div>}

                        <button type="submit" disabled={isBooking} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors disabled:bg-indigo-400">
                            {isBooking ? 'Membuat janji...' : 'Book Now'}
                        </button>
                    </form>
                ) : (
                    <p className="text-center text-gray-400">
                        Silakan <Link to="/login" className="text-indigo-400 hover:underline">login</Link> untuk membuat janji temu.
                    </p>
                )}
            </div>
        </div>
    );
}