import React from 'react';
import { CheckCircle2, Shield, Clock, Phone, MapPin } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';
import { clinicImages } from '../assets/images';

interface AboutProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const About: React.FC<AboutProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout: Image on Left/Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Asset (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src={clinicImages.about}
                alt="Teeth Care Dental Clinic clean reception and consultation area in Karachi"
                className="w-full h-80 sm:h-96 lg:h-[480px] object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="p-4 bg-slate-900 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-teal-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{businessData.address.fullAddress}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Accessible street-level access at Shop 1, Block 13C, Gulshan-e-Iqbal.
                </p>
              </div>
            </div>
          </div>

          {/* Copy & Principles (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
              {t.about.tagline}
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display mb-6">
              {t.about.heading}
            </h2>

            <div className="space-y-4 text-base text-slate-600 leading-relaxed mb-8">
              <p className="text-slate-800 font-medium text-lg leading-relaxed">
                "{t.about.body1}"
              </p>
              <p>
                {t.about.body2}
              </p>
            </div>

            {/* Core Values / Features */}
            <div className="border-t border-slate-200 pt-6 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-display">
                {t.about.principlesTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-2.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{t.about.point1Title}</h4>
                  <p className="text-xs text-slate-600 leading-normal">{t.about.point1Desc}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-2.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{t.about.point2Title}</h4>
                  <p className="text-xs text-slate-600 leading-normal">{t.about.point2Desc}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-2.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{t.about.point3Title}</h4>
                  <p className="text-xs text-slate-600 leading-normal">{t.about.point3Desc}</p>
                </div>
              </div>
            </div>

            {/* Direct Contact Prompt */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${businessData.contact.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>{t.about.callToDiscuss}</span>
              </a>

              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <span>Request Consultation</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
