import React from 'react';
import { Calendar, ArrowRight, Phone, MapPin, Clock, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';
import { clinicImages } from '../assets/images';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang];

  return (
    <section id="home" className="pt-24 sm:pt-28 pb-12 sm:pb-16 bg-gradient-to-b from-sky-50/70 via-white to-slate-50 border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split: Content & Real Photographic Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Location & Verified Rating Bar (Clean unboxed metadata) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 mb-4">
              <span className="inline-flex items-center gap-1 font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{businessData.address.area}, {businessData.address.city}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              
              {/* Rating link to Google Maps */}
              <a
                href={businessData.maps.googleListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-teal-700 transition-colors font-medium py-0.5 group"
                title="View verified 5.0 Google rating on Google Maps"
              >
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-semibold text-slate-900 tabular-nums">{businessData.reputation.googleRating.toFixed(1)}</span>
                <span className="text-slate-500">({businessData.reputation.reviewCount} Google reviews)</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 font-display leading-[1.15] text-balance mb-5">
              {t.hero.headline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 max-w-2xl">
              {t.hero.supportingText}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.hero.primaryCta}</span>
              </button>

              <a
                href="#treatments"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
              >
                <span>{t.hero.secondaryCta}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>

              <a
                href={`tel:${businessData.contact.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-teal-800 hover:text-teal-900 bg-teal-50/70 hover:bg-teal-100/70 rounded-lg transition-colors border border-teal-200/70"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>{t.hero.callCta}: <strong className="tabular-nums font-semibold">{businessData.contact.phoneFormatted}</strong></span>
              </a>
            </div>

            {/* Verified Transparency Footnote */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200/80 w-full">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Public business details verified against Google Maps listing. Evening appointments available.</span>
            </div>

          </div>

          {/* Right Column (5 cols): High-Fidelity Dental Operatory Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-900">
              <img
                src={clinicImages.hero}
                alt="Teeth Care Dental Clinic modern hygienic treatment suite and consultation chair in Karachi"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Card Scrim Overlay with Clinic Details */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-md flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Open Evenings</div>
                    <div className="text-slate-600 text-[11px]">Mon–Sat: 1:00 PM – 11:30 PM (Fri 4 PM)</div>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-medium text-[11px] whitespace-nowrap transition-colors"
                >
                  View Hours
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof & Highlights Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs text-slate-500 font-medium">Google Rating</div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums flex items-center gap-1.5 mt-1 font-display">
              <span>5.0</span>
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div className="text-xs text-teal-700 mt-1 font-medium">15+ Verified reviews</div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs text-slate-500 font-medium">Location</div>
            <div className="text-base font-bold text-slate-900 mt-1 font-display truncate">
              Gulshan-e-Iqbal
            </div>
            <div className="text-xs text-slate-600 mt-1">Block 13C, Karachi</div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs text-slate-500 font-medium">Evening Schedule</div>
            <div className="text-base font-bold text-slate-900 mt-1 font-display tabular-nums">
              Until 11:30 PM
            </div>
            <div className="text-xs text-slate-600 mt-1">Convenient after-work care</div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xs text-slate-500 font-medium">Patient Consultations</div>
            <div className="text-base font-bold text-slate-900 mt-1 font-display">
              Open Communication
            </div>
            <div className="text-xs text-slate-600 mt-1">Transparent guidance</div>
          </div>
        </div>

      </div>
    </section>
  );
};
