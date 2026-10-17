import React from 'react';
import { MessageSquare, HelpCircle, DollarSign, CalendarCheck } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface WhyContactProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const WhyContact: React.FC<WhyContactProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang];

  const icons = [
    <MessageSquare className="w-5 h-5 text-teal-600" />,
    <HelpCircle className="w-5 h-5 text-teal-600" />,
    <DollarSign className="w-5 h-5 text-teal-600" />,
    <CalendarCheck className="w-5 h-5 text-teal-600" />,
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            {t.whyContact.tagline}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display">
            {t.whyContact.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.whyContact.subheading}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyContact.reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-slate-50/90 transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center mb-4">
                  {icons[idx]}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-medium text-slate-400">
                0{idx + 1}. Clinical Principle
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <span>Arrange a Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
};
