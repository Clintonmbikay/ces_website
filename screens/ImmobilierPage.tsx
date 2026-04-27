import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Droplets, Sofa, Tv, Wifi, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const rooms = [
  {
    label: 'Espace de vie',
    title: 'Salon moderne',
    description: 'Vue fleuve Congo · Mobilier design',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&auto=format&fit=crop',
    span: 'lg:col-span-2 lg:row-span-2',
    height: 'h-[400px] lg:h-auto',
  },
  {
    label: 'Suite',
    title: 'Chambre de luxe',
    description: 'Lit king-size, dressing',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&auto=format&fit=crop',
    span: '',
    height: 'h-[200px]',
  },
  {
    label: 'Salle d\'eau',
    title: 'Salle de bain',
    description: 'Marbre et finitions premium',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&auto=format&fit=crop',
    span: '',
    height: 'h-[200px]',
  },
  {
    label: 'Repas',
    title: 'Salle à manger',
    description: 'Pour 6 personnes',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700&auto=format&fit=crop',
    span: '',
    height: 'h-[200px]',
  },
  {
    label: 'Cuisine',
    title: 'Cuisine équipée',
    description: 'Électroménager neuf',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&auto=format&fit=crop',
    span: '',
    height: 'h-[200px]',
  },
];

const features = [
  { icon: Zap, title: 'Électricité incluse', description: 'Charges fixes prises en charge' },
  { icon: Droplets, title: 'Eau potable', description: 'Approvisionnement assuré' },
  { icon: Sofa, title: 'Meublé complet', description: 'Mobilier qualité inclus' },
  { icon: Tv, title: 'TV satellite', description: 'Connexion comprise' },
  { icon: Wifi, title: 'Internet haut débit', description: 'Wi-Fi dans tout le logement' },
  { icon: ShieldCheck, title: 'Sécurité 24/7', description: 'Surveillance et accès contrôlé' },
];

function AnimatedSection({ children, className, animation = 'fadeInUp' }: { children: React.ReactNode; className?: string; animation?: 'fadeInUp' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight' }) {
  const { ref, fadeInUp, fadeIn, scaleIn, slideInLeft, slideInRight } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    switch (animation) {
      case 'fadeInUp':
        fadeInUp({ once: true });
        break;
      case 'fadeIn':
        fadeIn({ once: true });
        break;
      case 'scaleIn':
        scaleIn({ once: true });
        break;
      case 'slideInLeft':
        slideInLeft({ once: true });
        break;
      case 'slideInRight':
        slideInRight({ once: true });
        break;
    }
  }, [animation, fadeInUp, fadeIn, scaleIn, slideInLeft, slideInRight]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function AnimatedStagger({ children, className, childSelector }: { children: React.ReactNode; className?: string; childSelector: string }) {
  const { ref, staggerChildren } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    staggerChildren(childSelector, { once: true, stagger: 0.1 });
  }, [childSelector, staggerChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function HeroAnimation({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, staggerHeroChildren } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    staggerHeroChildren('.hero-animate-item', { delay: 0.1, stagger: 0.12, duration: 0.9, y: 35 });
  }, [staggerHeroChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default function ImmobilierPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1E3F] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/80 to-transparent" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <HeroAnimation>
            <div className="hero-animate-item text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Nos appartements
            </div>
            <h1 className="hero-animate-item text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 max-w-[640px]">
              L'immobilier de qualité à votre service
            </h1>
            <p className="hero-animate-item text-base text-[#cbd5e1] leading-relaxed max-w-[560px] mb-2">
              Appartements meublés à Kinshasa — charges, équipements et services inclus.
            </p>
            <div className="hero-animate-item inline-flex items-center gap-2 mt-3 text-[#fca5a5]">
              <MapPin className="w-4 h-4" />
              <span className="text-[13px]">Kinshasa-Gombe · Vue fleuve Congo</span>
            </div>
          </HeroAnimation>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-1">
                À partir de
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#0B1E3F]">$30</span>
                <span className="text-[#64748b]">/ nuit · charges incluses</span>
              </div>
            </div>
            <a
              href="tel:+243820999908"
              className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-6 py-3 rounded-lg text-[14px] font-bold transition-colors duration-150"
            >
              Réserver maintenant
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-12" animation="fadeIn">
            <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Visite guidée
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-3">
              Des espaces pensés pour votre confort
            </h2>
            <p className="text-[#64748b] leading-relaxed max-w-[640px] mx-auto">
              Chaque appartement combine élégance, fonctionnalité et qualité — pour que vous vous
              sentiez chez vous, dès la première nuit.
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 lg:grid-cols-4 gap-4" childSelector=".room-card">
            {rooms.map((room, idx) => (
              <div
                key={idx}
                className={`room-card relative overflow-hidden rounded-2xl group ${room.span} ${room.height}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${room.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3F]/95 via-[#0B1E3F]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-[10px] tracking-[1px] uppercase opacity-90 font-semibold">
                    {room.label}
                  </div>
                  <div
                    className={`font-bold mt-1 ${
                      idx === 0 ? 'text-2xl' : 'text-base'
                    }`}
                  >
                    {room.title}
                  </div>
                  <div className="text-[12px] opacity-85 mt-1">{room.description}</div>
                </div>
              </div>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <AnimatedSection animation="slideInLeft">
              <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
                Tout est inclus
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-4">
                Pas de mauvaises surprises
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-6">
                Grâce à notre expertise, nous nous occupons de toutes les charges fixes connexes —
                électricité, eau, mobilier, télévision par satellite et plus encore.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#DC2626] font-semibold text-[14px] hover:gap-3 transition-all duration-150"
              >
                Voir tous les services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
            <AnimatedStagger className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" childSelector=".feature-card">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="feature-card bg-white border border-[#e2e8f0] rounded-xl p-5 hover:border-[#DC2626] transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#fef2f2] text-[#DC2626] flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-[14px] font-bold text-[#0B1E3F] mb-1">{f.title}</h3>
                    <p className="text-[12px] text-[#64748b] leading-relaxed">{f.description}</p>
                  </div>
                );
              })}
            </AnimatedStagger>
          </div>
        </div>
      </section>
    </>
  );
}