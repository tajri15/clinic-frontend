import { Link } from 'react-router-dom';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300">
            <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
            <p className="text-indigo-400">{doctor.specialization}</p>
            <Link 
                to={`/doctors/${doctor.id}`} 
                className="mt-4 inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
            >
                Lihat Jadwal
            </Link>
        </div>
    );
}