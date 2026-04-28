import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Car, Building2, GraduationCap, Briefcase, ArrowRight, Star, ShieldCheck, Award, Phone } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CloudinaryImage from '../components/CloudinaryImage';

const services = [
  {
    icon: Car,
    title: 'Location de Véhicules',
    description:
      'Une vaste gamme de véhicules de qualité — du compact pour le quotidien aux 4x4 imposants pour vos déplacements professionnels.',
    href: '/vehicules',
    image: 'https://res.cloudinary.com/du4gu9q4b/image/upload/q_auto/f_auto/v1777363282/mohammad-samir-g30Lva74rhI-unsplash_d9mjre.jpg',
  },
  {
    icon: Building2,
    title: 'Immobilier Meublé',
    description:
      'Appartements meublés à Kinshasa, charges et équipements inclus. Vue fleuve Congo disponible.',
    href: '/immobilier',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
  },
  {
    icon: GraduationCap,
    title: 'Auto-Ecole',
    description:
      'Apprenez à conduire avec des professionnels. 3 formations adaptées à votre rythme et votre budget.',
    href: '/auto-ecole',
    image: 'https://res.cloudinary.com/du4gu9q4b/image/upload/q_auto/f_auto/v1777363775/pexels-didsss-5556560_lf05vt.jpg',
  },
  {
    icon: Briefcase,
    title: 'Placement de Personnel',
    description:
      "Plus de 20 ans d'expertise dans le placement de chauffeurs, mécaniciens et agents administratifs qualifiés.",
    href: '/carrieres',
    image: 'https://res.cloudinary.com/du4gu9q4b/image/upload/q_auto/f_auto/v1777364084/pexels-jep-gambardella-7689739_qytyz1.jpg',
  },
];

const stats = [
  { value: '20+', label: "Années d'expertise" },
  { value: '1556+', label: 'Locations réalisées' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '4', label: 'Services intégrés' },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Fiabilité éprouvée',
    description: "Plus de 20 ans d'engagement envers nos clients à Kinshasa et dans toute la RDC.",
  },
  {
    icon: Award,
    title: 'Qualité premium',
    description: 'Véhicules et appartements haut de gamme, sélectionnés selon des standards stricts.',
  },
  {
    icon: Star,
    title: 'Service personnalisé',
    description: 'Une équipe dédiée à votre satisfaction, joignable 7j/7 pour toutes vos demandes.',
  },
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

