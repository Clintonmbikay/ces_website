import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/vehicules', label: 'Location de Véhicules' },
  { to: '/immobilier', label: 'Immobilier' },
  { to: '/auto-ecole', label: 'Auto-Ecole' },
  { to: '/carrieres', label: 'Carrières' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img src="/logo.png" alt="Car Express Services" className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative text-[14px] font-medium transition-colors duration-150 py-6 ${
                  isActive
                    ? 'text-[#DC2626] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#DC2626]'
                    : 'text-[#475569] hover:text-[#0B1E3F]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors duration-150"
          >
            <Phone className="w-4 h-4" />
            Nous contacter
          </Link>
          <button
            onClick={toggleMenu}
            className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg border border-[#e2e8f0] text-[#0B1E3F]"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#e2e8f0] bg-white">
          <nav className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `py-3 text-[14px] font-medium border-b border-[#f1f5f9] last:border-0 ${
                    isActive ? 'text-[#DC2626]' : 'text-[#475569]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#DC2626] text-white px-5 py-3 rounded-lg text-[14px] font-semibold"
            >
              <Phone className="w-4 h-4" />
              Nous contacter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}