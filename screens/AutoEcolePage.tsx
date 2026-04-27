import { useEffect } from 'react';
import { Check, Star, Download, ShieldCheck, Award, Users } from 'lucide-react';
import InscriptionForm from '../components/InscriptionForm';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Plan {
  key: 'acceleree' | 'ordinaire' | 'recyclage';
  name: string;
  subtitle: string;
  price: string;
  cents: string;
  duration: string;
  features: string[];
  popular?: boolean;
  ctaLabel: string;
}

const plans: Plan[] = [
  {
    key: 'acceleree',
    name: 'Accélérée',
    subtitle: 'Cycle Court',
    price: '$269',
    cents: '.99',
    duration: '2 semaines',
    features: ['Horaire personnel', 'Itinéraires au choix', 'Syllabus & brevet', 'Bonus accordé'],
    ctaLabel: 'Choisir Accélérée',
  },
  {
    key: 'ordinaire',
    name: 'Ordinaire',
    subtitle: 'Cycle Normal',
    price: '$169',
    cents: '.99',
    duration: '4 semaines',
    features: ['Horaire collectif', 'Itinéraire collectif', 'Syllabus & brevet', 'Suivi pédagogique'],
    popular: true,
    ctaLabel: "Je m'inscris",
  },
  {
    key: 'recyclage',
    name: 'Recyclage',
    subtitle: 'Perfectionnement',
    price: '$119',
    cents: '.99',
    duration: '2 semaines',
    features: ['Horaire collectif', 'Itinéraire collectif', 'Syllabus & brevet', 'Mise à jour code'],
    ctaLabel: 'Choisir Recyclage',
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Conduite responsable',
    description: 'Notre priorité est de former des conducteurs sûrs et attentifs.',
  },
  {
    icon: Award,
    title: 'Instructeurs certifiés',
    description: '20+ ans d\'expérience pédagogique au service de votre apprentissage.',
  },
  {
    icon: Users,
    title: 'Toutes routes, tous véhicules',
    description: 'Apprenez à conduire dans toutes les conditions, sur tous types de véhicules.',
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

export default function AutoEcolePage() {
  const handleScrollToForm = () => {
    document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1E3F] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/85 to-[#0B1E3F]/40" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <HeroAnimation className="max-w-[680px]">
            <div className="hero-animate-item text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Auto-Ecole moderne
            </div>
            <h1 className="hero-animate-item text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5">
              Apprenez à conduire avec
              <br />
              <span className="text-[#DC2626]">les professionnels.</span>
            </h1>
            <p className="hero-animate-item text-base text-[#cbd5e1] leading-relaxed max-w-[540px] mb-8">
              Former des conducteurs responsables et attentifs, capables de conduire sur tout type
              de route et tout type de véhicule — en toute sécurité.
            </p>
            <button
              onClick={handleScrollToForm}
              className="hero-animate-item inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-3.5 rounded-lg text-[14px] font-bold transition-colors duration-150"
            >
              S'inscrire maintenant
            </button>
          </HeroAnimation>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" childSelector=".benefit-item">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="benefit-item flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#fef2f2] text-[#DC2626] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0B1E3F] mb-1">{b.title}</h3>
                    <p className="text-[13px] text-[#64748b] leading-relaxed">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </AnimatedStagger>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-14" animation="fadeIn">
            <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Formation Auto-Ecole
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-3">
              Choisissez votre formation
            </h2>
            <p className="text-[#64748b] leading-relaxed max-w-[560px] mx-auto">
              Trois formules pensées pour s'adapter à votre rythme, vos disponibilités et votre
              budget.
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch max-w-[1100px] mx-auto" childSelector=".plan-card">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`plan-card relative rounded-2xl p-7 lg:p-8 flex flex-col transition-all duration-200 ${
                  plan.popular
                    ? 'bg-[#0B1E3F] text-white border-2 border-[#DC2626] shadow-xl lg:scale-[1.04]'
                    : 'bg-white text-[#0B1E3F] border border-[#e2e8f0] hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-7 inline-flex items-center gap-1.5 bg-[#DC2626] text-white text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Populaire
                  </div>
                )}
                <div className="mb-6">
                  <h3
                    className={`text-[18px] font-bold ${
                      plan.popular ? 'text-white' : 'text-[#0B1E3F]'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-[12px] mt-1 ${
                      plan.popular ? 'text-[#cbd5e1]' : 'text-[#64748b]'
                    }`}
                  >
                    {plan.subtitle} · {plan.duration}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span
                      className={`text-4xl lg:text-5xl font-bold ${
                        plan.popular ? 'text-white' : 'text-[#0B1E3F]'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-[14px] font-semibold ${
                        plan.popular ? 'text-[#cbd5e1]' : 'text-[#64748b]'
                      }`}
                    >
                      {plan.cents}
                    </span>
                  </div>
                  <div
                    className={`text-[12px] font-medium mt-1 ${
                      plan.popular ? 'text-[#cbd5e1]' : 'text-[#64748b]'
                    }`}
                  >
                    par mois
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className={`flex items-start gap-2.5 text-[13px] ${
                        plan.popular ? 'text-[#e2e8f0]' : 'text-[#475569]'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-[#DC2626] text-white' : 'bg-[#fef2f2] text-[#DC2626]'
                        }`}
                      >
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleScrollToForm}
                  className={`w-full py-3 rounded-lg text-[13px] font-bold transition-colors duration-150 ${
                    plan.popular
                      ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
                      : 'border-[1.5px] border-[#0B1E3F] text-[#0B1E3F] hover:bg-[#0B1E3F] hover:text-white'
                  }`}
                >
                  {plan.ctaLabel}
                </button>
              </div>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* Download brochure */}
      <section className="py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection className="relative h-[300px] rounded-2xl overflow-hidden order-2 lg:order-1" animation="slideInLeft">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900&auto=format&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1E3F]/60 to-transparent" />
            </AnimatedSection>
            <AnimatedSection className="order-1 lg:order-2" animation="slideInRight">
              <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
                Documentation
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0B1E3F] tracking-tight mb-4">
                Télécharger la grille tarifaire
              </h3>
              <p className="text-[#64748b] leading-relaxed mb-6">
                Consultez notre grille tarifaire complète et inscrivez-vous directement en
                remplissant le formulaire d'inscription. Fixons un rendez-vous pour confirmer
                votre place.
              </p>
              <button className="inline-flex items-center gap-2 border-[1.5px] border-[#0B1E3F] hover:bg-[#0B1E3F] hover:text-white text-[#0B1E3F] px-6 py-3 rounded-lg text-[13px] font-bold transition-colors duration-150">
                <Download className="w-4 h-4" />
                Télécharger (PDF)
              </button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Inscription form */}
      <section id="inscription" className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-10" animation="fadeInUp">
            <div className="text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Inscription
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E3F] tracking-tight mb-3">
              Formulaire d'inscription
            </h2>
            <p className="text-[#64748b] leading-relaxed max-w-[520px] mx-auto">
              Quelques minutes pour réserver votre place. Vous pouvez revenir en arrière à tout
              moment.
            </p>
          </AnimatedSection>
          <InscriptionForm />
        </div>
      </section>
    </>
  );
}