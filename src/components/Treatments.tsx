import React, { useState } from 'react';
import {
  Stethoscope,
  Sparkles,
  Smile,
  Activity,
  ShieldCheck,
  Scissors,
  Layers,
  Anchor,
  Grid,
  CheckCircle,
  Calendar,
  Info,
  ChevronRight,
  Phone
} from 'lucide-react';
import { businessData, DentalTreatment } from '../data/business';
import { Language, translations } from '../data/translations';

interface TreatmentsProps {
  currentLang: Language;
  onSelectTreatmentForBooking: (treatmentName: string) => void;
}

export const Treatments: React.FC<TreatmentsProps> = ({
  currentLang,
  onSelectTreatmentForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalTreatment, setActiveModalTreatment] = useState<DentalTreatment | null>(null);
  const t = translations[currentLang];

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-teal-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-teal-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-teal-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-teal-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-teal-600" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5 text-teal-600" />;
      case 'Grid':
        return <Grid className="w-5 h-5 text-teal-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-teal-600" />;
    }
  };

  const categories = [
    { id: 'all', label: t.treatments.allCategories },
    { id: 'preventive', label: t.treatments.filterPreventive },
    { id: 'restorative', label: t.treatments.filterRestorative },
    { id: 'cosmetic', label: t.treatments.filterCosmetic },
    { id: 'surgical', label: t.treatments.filterSurgical },
    { id: 'orthodontics', label: t.treatments.filterOrthodontics },
  ];

  const filteredTreatments =
    selectedCategory === 'all'
      ? businessData.treatments
      : businessData.treatments.filter((item) => item.category === selectedCategory);

  return (
    <section id="treatments" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            {t.treatments.tagline}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display">
            {t.treatments.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.treatments.subheading}
          </p>
        </div>

        {/* Interactive Category Filter Tabs (Zero-pill discipline: Segmented control) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/60 rounded-xl max-w-2xl mx-auto mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-teal-500/50 hover:shadow-md transition-all group"
            >
              <div>
                {/* Header: Icon + Name */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-teal-100/60 transition-colors">
                    {getIcon(treatment.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {currentLang === 'ur' ? treatment.nameUrdu : treatment.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5 capitalize">
                      {treatment.category} care
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {currentLang === 'ur' ? treatment.shortDescriptionUrdu : treatment.shortDescription}
                </p>
              </div>

              {/* Card Footer: Pricing note & Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="italic">{treatment.pricingNote}</span>
                  <button
                    onClick={() => setActiveModalTreatment(treatment)}
                    className="text-teal-700 hover:text-teal-900 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.treatments.viewDetails}</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => onSelectTreatmentForBooking(treatment.name)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold text-teal-800 bg-teal-50/80 hover:bg-teal-600 hover:text-white rounded-lg transition-colors border border-teal-200/70 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.treatments.requestAppointment}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Guidance Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center shrink-0 border border-sky-100">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Need help deciding on the right treatment?</h4>
              <p className="text-xs text-slate-500">A clinical consultation allows the dentist to examine your tooth structure directly and provide exact recommendations.</p>
            </div>
          </div>
          <a
            href={`tel:${businessData.contact.phoneRaw}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-700" />
            <span>Call to discuss</span>
          </a>
        </div>

      </div>

      {/* Modal for detailed treatment info */}
      {activeModalTreatment && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalTreatment(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider">
                  Educational Overview
                </span>
                <h3 className="text-lg font-bold text-slate-950 font-display mt-1">
                  {currentLang === 'ur' ? activeModalTreatment.nameUrdu : activeModalTreatment.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalTreatment(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-lg font-bold"
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600 mb-6">
              <p className="leading-relaxed">
                {activeModalTreatment.detailedInfo}
              </p>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs text-slate-500">
                <strong className="text-slate-700">Pricing Note:</strong> Actual treatment costs depend on individual clinical requirements, tooth location, and restorative materials. Contact the clinic directly or attend a consultation for an itemized estimate.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveModalTreatment(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const name = activeModalTreatment.name;
                  setActiveModalTreatment(null);
                  onSelectTreatmentForBooking(name);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
              >
                Book for this Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
