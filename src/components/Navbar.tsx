import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Globe, Calendar } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onToggleLang: () => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onToggleLang, onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.treatments, href: '#treatments' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Primary Action & Lang) */}
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-decoration-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C7.5 2 4 4.5 4 8c0 2.2 1.3 4.2 3.3 5.4l-.8 7.6c-.1.6.4 1 1 1 .3 0 .6-.1.8-.4L10 19.3c.7.2 1.3.3 2 .3s1.3-.1 2-.3l1.7 2.3c.2.3.5.4.8.4.6 0 1.1-.4 1-1l-.8-7.6c2-1.2 3.3-3.2 3.3-5.4 0-3.5-3.5-6-8-6zm0 2c3.3 0 6 1.8 6 4 0 1.7-1.4 3.2-3.5 3.8l.6 5.8-1.5-2c-.5-.7-1.4-.9-2.2-.7-.5.1-.9.1-1.4.1s-.9 0-1.4-.1c-.8-.2-1.7 0-2.2.7l-1.5 2 .6-5.8C7.4 11.2 6 9.7 6 8c0-2.2 2.7-4 6-4z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                {currentLang === 'ur' ? businessData.clinicNameUrdu : businessData.clinicName}
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline-block">
                Gulshan-e-Iqbal, Karachi
              </span>
            </div>
          </a>

          {/* Zone 2: Clean 4–5 single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-teal-600 focus:outline-hidden focus-visible:ring-1 focus-visible:ring-teal-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA Button + Language switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={onToggleLang}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer"
              aria-label="Switch between English and Urdu"
              title="Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentLang === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Direct Phone Call Button (desktop) */}
            <a
              href={`tel:${businessData.contact.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50/50 rounded-lg transition-colors border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span className="tabular-nums">{businessData.contact.phoneFormatted}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookAppointment}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-teal-700 hover:bg-teal-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${businessData.contact.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-medium text-teal-800 bg-teal-50 rounded-lg border border-teal-200"
            >
              <Phone className="w-4 h-4 text-teal-600" />
              <span>{businessData.contact.phoneFormatted}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs"
            >
              {t.nav.bookAppointment}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
