import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

    // useEffect sekarang akan berjalan setiap kali nilai 'token' berubah
    useEffect(() => {
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));

                // Baca role dari claim "roles" yang baru kita tambahkan
                const userRole = payload.roles && payload.roles.length > 0 ? payload.roles[0] : null;

                if (payload.sub && userRole) {
                    setUser({ email: payload.sub, role: userRole });
                } else {
                    throw new Error("Invalid token payload");
                }
            } catch (error) {
                console.error("Failed to process token:", error);
                // Bersihkan state jika token rusak
                logout();
            }
        }
    }, [token]); // <-- PERUBAHAN PENTING: tambahkan [token]

    const login = (newToken: string) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};