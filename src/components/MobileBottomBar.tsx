import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';

interface MobileBottomBarProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg safe-bottom"
      style={{ maxHeight: '64px' }}
      role="region"
      aria-label="Quick mobile actions"
    >
      <div className="flex items-center gap-3 max-w-md mx-auto">
        {/* Direct Call Action */}
        <a
          href={`tel:${businessData.contact.phoneRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
        >
          <Phone className="w-4 h-4 text-teal-700" />
          <span>{t.callBar.callUs}</span>
        </a>

        {/* Book Appointment Action */}
        <button
          onClick={onBookClick}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>{t.callBar.bookNow}</span>
        </button>
      </div>
    </div>
  );
};
