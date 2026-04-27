import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-32 text-center">
      <div className="text-[12px] font-bold tracking-[2px] uppercase text-[#DC2626] mb-3">
        Erreur 404
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-[#0B1E3F] mb-4 tracking-tight">
        Page introuvable
      </h1>
      <p className="text-[#64748b] mb-8 max-w-md mx-auto">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-6 py-3 rounded-lg text-[14px] font-semibold transition-colors duration-150"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}