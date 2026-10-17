import React, { useState } from 'react';
import { Maximize2, X, Info } from 'lucide-react';
import { Language, translations } from '../data/translations';
import { clinicImages } from '../assets/images';

interface GalleryProps {
  currentLang: Language;
}

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

export const Gallery: React.FC<GalleryProps> = ({ currentLang }) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const t = translations[currentLang];

  const galleryItems: GalleryItem[] = [
    {
      id: 'suite',
      src: clinicImages.hero,
      title: t.gallery.caption1,
      subtitle: 'Modern ergonomic dental chair and clean operatory lighting.',
    },
    {
      id: 'reception',
      src: clinicImages.about,
      title: t.gallery.caption2,
      subtitle: 'Comfortable waiting area and consultation space for patients.',
    },
    {
      id: 'instruments',
      src: clinicImages.instruments,
      title: t.gallery.caption3,
      subtitle: 'Strict autoclave sanitization and precision medical-grade tools.',
    },
    {
      id: 'operatory',
      src: clinicImages.operatory,
      title: t.gallery.caption4,
      subtitle: 'Comprehensive diagnostic monitors and clinical care environment.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            {t.gallery.tagline}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display">
            {t.gallery.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.gallery.subheading}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer shadow-xs aspect-4/3"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveImage(item);
                }
              }}
              aria-label={`View enlarged photo of ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="flex items-center justify-between gap-2 text-white">
                  <h3 className="text-sm font-semibold leading-tight">{item.title}</h3>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:bg-teal-500 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{t.gallery.notice} Replaceable with clinic-specific photography upon on-site verification.</span>
        </div>

      </div>

      {/* Accessible Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activeImage.src}
              alt={activeImage.title}
              className="w-full max-h-[75vh] object-contain bg-black"
              referrerPolicy="no-referrer"
            />

            <div className="p-5 bg-slate-900 text-white border-t border-slate-800">
              <h3 className="text-base font-bold text-white font-display">
                {activeImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {activeImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
