import { useEffect } from 'react';
import { Car, Wrench, Laptop, ArrowRight, Mail, Briefcase, Users, Heart } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const sectors = [
  {
    icon: Car,
    title: 'Chauffeur Conducteur',
    description:
      'Conduite de véhicules personnels et professionnels. Permis valide et expérience requise.',
    openings: 8,
  },
  {
    icon: Wrench,
    title: 'Chauffeur Mécanicien',
    description:
      'Conduite et maintenance de premier niveau. Expertise mécanique et autonomie indispensables.',
    openings: 4,
  },
  {
    icon: Laptop,
    title: 'Agent Administratif',
    description:
      'Gestion administrative et relation client. Maîtrise des outils bureautiques requise.',
    openings: 3,
  },
];

const values = [
  {
    icon: Briefcase,
    title: 'Carrière à long terme',
    description: 'Évolution interne, formation continue et stabilité.',
  },
  {
    icon: Users,
    title: 'Équipe soudée',
    description: 'Collaboration entre les services, esprit familial.',
  },
  {
    icon: Heart,
    title: 'Engagement social',
    description: 'Impact local en RDC, soutien aux communautés.',
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

export default function CarrieresPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1E3F] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/85 to-[#0B1E3F]/40" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <HeroAnimation>
            <div className="hero-animate-item text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Carrières
            </div>
            <h1 className="hero-animate-item text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 max-w-[680px]">
              Voulez-vous rejoindre Car Express Services ?
            </h1>
            <p className="hero-animate-item text-base text-[#cbd5e1] leading-relaxed max-w-[560px]">
              Depuis plus de 20 ans, nous accompagnons des talents passionnés dans leur évolution
              professionnelle. Découvrez nos opportunités.
            </p>
          </HeroAnimation>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <AnimatedSection className="lg:col-span-1" animation="slideInLeft">
              <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
                Notre mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight">
                Construire ensemble l'excellence du service
              </h2>
            </AnimatedSection>
            <AnimatedSection className="lg:col-span-2" animation="slideInRight">
              <p className="text-[#475569] leading-relaxed text-[15px] mb-6">
                Chez Car Express Services, nous croyons que la qualité du service repose d'abord
                sur la qualité des personnes qui le délivrent. Nous recrutons des collaborateurs
                engagés, professionnels et passionnés — capables de représenter notre exigence
                quotidienne auprès de nos clients.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AnimatedStagger childSelector=".value-card" className="contents">
                {values.map((v) => {
                  const Icon = v.icon;
                  return (
                    <div
                      key={v.title}
                      className="value-card border-l-[3px] border-[#DC2626] pl-4 py-1"
                    >
                      <div className="text-[#DC2626] mb-2">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-[14px] font-bold text-[#0B1E3F] mb-1">{v.title}</h3>
                      <p className="text-[12px] text-[#64748b] leading-relaxed">{v.description}</p>
                    </div>
                  );
                })}
                </AnimatedStagger>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-12" animation="fadeIn">
            <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Postes ouverts
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-3">
              Nos secteurs d'activités
            </h2>
            <p className="text-[#64748b] leading-relaxed max-w-[560px] mx-auto">
              Trois familles de métiers, des opportunités à pourvoir dès maintenant.
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-3 gap-6" childSelector="article">
            {sectors.map((s) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  className="group bg-white border border-[#e2e8f0] rounded-2xl p-7 hover:border-[#DC2626] hover:shadow-lg transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#fef2f2] text-[#DC2626] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="bg-[#0B1E3F] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {s.openings} postes
                    </span>
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0B1E3F] mb-2">{s.title}</h3>
                  <p className="text-[13px] text-[#64748b] leading-relaxed mb-6 flex-1">
                    {s.description}
                  </p>
                  <button className="inline-flex items-center justify-center gap-2 w-full text-[#0B1E3F] border-[1.5px] border-[#0B1E3F] hover:bg-[#0B1E3F] hover:text-white px-4 py-2.5 rounded-lg text-[13px] font-bold transition-colors duration-150">
                    Postuler
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </article>
              );
            })}
          </AnimatedStagger>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection animation="scaleIn">
          <div className="bg-[#0B1E3F] rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#DC2626]/15 blur-3xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
                  Candidature spontanée
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                  Vous ne trouvez pas le poste idéal ?
                </h2>
                <p className="text-[#cbd5e1] leading-relaxed max-w-[480px]">
                  Envoyez-nous votre candidature spontanée. Nous étudions chaque profil avec
                  attention et revenons vers vous sous 7 jours.
                </p>
              </div>
              <div className="flex justify-start lg:justify-end">
                <a
                  href="mailto:carexpressservices@yahoo.fr"
                  className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-4 rounded-lg text-[14px] font-bold transition-colors duration-150"
                >
                  <Mail className="w-4 h-4" />
                  Envoyer ma candidature
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