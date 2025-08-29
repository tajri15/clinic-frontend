import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
}

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchDoctors = async () => {
        try {
            const response = await api.get('/doctors?sort=id,desc'); 
            setDoctors(response.data.content);
        } catch (err) {
            setError('Failed to load doctors.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleAddDoctor = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            await api.post('/admin/doctors', { name, specialization });
            setSuccess('Doctor added successfully!');
            setName('');
            setSpecialization('');
            fetchDoctors(); 
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add doctor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // FUNGSI BARU UNTUK MENGHAPUS DOKTER
    const handleDeleteDoctor = async (doctorId: number) => {
        // Minta konfirmasi dari user
        if (window.confirm(`Are you sure you want to delete doctor with ID ${doctorId}? This action cannot be undone.`)) {
            try {
                await api.delete(`/admin/doctors/${doctorId}`);
                setSuccess('Doctor deleted successfully!');
                // Refresh daftar dokter dengan memfilter dokter yang sudah dihapus
                setDoctors(prevDoctors => prevDoctors.filter(doc => doc.id !== doctorId));
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to delete doctor.');
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Loading doctors...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Manage Doctors</h1>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>
                <form onSubmit={handleAddDoctor} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" />
                    </div>
                    <div>
                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-300">Specialization</label>
                        <input type="text" id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} required className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white" />
                    </div>
                    {error && <p className="text-red-400">{error}</p>}
                    {success && <p className="text-green-400">{success}</p>}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 disabled:bg-indigo-400">
                        {isSubmitting ? 'Saving...' : 'Save Doctor'}
                    </button>
                </form>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Specialization</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {doctors.map(doctor => (
                            <tr key={doctor.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{doctor.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-4">
                                    <Link 
                                        to={`/admin/schedules/${doctor.id}`} 
                                        className="text-indigo-400 hover:text-indigo-300 font-semibold"
                                    >
                                        Atur Jadwal
                                    </Link>
                                    {/* TOMBOL HAPUS BARU */}
                                    <button 
                                        onClick={() => handleDeleteDoctor(doctor.id)} 
                                        className="text-red-500 hover:text-red-400 font-semibold"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}