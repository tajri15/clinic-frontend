import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/admin/doctors" className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-indigo-900 transition-colors">
                    <h2 className="text-xl font-bold text-white">Manage Doctors</h2>
                    <p className="text-gray-400 mt-2">Add, view, or edit doctor data.</p>
                </Link>
                {/* Nanti bisa ditambahkan menu lain di sini */}
            </div>
        </div>
    );
}