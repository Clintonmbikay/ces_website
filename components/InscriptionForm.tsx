import { useState, useEffect } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  GraduationCap,
  ClipboardCheck,
  Sun,
  Moon,
  Settings,
  Calendar,
  Clock,
  CheckCircle2,
  Gauge,
  Zap,
  GitMerge,
  BookOpen,
  Award,
} from 'lucide-react';

type BoiteVitesseKey = 'manuelle' | 'automatique' | 'mixte';

interface FormState {
  prenom: string;
  nom: string;
  dateNaissance: string;
  adresse: string;
  pieceIdentite: string;
  photoPasseport: File | null;
  email: string;
  telephone: string;
  contactUrgence: string;
  trainingTypeId: number | null; // ID réel du training type depuis l'API
  boiteVitesse: BoiteVitesseKey | '';
  syllabus: boolean;
  brevet: boolean;
  source: string;
  comment: string;
  conditions: boolean;
}

const initialForm: FormState = {
  prenom: '',
  nom: '',
  dateNaissance: '',
  adresse: '',
  pieceIdentite: '',
  photoPasseport: null,
  email: '',
  telephone: '',
  contactUrgence: '',
  trainingTypeId: null,
  boiteVitesse: '',
  syllabus: false,
  brevet: false,
  source: '',
  comment: '',
  conditions: false,
};

// Formations - données structurales locales, prix dynamiques depuis l'API
const formations: { key: string; name: string; subtitle: string; apiId: number | null }[] = [
  { key: 'acceleree', name: 'Accélérée', subtitle: 'Cycle Court · 2 sem', apiId: null },
  { key: 'complete', name: 'Complète', subtitle: 'Formation complète · 6 sem', apiId: null },
  { key: 'particuliere', name: 'Particulière', subtitle: 'Cours personnalisés', apiId: null },
  { key: 'recyclage', name: 'Recyclage', subtitle: 'Perfectionnement · 2 sem', apiId: null },
];

// Les prix sont désormais exclusivement chargés depuis l'API (manual_rate, automatic_rate)

// Fonction pour obtenir le prix dynamique basé sur la boîte de vitesse
const getFormationPrice = (trainingType: TrainingType | undefined, boiteVitesse: string): string => {
  if (!trainingType) return '$0.00';
  
  let price = trainingType.rate;
  
  // Utiliser le tarif spécifique si disponible (noms exacts de l'API)
  if (boiteVitesse === 'manuelle' && trainingType.manual_rate) {
    price = trainingType.manual_rate;
  } else if (boiteVitesse === 'automatique' && trainingType.automatic_rate) {
    price = trainingType.automatic_rate;
  } else if (boiteVitesse === 'mixte' && trainingType.manual_rate && trainingType.automatic_rate) {
    // Pour mixte, on prend le plus cher des deux
    price = Math.max(trainingType.manual_rate, trainingType.automatic_rate);
  }
  
  // Convertir en nombre si c'est une string (API peut retourner des strings)
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `$${numericPrice?.toFixed(2) || '0.00'}`;
};

const boitesVitesse: { key: BoiteVitesseKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'manuelle', label: 'Manuelle', icon: Gauge },
  { key: 'automatique', label: 'Automatique', icon: Zap },
  { key: 'mixte', label: 'Manuel et automatique', icon: GitMerge },
];

const steps = [
  { label: 'Identité', icon: User },
  { label: 'Contact', icon: Phone },
  { label: 'Formation', icon: GraduationCap },
  { label: 'Confirmation', icon: ClipboardCheck },
];

interface TrainingType {
  id: number;
  name: string;
  rate?: number; // Prix de base
  manual_rate?: number; // Prix boîte manuelle
  automatic_rate?: number; // Prix boîte automatique
  practical_hours?: number;
  theory_hours?: number;
  total_hours?: number;
  is_active?: boolean;
  status_label?: string;
}

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const PARENT_ID = 2;

