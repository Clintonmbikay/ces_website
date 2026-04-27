import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  Car,
  ClipboardCheck,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

type VehiculeKey = 'economique' | 'confort' | 'luxe' | 'suv';

interface FormState {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  pieceIdentite: string;
  vehicule: VehiculeKey | '';
  dateDebut: string;
  dateFin: string;
  comment: string;
  conditions: boolean;
}

const initialForm: FormState = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  pieceIdentite: '',
  vehicule: '',
  dateDebut: '',
  dateFin: '',
  comment: '',
  conditions: false,
};

const vehicules: { key: VehiculeKey; name: string; subtitle: string; price: string }[] = [
  { key: 'economique', name: 'Économique', subtitle: 'Compact · Essence', price: '$25/jour' },
  { key: 'confort', name: 'Confort', subtitle: 'Berline · Climatisée', price: '$45/jour' },
  { key: 'luxe', name: 'Luxe', subtitle: 'Premium · Tout équipé', price: '$85/jour' },
  { key: 'suv', name: 'SUV', subtitle: '4x4 · 7 places', price: '$65/jour' },
];

const steps = [
  { label: 'Identité', icon: User },
  { label: 'Contact', icon: Phone },
  { label: 'Véhicule', icon: Car },
  { label: 'Confirmation', icon: ClipboardCheck },
];

