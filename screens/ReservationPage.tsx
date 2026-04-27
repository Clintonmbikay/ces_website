import ReservationForm from '../components/ReservationForm';

export default function ReservationPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#0B1E3F] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/85 to-[#0B1E3F]/40" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
            Réservation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 max-w-[680px]">
            Réservez votre véhicule en quelques clics
          </h1>
          <p className="text-base text-[#cbd5e1] leading-relaxed max-w-[560px]">
            Choisissez parmi notre flotte de véhicules et profitez d'un service de qualité avec des tarifs compétitifs.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <ReservationForm />
        </div>
      </section>
    </div>
  );
}
