import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

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

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userRole = payload.roles && payload.roles.length > 0 ? payload.roles[0] : null;

                if (payload.sub && userRole) {
                    setUser({ email: payload.sub, role: userRole });
                } else {
                    throw new Error("Invalid token payload");
                }
            } catch (error) {
                console.error("Token tidak valid, logout paksa:", error);
                logout();
            }
        } else {
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
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