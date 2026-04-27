import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1E3F] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-5">
              <img src="/light_logo.png" alt="Car Express Services" className="h-12 w-auto" />
            </div>
            <p className="text-[13px] text-[#94a3b8] leading-relaxed">
              Une entreprise de Location de Véhicule, Auto-Ecole, Placement de personnel et
              Immobilier. Présente dans toutes les provinces de la RDC.
            </p>
          </div>

          <div>
            <h3 className="text-[12px] font-bold tracking-[1.5px] uppercase mb-5 pl-3 border-l-[3px] border-[#DC2626]">
              Nos Services
            </h3>
            <ul className="space-y-3 text-[13px] text-[#cbd5e1]">
              <li>
                <Link to="/vehicules" className="hover:text-white transition-colors duration-150">
                  Location des Véhicules
                </Link>
              </li>
              <li>
                <Link to="/immobilier" className="hover:text-white transition-colors duration-150">
                  Immobilier
                </Link>
              </li>
              <li>
                <Link to="/auto-ecole" className="hover:text-white transition-colors duration-150">
                  Auto-Ecole
                </Link>
              </li>
              <li>
                <Link to="/carrieres" className="hover:text-white transition-colors duration-150">
                  Placement de personnel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-bold tracking-[1.5px] uppercase mb-5 pl-3 border-l-[3px] border-[#DC2626]">
              Contactez-nous
            </h3>
            <ul className="space-y-3 text-[13px] text-[#cbd5e1]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#DC2626]" />
                <span>34, Boulevard du 30 Juin, 2ème Étage Immeuble Virunga à Kinshasa-Gombe</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
                <span>+243 820 999 908</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
                <span>+243 999 907 883</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#DC2626]" />
                <span>carexpressservices@yahoo.fr</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-bold tracking-[1.5px] uppercase mb-5 pl-3 border-l-[3px] border-[#DC2626]">
              Suivez-nous
            </h3>
            <p className="text-[13px] text-[#94a3b8] mb-5">
              Restez connecté à nos dernières actualités et offres.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#DC2626] border border-white/10 flex items-center justify-center transition-colors duration-150"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#DC2626] border border-white/10 flex items-center justify-center transition-colors duration-150"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#DC2626] border border-white/10 flex items-center justify-center transition-colors duration-150"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#94a3b8]">
          <span>© 2026 Car Express Services. Tous droits réservés.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors duration-150">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white transition-colors duration-150">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}