export default function InscriptionForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);

  // Récupérer les types de formation depuis l'API
  useEffect(() => {
    const fetchTrainingTypes = async () => {
      try {
        // Essayer avec seulement parent_id (is_active peut être géré côté backend)
        const response = await fetch(`${API_BASE_URL}/training-types?parent_id=${PARENT_ID}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des types de formation');
        const data = await response.json();
        console.log('Training types depuis API:', data.data || data);
        setTrainingTypes(data.data || data);
      } catch (err) {
        console.error('Erreur API training-types:', err);
        setError('Impossible de charger les types de formation. Vérifiez que le serveur backend est démarré sur http://127.0.0.1:8000');
      }
    };

    fetchTrainingTypes();
  }, []);

  // Fonction pour réessayer le chargement
  const retryFetchTrainingTypes = () => {
    setError(null);
    setTrainingTypes([]);
    const fetchTrainingTypes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/training-types?parent_id=${PARENT_ID}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des types de formation');
        const data = await response.json();
        setTrainingTypes(data.data || data);
        setError(null);
      } catch (err) {
        console.error('Erreur API training-types:', err);
        setError('Impossible de charger les types de formation. Vérifiez que le serveur backend est démarré.');
      }
    };
    fetchTrainingTypes();
  };

  // Mettre à jour les formations avec les IDs réels de l'API
  useEffect(() => {
    if (trainingTypes.length > 0) {
      console.log('Formations locales:', formations.map(f => f.name));
      console.log('Training types API:', trainingTypes.map(t => ({ id: t.id, name: t.name })));
      
      formations.forEach(f => {
        // Chercher le training type qui correspond par nom (plus flexible)
        const match = trainingTypes.find(t => {
          const fName = f.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const tName = t.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return tName.includes(fName) || fName.includes(tName);
        });
        
        if (match) {
          f.apiId = match.id;
          console.log(`Formation "${f.name}" -> API ID ${match.id} (nom API: "${match.name}")`);
        } else {
          console.warn(`Formation "${f.name}" non trouvée dans l'API`);
        }
      });
    }
  }, [trainingTypes]);

  // Mapper boîte de vitesse vers transmission_type
  const getTransmissionType = (boite: string): string => {
    const mapping: Record<string, string> = {
      manuelle: 'manual',
      automatique: 'automatic',
      mixte: 'both',
    };
    return mapping[boite] || 'manual';
  };

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleInput = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    updateField(key, e.target.value as FormState[typeof key]);
  };

  const isStepValid = () => {
    if (step === 0) return form.prenom && form.nom && form.dateNaissance && form.adresse && form.pieceIdentite && form.photoPasseport;
    if (step === 1) return form.email && form.telephone && form.contactUrgence;
    if (step === 2) return form.trainingTypeId && form.boiteVitesse && (form.syllabus || form.brevet);
    if (step === 3) return form.conditions;
    return false;
  };

  const submitToApi = async () => {
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    
    // Champs obligatoires
    formData.append('first_name', form.prenom);
    formData.append('last_name', form.nom);
    formData.append('email', form.email);
    formData.append('phone_number', form.telephone);
    formData.append('date_of_birth', form.dateNaissance);
    formData.append('enrollment_date', new Date().toISOString().split('T')[0]);
    formData.append('license_category', 'B');
    formData.append('transmission_type', getTransmissionType(form.boiteVitesse));
    formData.append('status', 'active');
    formData.append('parent_id', PARENT_ID.toString());
    
    // Champs optionnels - utiliser directement l'ID stocké dans le formulaire
    if (form.trainingTypeId) formData.append('training_type_id', form.trainingTypeId.toString());
    
    formData.append('address', form.adresse);
    formData.append('identity_document', form.pieceIdentite);
    formData.append('emergency_contact', form.contactUrgence);
    if (form.comment) formData.append('notes', form.comment);
    formData.append('pay_syllabus', form.syllabus ? '1' : '0');
    formData.append('pay_brevet', form.brevet ? '1' : '0');
    
    // Fichier photo
    if (form.photoPasseport) {
      formData.append('photo', form.photoPasseport);
    }

    // Debug: voir ce qui est envoyé
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/students/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Erreur API registration:', data);
        if (data.errors) {
          const errorMessages = Object.entries(data.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('\n');
          setError(errorMessages);
        } else {
          setError(data.message || data.error || 'Erreur lors de l\'inscription');
        }
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      submitToApi();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#e2e8f0] rounded-2xl p-10 lg:p-14 text-center">
        <div className="w-16 h-16 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#0B1E3F] mb-3">Inscription confirmée</h3>
        <p className="text-[#64748b] max-w-md mx-auto mb-6">
          Merci {form.prenom}. Nous vous contactons dans les 24h pour finaliser votre rendez-vous
          et confirmer votre place.
        </p>
        <button
          onClick={() => {
            setForm(initialForm);
            setStep(0);
            setSubmitted(false);
          }}
          className="text-[#DC2626] font-semibold text-[14px] hover:underline"
        >
          Soumettre une nouvelle inscription
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
          {step === 2 && 'Choisissez votre formation'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Date de naissance" required>
              <input
                type="date"
                value={form.dateNaissance}
                onChange={handleInput('dateNaissance')}
                className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
              />
            </Field>
            <Field label="N° pièce d'identité" required>
              <input
                value={form.pieceIdentite}
                onChange={handleInput('pieceIdentite')}
                placeholder="Ex: 1-23-45-67890-X-12"
                className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
              />
            </Field>
          </div>
          <Field label="Adresse" required>
            <textarea
              value={form.adresse}
              onChange={handleInput('adresse')}
              placeholder="Votre adresse complète"
              rows={3}
              className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150 resize-none"
            />
          </Field>
          <Field label="Photo passeport" required>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) updateField('photoPasseport', file);
              }}
              className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#DC2626] file:text-white hover:file:bg-[#B91C1C]"
            />
          </Field>
         
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
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
          <Field label="Contact d'urgence" required>
            <input
              type="tel"
              value={form.contactUrgence}
              onChange={handleInput('contactUrgence')}
              placeholder="Numéro de téléphone d'un proche"
              className="w-full bg-white border-[1.5px] border-[#e2e8f0] focus:border-[#0B1E3F] outline-none rounded-lg px-3.5 py-2.5 text-[14px] text-[#0B1E3F] transition-colors duration-150"
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <Field label="Type de boîte de vitesse" required>
            <div className="grid grid-cols-3 gap-3">
              {boitesVitesse.map((b) => {
                const Icon = b.icon;
                const isSelected = form.boiteVitesse === b.key;
                return (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => updateField('boiteVitesse', b.key)}
                    className={`relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border-[1.5px] text-[13px] font-semibold transition-colors duration-150 ${
                      isSelected
                        ? 'border-[#DC2626] bg-[#fef2f2] text-[#DC2626]'
                        : 'border-[#e2e8f0] bg-white text-[#0B1E3F] hover:border-[#0B1E3F]'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#DC2626] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <Icon className="w-4 h-4" />
                    {b.label}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Type de formation" required>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formations.map((f) => {
                const isSelected = form.trainingTypeId === f.apiId;
                const isAvailable = f.apiId !== null;
                const trainingType = trainingTypes.find(t => t.id === f.apiId);
                const price = getFormationPrice(trainingType, form.boiteVitesse);
                return (
                  <button
                    key={f.key}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => updateField('trainingTypeId', f.apiId)}
                    className={`relative text-left rounded-xl border-[1.5px] p-4 transition-colors duration-150 ${
                      isSelected
                        ? 'border-[#DC2626] bg-[#fef2f2]'
                        : isAvailable
                        ? 'border-[#e2e8f0] bg-white hover:border-[#0B1E3F]'
                        : 'border-[#e2e8f0] bg-gray-50 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#DC2626] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <div className="text-[13px] font-bold text-[#0B1E3F]">{f.name}</div>
                    <div className="text-[11px] text-[#64748b] mt-0.5">{f.subtitle}</div>
                    <div className="text-[12px] text-[#DC2626] font-semibold mt-1.5">
                      {form.boiteVitesse ? price : 'Sélectionnez d\'abord la boîte'}
                    </div>
                    {!isAvailable && (
                      <div className="text-[10px] text-red-500 mt-1">Non disponible</div>
                    )}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Document(s) souhaité(s)" required>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField('syllabus', !form.syllabus)}
                className={`relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-lg border-[1.5px] text-[13px] font-semibold transition-colors duration-150 ${
                  form.syllabus
                    ? 'border-[#DC2626] bg-[#fef2f2] text-[#DC2626]'
                    : 'border-[#e2e8f0] bg-white text-[#0B1E3F] hover:border-[#0B1E3F]'
                }`}
              >
                {form.syllabus && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#DC2626] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <BookOpen className="w-4 h-4" />
                <div className="text-[13px] font-bold">Syllabus</div>
                <div className={`text-[11px] mt-0.5 ${form.syllabus ? 'text-[#DC2626]/70' : 'text-[#64748b]'}`}>
                  Manuel de cours
                </div>
              </button>
              <button
                type="button"
                onClick={() => updateField('brevet', !form.brevet)}
                className={`relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-lg border-[1.5px] text-[13px] font-semibold transition-colors duration-150 ${
                  form.brevet
                    ? 'border-[#DC2626] bg-[#fef2f2] text-[#DC2626]'
                    : 'border-[#e2e8f0] bg-white text-[#0B1E3F] hover:border-[#0B1E3F]'
                }`}
              >
                {form.brevet && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#DC2626] text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <Award className="w-4 h-4" />
                <div className="text-[13px] font-bold">Brevet</div>
                <div className={`text-[11px] mt-0.5 ${form.brevet ? 'text-[#DC2626]/70' : 'text-[#64748b]'}`}>
                  Certificat de conduite
                </div>
              </button>
            </div>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          {/* Récapitulatif */}
          <div className="bg-[#F8FAFC] rounded-xl p-6 space-y-5">
            <h4 className="text-[15px] font-bold text-[#0B1E3F] mb-4">Récapitulatif de votre inscription</h4>
            
            {/* Informations personnelles */}
            <div>
              <div className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748b] mb-2">Identité</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Nom complet</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.prenom} {form.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Date de naissance</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.dateNaissance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">N° pièce d'identité</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.pieceIdentite}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Adresse</span>
                  <span className="font-semibold text-[#0B1E3F] text-right max-w-[60%]">{form.adresse}</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="pt-4 border-t border-[#e2e8f0]">
              <div className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748b] mb-2">Contact</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Email</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Téléphone</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.telephone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Contact d'urgence</span>
                  <span className="font-semibold text-[#0B1E3F]">{form.contactUrgence}</span>
                </div>
              </div>
            </div>

            {/* Formation */}
            <div className="pt-4 border-t border-[#e2e8f0]">
              <div className="text-[11px] font-bold tracking-[1px] uppercase text-[#64748b] mb-2">Formation</div>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Type de formation</span>
                  <span className="font-semibold text-[#0B1E3F]">
                    {formations.find(f => f.apiId === form.trainingTypeId)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Boîte de vitesse</span>
                  <span className="font-semibold text-[#0B1E3F]">
                    {boitesVitesse.find(b => b.key === form.boiteVitesse)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Documents souhaités</span>
                  <span className="font-semibold text-[#0B1E3F]">
                    {[form.syllabus && 'Syllabus', form.brevet && 'Brevet'].filter(Boolean).join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Prix */}
            <div className="pt-4 border-t-2 border-[#DC2626]">
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-bold text-[#0B1E3F]">Total à payer</span>
                <span className="text-[20px] font-bold text-[#DC2626]">
                  {getFormationPrice(
                    trainingTypes.find(t => t.id === form.trainingTypeId),
                    form.boiteVitesse
                  )}
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
              <span className="text-[#DC2626] font-semibold">conditions générales</span> de Car
              Express Services et autorise le traitement de mes données pour la gestion de mon
              inscription.{' '}
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
          disabled={!isStepValid() || submitting}
          className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-lg text-[14px] font-bold transition-colors duration-150 ${
            isStepValid() && !submitting
              ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
              : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
          }`}
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi en cours...
            </>
          ) : step === steps.length - 1 ? (
            <>
              Valider l'inscription
              <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            <>
              Continuer
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-[13px] font-semibold">Erreur:</p>
          <p className="text-red-500 text-[12px] whitespace-pre-line mb-3">{error}</p>
          <button
            type="button"
            onClick={retryFetchTrainingTypes}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-[13px] font-semibold hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-[#0B1E3F] mb-2">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </label>
      {children}
    </div>
  );
}