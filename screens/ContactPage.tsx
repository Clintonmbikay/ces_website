import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Linkedin, Twitter, Send } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-[#0B1E3F] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F] via-[#0B1E3F]/85 to-[#0B1E3F]/40" />
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <HeroAnimation>
            <div className="hero-animate-item text-[12px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-3">
              Contact
            </div>
            <h1 className="hero-animate-item text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 max-w-[680px]">
              Parlons de votre projet ensemble
            </h1>
            <p className="hero-animate-item text-base text-[#cbd5e1] leading-relaxed max-w-[560px]">
              Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos besoins. N'hésitez pas à nous contacter.
            </p>
          </HeroAnimation>
        </div>
      </section>

      <div className="bg-[#F8FAFC] min-h-screen py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de Contact */}
          <AnimatedSection className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-[#e2e8f0] h-fit" animation="slideInLeft">
            <h2 className="text-3xl font-bold text-[#0B1E3F] mb-8">
              Informations
              <br />
              de Contact
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#fef2f2] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#64748b] mb-1">
                    ADRESSE
                  </h3>
                  <p className="text-[15px] text-[#0B1E3F] font-medium">
                    Gombe, Kinshasa
                  </p>
                  <p className="text-[14px] text-[#64748b]">
                    République Démocratique du Congo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#fef2f2] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#64748b] mb-1">
                    EMAIL
                  </h3>
                  <a
                    href="mailto:info@carexpress.cd"
                    className="text-[15px] text-[#0B1E3F] font-medium hover:text-[#DC2626] transition-colors"
                  >
                    info@carexpress.cd
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#fef2f2] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#64748b] mb-1">
                    TÉLÉPHONE
                  </h3>
                  <a
                    href="tel:+243810000000"
                    className="text-[15px] text-[#0B1E3F] font-medium hover:text-[#DC2626] transition-colors"
                  >
                    +243 81 000 0000
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#e2e8f0]">
              <h3 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#64748b] mb-4">
                RÉSEAUX SOCIAUX
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg bg-[#F8FAFC] hover:bg-[#DC2626] hover:text-white border border-[#e2e8f0] flex items-center justify-center transition-all duration-150"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-lg bg-[#F8FAFC] hover:bg-[#DC2626] hover:text-white border border-[#e2e8f0] flex items-center justify-center transition-all duration-150"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Formulaire de Contact */}
          <AnimatedSection className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-[#e2e8f0]" animation="slideInRight">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-semibold text-[#0B1E3F] mb-2">
                    Nom Complet <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#0B1E3F] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold text-[#0B1E3F] mb-2">
                    Email <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#0B1E3F] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[13px] font-semibold text-[#0B1E3F] mb-2">
                  Sujet
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#0B1E3F] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                  }}
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="location">Location de véhicules</option>
                  <option value="immobilier">Immobilier</option>
                  <option value="auto-ecole">Auto-école</option>
                  <option value="carrieres">Placement de personnel</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[13px] font-semibold text-[#0B1E3F] mb-2">
                  Message <span className="text-[#DC2626]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Comment pouvons-nous vous aider ?"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[14px] text-[#0B1E3F] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-3.5 rounded-lg text-[14px] font-bold transition-colors duration-150"
              >
                Envoyer
                <Send className="w-4 h-4" />
              </button>
            </form>
          </AnimatedSection>
        </div>

        {/* Carte Google Maps */}
        <AnimatedSection className="mt-8 bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0]" animation="fadeIn">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5847894362!2d15.307!3d-4.3217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTknMTguMSJTIDE1wrAxOCcyNS4yIkU!5e0!3m2!1sfr!2scd!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Car Express Services - Gombe, Kinshasa"
          />
        </AnimatedSection>
        </div>
      </div>
    </>
  );
}
