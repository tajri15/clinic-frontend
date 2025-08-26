import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

// Definisikan tipe data untuk user dan context
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

// Buat Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Buat Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  useEffect(() => {
    // Cek token saat aplikasi pertama kali dimuat
    if (token) {
      try {
        // Decode token untuk mendapatkan data user (payload)
        const payload = JSON.parse(atob(token.split('.')[1]));
        // 'sub' adalah email, 'authorities' berisi role
        const userRole = payload.authorities ? payload.authorities[0].authority : 'ROLE_PATIENT';
        setUser({ email: payload.sub, role: userRole });
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem('authToken');
        setToken(null);
      }
    }
  }, [token]);

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

// Buat custom hook untuk menggunakan context ini dengan mudah
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};