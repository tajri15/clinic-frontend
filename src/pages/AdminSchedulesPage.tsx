import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

interface Schedule {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

// Daftar hari dalam seminggu
const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

export default function AdminSchedulesPage() {
    const { doctorId } = useParams<{ doctorId: string }>();
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State untuk form tambah jadwal
    const [dayOfWeek, setDayOfWeek] = useState(daysOfWeek[0]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);


    const fetchSchedules = async () => {
        try {
            const response = await api.get(`/doctors/${doctorId}/schedules`);
            setSchedules(response.data);
        } catch (err) {
            setError('Gagal memuat jadwal.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (doctorId) {
            fetchSchedules();
        }
    }, [doctorId]);

    const handleAddSchedule = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);
        setFormSuccess(null);

        try {
            await api.post('/admin/schedules', {
                doctorId: Number(doctorId),
                dayOfWeek,
                startTime,
                endTime
            });
            setFormSuccess('Jadwal berhasil ditambahkan!');
            setStartTime('');
            setEndTime('');
            // Muat ulang daftar jadwal setelah sukses
            fetchSchedules();
        } catch (err: any) {
            setFormError(err.response?.data?.message || 'Gagal menambahkan jadwal.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link to="/admin/doctors" className="text-indigo-400 hover:underline mb-6 block">&larr; Kembali ke Daftar Dokter</Link>
            <h1 className="text-3xl font-bold mb-6">Atur Jadwal Dokter (ID: {doctorId})</h1>

            {/* Form Tambah Jadwal */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Tambah Jadwal Baru</h2>
                <form onSubmit={handleAddSchedule} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-300">Hari</label>
                        <select id="dayOfWeek" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white">
                            {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">Waktu Mulai</label>
                        <input type="time" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} required className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" />
                    </div>
                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-300">Waktu Selesai</label>
                        <input type="time" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} required className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" />
                    </div>
                    <div className="md:col-span-3">
                        {formError && <p className="text-red-400 text-sm mb-2">{formError}</p>}
                        {formSuccess && <p className="text-green-400 text-sm mb-2">{formSuccess}</p>}
                        <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-indigo-400">
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Jadwal'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Daftar Jadwal yang Sudah Ada */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Jadwal Saat Ini</h2>
                {schedules.length > 0 ? (
                     <ul className="divide-y divide-gray-700">
                        {schedules.map(schedule => (
                            <li key={schedule.id} className="py-3 flex justify-between items-center">
                                <span>
                                    <span className="font-semibold text-indigo-400 w-28 inline-block">{schedule.dayOfWeek}</span>
                                    <span>{schedule.startTime} - {schedule.endTime}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : <p>Belum ada jadwal yang diatur untuk dokter ini.</p>}
            </div>
        </div>
    );
}