import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await api.post('/auth/register', { name, email, password });
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Create a new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm">
                        <input name="name" type="text" required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        <input name="email" type="email" required placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="relative block w-full appearance-none rounded-none border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                        <input name="password" type="password" required minLength={6} placeholder="Password (min. 6 characters)" value={password} onChange={e => setPassword(e.target.value)} className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    {error && <div className="bg-red-900 border border-red-400 text-red-100 px-4 py-3 rounded"><strong className="font-bold">Error: </strong><span>{error}</span></div>}
                    {success && <div className="bg-green-900 border border-green-400 text-green-100 px-4 py-3 rounded"><strong className="font-bold">Success: </strong><span>{success}</span></div>}

                    <div>
                        <button type="submit" disabled={loading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-indigo-400">
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}