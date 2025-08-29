import { Link } from 'react-router-dom';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
}

interface DoctorCardProps {
    doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    return (
        <div className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2">
            <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {doctor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-1">Dr. {doctor.name}</h3>
                <p className="text-indigo-400 text-center mb-4">{doctor.specialization}</p>
                <p className="text-gray-400 text-sm text-center mb-6">Dokter profesional dengan pengalaman luas di bidangnya.</p>
                
                <div className="flex justify-between items-center">
                    <Link 
                        to={`/doctors/${doctor.id}`} 
                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center"
                    >
                        Lihat Jadwal
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                    <div className="flex items-center text-yellow-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-400">4.9</span>
                    </div>
                </div>
            </div>
        </div>
    );
}