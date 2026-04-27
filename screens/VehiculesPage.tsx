import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Users, Fuel, Snowflake, Mountain, Package, ArrowRight, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

type Category = 'Tous' | 'SUV' | 'Van' | 'Berline';

interface Vehicle {
  id: string;
  name: string;
  category: Exclude<Category, 'Tous'>;
  type: string;
  badge?: { label: string; color: 'red' | 'navy' };
  specs: { icon: React.ComponentType<{ className?: string }>; label: string }[];
  pricePerDay: number;
  image: string;
}

// Mapper les véhicules aux types du formulaire
const getVehiculeType = (pricePerDay: number): string => {
  if (pricePerDay <= 50) return 'economique';
  if (pricePerDay <= 80) return 'confort';
  if (pricePerDay <= 120) return 'suv';
  return 'luxe';
};

const vehicles: Vehicle[] = [
  {
    id: 'palissade',
    name: 'Hyundai Palissade',
    category: 'SUV',
    type: 'SUV 7 places · Automatique',
    badge: { label: 'PREMIUM', color: 'red' },
    specs: [
      { icon: Users, label: '7 places' },
      { icon: Fuel, label: 'Diesel' },
      { icon: Snowflake, label: 'Climatisé' },
    ],
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&auto=format&fit=crop',
  },
  {
    id: 'land-cruiser',
    name: 'Toyota Land Cruiser',
    category: 'SUV',
    type: 'SUV 4x4 · Automatique',
    specs: [
      { icon: Users, label: '5 places' },
      { icon: Fuel, label: 'Diesel' },
      { icon: Mountain, label: '4x4' },
    ],
    pricePerDay: 150,
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=900&auto=format&fit=crop',
  },
  {
    id: 'staria',
    name: 'Hyundai Staria',
    category: 'Van',
    type: 'Van 9 places · Automatique',
    badge: { label: 'FAMILLE', color: 'navy' },
    specs: [
      { icon: Users, label: '9 places' },
      { icon: Fuel, label: 'Essence' },
      { icon: Package, label: 'Coffre XL' },
    ],
    pricePerDay: 95,
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=900&auto=format&fit=crop',
  },
  {
    id: 'camry',
    name: 'Toyota Camry',
    category: 'Berline',
    type: 'Berline · Automatique',
    specs: [
      { icon: Users, label: '5 places' },
      { icon: Fuel, label: 'Hybride' },
      { icon: Snowflake, label: 'Climatisé' },
    ],
    pricePerDay: 75,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&auto=format&fit=crop',
  },
  {
    id: 'prado',
    name: 'Toyota Prado',
    category: 'SUV',
    type: 'SUV 4x4 · Automatique',
    specs: [
      { icon: Users, label: '7 places' },
      { icon: Fuel, label: 'Diesel' },
      { icon: Mountain, label: '4x4' },
    ],
    pricePerDay: 130,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format&fit=crop',
  },
  {
    id: 'hiace',
    name: 'Toyota Hiace',
    category: 'Van',
    type: 'Van 12 places · Manuelle',
    specs: [
      { icon: Users, label: '12 places' },
      { icon: Fuel, label: 'Diesel' },
      { icon: Package, label: 'Coffre XL' },
    ],
    pricePerDay: 110,
    image: 'https://images.unsplash.com/photo-1597007030739-6d2e7172ee9c?w=900&auto=format&fit=crop',
  },
];

const categories: Category[] = ['Tous', 'SUV', 'Van', 'Berline'];

const stats = [
  { value: '220+', label: 'Locations ce mois' },
  { value: '1556+', label: 'Depuis Janvier 2024' },
  { value: '98%', label: 'Clients satisfaits' },
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

function Counter({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const hasPlus = value.includes('+');
  const hasPercent = value.includes('%');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: numericValue,
      duration: 2,
      delay: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.val).toString();
      },
    });
  }, [numericValue]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {hasPlus && '+'}
      {hasPercent && <span className="text-[#DC2626]">%</span>}
    </span>
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

