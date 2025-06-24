import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Film, Tv, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Play className="w-8 h-8 text-red-600" fill="currentColor" />
              <span className="ml-2 text-xl font-bold">StreamPlus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/movies" icon={<Film className="w-4 h-4" />} label="Movies" />
            <NavLink to="/series" icon={<Tv className="w-4 h-4" />} label="Series" />
            <NavLink to="/anime" icon={<Play className="w-4 h-4" />} label="Anime" />
            <button className="p-2 hover:bg-white/10 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            {user ? (
              <button
                onClick={logout}
                className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/95 border-t border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/movies" label="Movies" />
            <MobileNavLink to="/series" label="Series" />
            <MobileNavLink to="/anime" label="Anime" />
            {user ? (
              <button
                onClick={logout}
                className="w-full text-left block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 hover:text-white/80 transition-colors ${
        isActive ? 'text-red-500' : 'text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileNavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-3 py-2 text-base font-medium rounded-md ${
        isActive ? 'bg-red-600 text-white' : 'text-white hover:bg-white/10'
      }`}
    >
      {label}
    </Link>
  );
}

export default Navbar;