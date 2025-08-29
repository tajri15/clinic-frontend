// components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ClinicAPI
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/doctors" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Dokter
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'ROLE_PATIENT' && (
                  <Link to="/my-bookings" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Janji Temu Saya
                  </Link>
                )}
                
                {user?.role === 'ROLE_ADMIN' && (
                  <Link to="/admin/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                
                <div className="relative group ml-3">
                  <button className="flex items-center text-sm focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm text-white">{user?.email}</p>
                      <p className="text-xs text-gray-400">{user?.role?.replace('ROLE_', '')}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Masuk
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
          <Link
            to="/doctors"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Dokter
          </Link>
          
          {isAuthenticated ? (
            <>
              {user?.role === 'ROLE_PATIENT' && (
                <Link
                  to="/my-bookings"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Janji Temu Saya
                </Link>
              )}
              
              {user?.role === 'ROLE_ADMIN' && (
                <Link
                  to="/admin/dashboard"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Admin Dashboard
                </Link>
              )}
              
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">{user?.email}</div>
                    <div className="text-sm font-medium text-gray-400">{user?.role?.replace('ROLE_', '')}</div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-2">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center hover:bg-indigo-700"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}