export default function VehiculesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous');

  const filteredVehicles =
    activeCategory === 'Tous'
      ? vehicles
      : vehicles.filter((v) => v.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1E3F] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/85 to-transparent" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <HeroAnimation>
            <div className="hero-animate-item text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Location de véhicules
            </div>
            <h1 className="hero-animate-item text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 max-w-[640px]">
              Un charroi automobile à la hauteur de votre activité
            </h1>
            <p className="hero-animate-item text-base text-[#cbd5e1] leading-relaxed max-w-[560px]">
              Une vaste gamme de véhicules — du compact pour le quotidien aux 4x4 imposants pour vos
              week-ends en famille ou vos missions professionnelles.
            </p>
          </HeroAnimation>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12">
          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" childSelector=".stat-item">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={`stat-item flex items-baseline gap-4 ${
                  idx > 0 ? 'md:pl-8 md:border-l border-[#e2e8f0]' : ''
                }`}
              >
                <div className="text-5xl font-bold text-[#0B1E3F] tracking-tight">
                  <Counter value={s.value} />
                </div>
                <div className="text-[13px] text-[#64748b] leading-tight">{s.label}</div>
              </div>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection className="mb-10" animation="fadeInUp">
            <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Notre flotte
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-3">
              Consultez notre charroi automobile
            </h2>
            <p className="text-[#64748b] leading-relaxed max-w-[640px]">
              Tous nos véhicules sont entretenus régulièrement. Réservation en quelques minutes.
            </p>
          </AnimatedSection>

          <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-[#f1f5f9]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-colors duration-150 ${
                  activeCategory === cat
                    ? 'bg-[#0B1E3F] text-white'
                    : 'bg-white text-[#475569] border border-[#e2e8f0] hover:border-[#0B1E3F]'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto text-[13px] text-[#64748b]">
              {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''}{' '}
              disponible{filteredVehicles.length > 1 ? 's' : ''}
            </div>
          </div>

          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" childSelector="article">
            {filteredVehicles.map((v) => (
              <article
                key={v.id}
                className="group bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="relative h-48 overflow-hidden bg-[#0B1E3F]">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${v.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3F]/40 to-transparent" />
                  {v.badge && (
                    <span
                      className={`absolute top-3 left-3 text-white text-[10px] font-bold tracking-[1px] px-2.5 py-1 rounded-full ${
                        v.badge.color === 'red' ? 'bg-[#DC2626]' : 'bg-[#0B1E3F]'
                      }`}
                    >
                      {v.badge.label}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-[17px] font-bold text-[#0B1E3F] mb-1">{v.name}</h3>
                  <p className="text-[12px] text-[#64748b] mb-4">{v.type}</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {v.specs.map((spec) => {
                      const Icon = spec.icon;
                      return (
                        <span
                          key={spec.label}
                          className="inline-flex items-center gap-1.5 text-[11px] text-[#475569] bg-[#F8FAFC] border border-[#e2e8f0] px-2 py-1 rounded-md"
                        >
                          <Icon className="w-3 h-3 text-[#DC2626]" />
                          {spec.label}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex items-end justify-between pt-4 border-t border-[#f1f5f9]">
                    <div>
                      <div className="text-[11px] text-[#64748b]">À partir de</div>
                      <div className="text-xl font-bold text-[#0B1E3F]">
                        ${v.pricePerDay}
                        <span className="text-[12px] text-[#64748b] font-medium">/jour</span>
                      </div>
                    </div>
                    <Link to={`/reservation?vehicule=${getVehiculeType(v.pricePerDay)}`} className="inline-flex items-center gap-1.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-4 py-2.5 rounded-lg text-[12px] font-bold transition-colors duration-150">
                      <Calendar className="w-3.5 h-3.5" />
                      Réserver
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F8FAFC] border-t border-[#e2e8f0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection animation="fadeIn">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#0B1E3F] mb-2">
                Vous ne trouvez pas le véhicule recherché ?
              </h3>
              <p className="text-[#64748b]">
                Notre équipe trouve le véhicule adapté à votre besoin sous 24h.
              </p>
            </div>
            <a
              href="tel:+243820999908"
              className="inline-flex items-center gap-2 bg-[#0B1E3F] hover:bg-[#1E3A5F] text-white px-7 py-3.5 rounded-lg text-[14px] font-bold transition-colors duration-150 flex-shrink-0"
            >
              Demander un véhicule
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}