function Counter({ value, suffix = '', className = '' }: { value: string; suffix?: string; className?: string }) {
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
      delay: 0.5,
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
      {suffix}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1E3F] overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-40 lg:opacity-55">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/40 to-transparent" />
          <CloudinaryImage 
            publicId="ChatGPT_Image_28_avr._2026_08_58_59_uzkoyp"
            width={1400}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-16 right-8 lg:right-20 w-44 h-1 bg-[#DC2626] hidden md:block" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          <HeroAnimation className="max-w-[600px]">
            <div className="hero-animate-item inline-flex items-center gap-2 bg-[#DC2626]/15 border border-[#DC2626]/40 text-[#fca5a5] text-[11px] font-bold tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full mb-6">
              <Star className="w-3 h-3 fill-current" />
              Plus de 20 ans d'expérience
            </div>
            <h1 className="hero-animate-item text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              Le luxe dans
              <br />
              <span className="text-[#DC2626]">la simplicité.</span>
            </h1>
            <p className="hero-animate-item text-base text-[#cbd5e1] leading-relaxed mb-8 max-w-[480px]">
              Location de véhicules, immobilier meublé, auto-école et placement de personnel — une
              seule entreprise pour tous vos besoins à Kinshasa.
            </p>
            <div className="hero-animate-item flex flex-col sm:flex-row gap-3">
              <Link
                to="/vehicules"
                className="inline-flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-3.5 rounded-lg text-[14px] font-bold transition-colors duration-150"
              >
                Découvrir nos services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+243820999908"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-[1.5px] border-white/30 hover:border-white/60 px-7 py-3.5 rounded-lg text-[14px] font-semibold transition-colors duration-150"
              >
                <Phone className="w-4 h-4" />
                Nous appeler
              </a>
            </div>
            <div className="hero-animate-item mt-12 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">
                    <Counter value={s.value} />
                  </div>
                  <div className="text-[10px] text-[#94a3b8] tracking-[1px] uppercase mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </HeroAnimation>
        </div>
      </section>

      {/* Nos Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection className="max-w-[640px] mb-14" animation="fadeInUp">
            <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Nos services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-4">
              Quatre métiers, une même exigence de qualité
            </h2>
            <p className="text-[#64748b] leading-relaxed">
              Depuis Kinshasa, nous accompagnons particuliers et entreprises dans leurs projets de
              mobilité, logement, formation et recrutement.
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" childSelector="a">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  to={s.href}
                  className="group relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${s.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3F]/60 via-[#0B1E3F]/10 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-white/95 backdrop-blur flex items-center justify-center text-[#DC2626]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[16px] font-bold text-[#0B1E3F] mb-2">{s.title}</h3>
                    <p className="text-[13px] text-[#64748b] leading-relaxed mb-4">
                      {s.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#DC2626] group-hover:gap-2.5 transition-all duration-150">
                      En savoir plus
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </AnimatedStagger>
        </div>
      </section>

      {/* Trust / Why us */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center">
            <AnimatedSection className="lg:col-span-1" animation="slideInLeft">
              <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
                Pourquoi nous choisir
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-4">
                Une expertise au service de votre Majesté
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-6">
                Grâce à notre fiabilité et notre engagement envers la satisfaction de nos clients,
                nous prenons en charge tous les détails — pour vous offrir une expérience sereine.
              </p>
              <Link
                to="/auto-ecole"
                className="inline-flex items-center gap-2 text-[#DC2626] font-semibold text-[14px] hover:gap-3 transition-all duration-150"
              >
                Découvrir notre approche
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
            <AnimatedStagger className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4" childSelector=".trust-card">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="trust-card bg-white border border-[#e2e8f0] rounded-2xl p-6 hover:border-[#DC2626] transition-colors duration-200"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#fef2f2] text-[#DC2626] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] font-bold text-[#0B1E3F] mb-2">{item.title}</h3>
                    <p className="text-[13px] text-[#64748b] leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </AnimatedStagger>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-10" animation="fadeIn">
            <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-2">
              Partenaires & Clients
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight">
              Ils nous ont fait confiance
            </h2>
          </AnimatedSection>
          <AnimatedStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" childSelector=".client-logo">
            {[
              { name: 'Vodacom Congo', logo: '/Vodacom-Logo.wine.svg' },
              { name: 'UNICEF', logo: '/UNICEF-Logo.wine.svg' },
              { name: 'IDLO', logo: '/idlo-international-development-law-organization-seeklogo.svg' },
              { name: 'OMS', logo: '/world-health-organization-logo-1.svg' },
              { name: 'JHPIEGO', logo: '/jhpiego-vector-logo.svg' },
            ].map((client) => (
              <div
                key={client.name}
                className="client-logo bg-white border border-[#e2e8f0] rounded-xl p-6 flex flex-col items-center justify-center hover:border-[#DC2626] transition-colors duration-200 h-36"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection animation="scaleIn">
          <div className="relative overflow-hidden rounded-3xl bg-[#0B1E3F] p-10 lg:p-16">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#DC2626]/20 blur-3xl" />
            <div className="absolute -left-10 -bottom-20 w-72 h-72 rounded-full bg-[#1E40AF]/30 blur-3xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
                  Prêt à démarrer ?
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  Parlons de votre projet
                </h2>
                <p className="text-[#cbd5e1] leading-relaxed max-w-[520px]">
                  Notre équipe vous répond rapidement pour vous orienter vers le service adapté à
                  vos besoins.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                <a
                  href="tel:+243820999908"
                  className="inline-flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-3.5 rounded-lg text-[14px] font-bold transition-colors duration-150"
                >
                  <Phone className="w-4 h-4" />
                  +243 820 999 908
                </a>
                <a
                  href="mailto:carexpressservices@yahoo.fr"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-[1.5px] border-white/30 hover:border-white/60 px-7 py-3.5 rounded-lg text-[14px] font-semibold transition-colors duration-150"
                >
                  Nous écrire
                </a>
              </div>
            </div>
          </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}