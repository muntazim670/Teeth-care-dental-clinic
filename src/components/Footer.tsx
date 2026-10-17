import React, { useState } from 'react';
import { Phone, MapPin, ExternalLink, Shield, Lock, Stethoscope } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';
import { AdminPortal } from './AdminPortal';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const currentYear = new Date().getFullYear();
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 (5 cols): Clinic Wordmark & Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C7.5 2 4 4.5 4 8c0 2.2 1.3 4.2 3.3 5.4l-.8 7.6c-.1.6.4 1 1 1 .3 0 .6-.1.8-.4L10 19.3c.7.2 1.3.3 2 .3s1.3-.1 2-.3l1.7 2.3c.2.3.5.4.8.4.6 0 1.1-.4 1-1l-.8-7.6c2-1.2 3.3-3.2 3.3-5.4 0-3.5-3.5-6-8-6zm0 2c3.3 0 6 1.8 6 4 0 1.7-1.4 3.2-3.5 3.8l.6 5.8-1.5-2c-.5-.7-1.4-.9-2.2-.7-.5.1-.9.1-1.4.1s-.9 0-1.4-.1c-.8-.2-1.7 0-2.2.7l-1.5 2 .6-5.8C7.4 11.2 6 9.7 6 8c0-2.2 2.7-4 6-4z"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {currentLang === 'ur' ? businessData.clinicNameUrdu : businessData.clinicName}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutSummary}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 font-semibold text-teal-400">
                5.0 ★ Google Rating
              </span>
              <span>·</span>
              <span>15+ Verified Reviews</span>
            </div>
          </div>

          {/* Col 2 (2 cols): Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-teal-400 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-teal-400 transition-colors">
                  {t.nav.treatments}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-400 transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-teal-400 transition-colors">
                  {t.nav.bookAppointment}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 (3 cols): Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{businessData.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${businessData.contact.phoneRaw}`} className="text-white hover:text-teal-400 tabular-nums font-semibold">
                  {businessData.contact.phoneFormatted}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={businessData.maps.googleListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-400 hover:text-teal-300"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 4 (2 cols): Hours & Doctor Admin Access */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
              {t.footer.hours}
            </h4>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Mon–Thu: 1 PM – 11:30 PM</div>
              <div>Friday: 4 PM – 11:30 PM</div>
              <div>Saturday: 1 PM – 11:30 PM</div>
              <div className="text-slate-500 italic pt-1">Sunday: Call ahead</div>
            </div>

            {/* Doctor / Admin Portal Button */}
            <div className="pt-3">
              <button
                onClick={() => setIsAdminPortalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-teal-300 bg-slate-800 hover:bg-slate-750 hover:text-white rounded-lg border border-slate-700 hover:border-teal-500/50 transition-all cursor-pointer shadow-2xs group"
                title="Practitioner login to view appointment requests"
              >
                <Lock className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
                <span>Doctor / Admin Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Medical Disclaimer, Copyright & Practitioner Link */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-start gap-2 max-w-2xl">
            <Shield className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {businessData.disclaimer[currentLang]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0 text-slate-400">
            <span>
              © {currentYear} {businessData.clinicName}. {t.footer.rights}
            </span>
            <button
              onClick={() => setIsAdminPortalOpen(true)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
            >
              <Stethoscope className="w-3 h-3 text-teal-500" />
              <span>Doctor Login</span>
            </button>
          </div>
        </div>

      </div>

      {/* Password-Protected Doctor / Admin Portal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />
    </footer>
  );
};