export default function ReservationForm() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);

  useEffect(() => {
    const vehiculeParam = searchParams.get('vehicule') as VehiculeKey;
    if (vehiculeParam && ['economique', 'confort', 'luxe', 'suv'].includes(vehiculeParam)) {
      updateField('vehicule', vehiculeParam);
    }
  }, [searchParams]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleInput = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateField(key, e.target.value as FormState[typeof key]);
  };

  const isStepValid = () => {
    if (step === 0) return form.prenom && form.nom && form.pieceIdentite;
    if (step === 1) return form.email && form.telephone;
    if (step === 2) return form.vehicule && form.dateDebut && form.dateFin;
    if (step === 3) return form.conditions;
    return false;
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep((prev) => prev + 1);
    else setSubmitted(true);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const calculateTotal = () => {
    const vehicule = vehicules.find(v => v.key === form.vehicule);
    if (!vehicule || !form.dateDebut || !form.dateFin) return '$0';
    
    const basePrice = parseFloat(vehicule.price.replace('$', '').replace('/jour', ''));
    const debut = new Date(form.dateDebut);
    const fin = new Date(form.dateFin);
    const jours = Math.max(1, Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24)));
    
    return `$${(basePrice * jours).toFixed(2)}`;
  };

  const calculateDuree = () => {
    if (!form.dateDebut || !form.dateFin) return '';
    const debut = new Date(form.dateDebut);
    const fin = new Date(form.dateFin);
    const jours = Math.max(1, Math.ceil((fin.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24)));
    return `${jours} jour${jours > 1 ? 's' : ''}`;
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-10 lg:p-14 text-center">
        <div className="w-16 h-16 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#0B1E3F] mb-3">Réservation confirmée</h3>
        <p className="text-[#64748b] max-w-md mx-auto mb-6">
          Merci {form.prenom}. Nous vous contactons dans les 24h pour finaliser votre réservation
          et organiser la prise en charge du véhicule.
        </p>
        <button
          onClick={() => {
            setForm(initialForm);
            setStep(0);
            setSubmitted(false);
          }}
          className="text-[#DC2626] font-semibold text-[14px] hover:underline"
        >
          Nouvelle réservation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 lg:p-10">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isCompleted = idx < step;
          const isActive = idx === step;
          const isLast = idx === steps.length - 1;
          return (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors duration-200 ${
                    isCompleted
                      ? 'bg-[#0B1E3F] text-white'
                      : isActive
                      ? 'bg-[#DC2626] text-white ring-4 ring-[#DC2626]/15'
                      : 'bg-white text-[#94a3b8] border-[1.5px] border-[#e2e8f0]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div
                  className={`text-[10px] lg:text-[11px] font-semibold mt-1.5 hidden sm:block ${
                    isActive ? 'text-[#DC2626]' : isCompleted ? 'text-[#0B1E3F]' : 'text-[#94a3b8]'
                  }`}
                >
                  {s.label}
                </div>
              </div>
              {!isLast && (
                <div
                  className={`flex-1 h-[2px] mx-2 lg:mx-3 ${
                    isCompleted ? 'bg-[#0B1E3F]' : isActive ? 'bg-[#DC2626]' : 'bg-[#e2e8f0]'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#DC2626] mb-1">
          Étape {step + 1} sur {steps.length}
        </div>
        <h3 className="text-2xl font-bold text-[#0B1E3F]">
          {step === 0 && 'Vos informations personnelles'}
          {step === 1 && 'Comment vous joindre ?'}
          {step === 2 && 'Choisissez votre véhicule'}
          {step === 3 && 'Confirmation et conditions'}
        </h3>
      </div>

      {/* Step content */}
      {step === 0 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Prénom" required>
              <input
                value={form.prenom}
                onChange={handleInput('prenom')}
                placeholder="Votre prénom"
                className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
              />
            </Field>
            <Field label="Nom de famille" required>
              <input
                value={form.nom}
                onChange={handleInput('nom')}
                placeholder="Votre nom"
                className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
              />
            </Field>
          </div>
          <Field label="N° pièce d'identité" required>
            <input
              value={form.pieceIdentite}
              onChange={handleInput('pieceIdentite')}
              placeholder="Ex: 1-23-45-67890-X-12"
              className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
            />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Email" required>
            <input
              type="email"
              value={form.email}
              onChange={handleInput('email')}
              placeholder="vous@exemple.com"
              className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
            />
          </Field>
          <Field label="Téléphone" required>
            <input
              type="tel"
              value={form.telephone}
              onChange={handleInput('telephone')}
              placeholder="+243 ..."
              className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <Field label="Véhicule sélectionné" required>
            <div className="bg-[#F8FAFC] rounded-xl border-[1.5px] border-[#e2e8f0] p-5">
              {form.vehicule ? (
                <>
                  <div className="text-[15px] font-bold text-[#0B1E3F] mb-1">
                    {vehicules.find(v => v.key === form.vehicule)?.name}
                  </div>
                  <div className="text-[13px] text-[#64748b] mb-3">
                    {vehicules.find(v => v.key === form.vehicule)?.subtitle}
                  </div>
                  <div className="text-[16px] text-[#DC2626] font-bold">
                    {vehicules.find(v => v.key === form.vehicule)?.price}
                  </div>
                </>
              ) : (
                <div className="text-[13px] text-[#64748b]">
                  Aucun véhicule sélectionné. Veuillez retourner à la page des véhicules pour choisir.
                </div>
              )}
            </div>
          </Field>
          <Field label="Période de location" required>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#64748b] mb-1.5">Date de début</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
                  <input
                    type="date"
                    value={form.dateDebut}
                    onChange={handleInput('dateDebut')}
                    className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg pl-10 pr-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#64748b] mb-1.5">Date de fin</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
                  <input
                    type="date"
                    value={form.dateFin}
                    onChange={handleInput('dateFin')}
                    min={form.dateDebut}
                    className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg pl-10 pr-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
                  />
                </div>
              </div>
            </div>
          </Field>
          <Field label="Commentaire (optionnel)">
            <textarea
              value={form.comment}
              onChange={handleInput('comment')}
              rows={3}
              placeholder="Précisez vos besoins particuliers..."
              className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150 resize-none"
            />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          {/* Récapitulatif */}
          <div className="bg-[#F8FAFC] rounded-xl p-6 space-y-5">
            <h4 className="text-[15px] font-bold text-[#0B1E3F] mb-4">Récapitulatif de votre réservation</h4>
            
            {/* Client */}
            <div>
              <div className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748b] mb-2">Client</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Nom complet</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.prenom} {form.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Email</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Téléphone</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.telephone}</span>
                </div>
              </div>
            </div>

            {/* Véhicule */}
            <div className="pt-4 border-t border-[#e2e8f0]">
              <div className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748b] mb-2">Véhicule</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Type</span>
                  <span className="font-semibold text-[#0B1E3F]">
                    {vehicules.find(v => v.key === form.vehicule)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Durée</span>
                  <span className="font-semibold text-[#0B1E3F]">
                    {calculateDuree()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Période</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.dateDebut} - {form.dateFin}</span>
                </div>
              </div>
            </div>

            {/* Prix */}
            <div className="pt-4 border-t-2 border-[#DC2626]">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-[#0B1E3F]">Total à payer</span>
                <span className="text-[20px] font-bold text-[#DC2626]">
                  {calculateTotal()}
                </span>
              </div>
            </div>
          </div>

          {/* Conditions */}
          <label className="flex items-start gap-3 cursor-pointer p-4 bg-white border-2 border-[#e2e8f0] rounded-lg hover:border-[#DC2626] transition-colors">
            <input
              type="checkbox"
              checked={form.conditions}
              onChange={(e) => updateField('conditions', e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-[#e2e8f0] text-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20 cursor-pointer"
            />
            <span className="text-[13px] text-[#475569] leading-relaxed">
              Je confirme avoir lu et accepté les{' '}
              <span className="text-[#DC2626] font-semibold">conditions générales de location</span> de Car
              Express Services et autorise le traitement de mes données pour la gestion de ma
              réservation.{' '}
              <span className="text-[#DC2626]">*</span>
            </span>
          </label>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 pt-6 mt-8 border-t border-[#f1f5f9]">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className={`inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors duration-150 ${
            step === 0
              ? 'text-[#cbd5e1] cursor-not-allowed'
              : 'text-[#0B1E3F] hover:text-[#DC2626]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </button>
        <div className="text-[12px] text-[#64748b] hidden sm:block">
          Étape {step + 1} / {steps.length}
        </div>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-lg text-[14px] font-bold transition-colors duration-150 ${
            isStepValid()
              ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
              : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
          }`}
        >
          {step === steps.length - 1 ? 'Valider la réservation' : 'Continuer'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#0B1E3F] mb-2">
        {label}
        {required && <span className="text-[#DC2626] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
