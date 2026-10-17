import React from 'react';
import { Star, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';

interface ReviewsProps {
  currentLang: Language;
}

export const Reviews: React.FC<ReviewsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            {t.reviews.tagline}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display">
            {t.reviews.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.reviews.subheading}
          </p>
        </div>

        {/* Clean, Verified Review Card linking directly to Google Maps */}
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center">
          
          {/* Rating Score Large Display */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="text-5xl sm:text-6xl font-extrabold text-slate-950 tabular-nums font-display">
              {businessData.reputation.googleRating.toFixed(1)}
            </div>
            
            <div className="flex items-center gap-1.5 text-amber-500 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <div className="text-sm font-semibold text-slate-700">
              {t.reviews.reviewCountNote}
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-teal-700 mt-1 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>{businessData.clinicName} · Gulshan-e-Iqbal, Karachi</span>
            </div>
          </div>

          {/* Primary Action Button linking to authentic Google Maps reviews */}
          <div className="pt-2">
            <a
              href={businessData.maps.googleListingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors group"
            >
              <span>{t.reviews.readGoogleCta}</span>
              <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Ethical Transparency Note */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-start gap-3 text-left">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.reviews.disclaimer}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
