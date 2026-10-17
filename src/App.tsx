/**
 * Teeth Care Dental Clinic, Karachi - Official Website
 * Verified business information, responsive booking form, and bilingual (English/Urdu) support.
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Treatments } from './components/Treatments';
import { WhyContact } from './components/WhyContact';
import { Team } from './components/Team';
import { Reviews } from './components/Reviews';
import { Gallery } from './components/Gallery';
import { AppointmentForm } from './components/AppointmentForm';
import { HoursAndLocation } from './components/HoursAndLocation';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Language } from './data/translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [selectedTreatment, setSelectedTreatment] = useState<string>('General Dental Consultation');

  const toggleLanguage = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const scrollToBooking = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatment(treatmentName);
    }
    const bookElement = document.getElementById('book');
    if (bookElement) {
      bookElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir={currentLang === 'ur' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-slate-50 text-slate-900 ${
        currentLang === 'ur' ? 'font-urdu' : 'font-sans'
      }`}
    >
      {/* Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={toggleLanguage}
        onBookClick={() => scrollToBooking()}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onBookClick={() => scrollToBooking()}
        />

        {/* About Clinic Section */}
        <About
          currentLang={currentLang}
          onBookClick={() => scrollToBooking()}
        />

        {/* Treatments Section */}
        <Treatments
          currentLang={currentLang}
          onSelectTreatmentForBooking={(treatmentName) => scrollToBooking(treatmentName)}
        />

        {/* Why Patients Choose Consultations */}
        <WhyContact
          currentLang={currentLang}
          onBookClick={() => scrollToBooking()}
        />

        {/* Doctor and Team Section (With neutral unverified notice) */}
        <Team currentLang={currentLang} />

        {/* Patient Reviews Section (Linked to verified Google Maps listing) */}
        <Reviews currentLang={currentLang} />

        {/* Clinic & Dental Care Gallery */}
        <Gallery currentLang={currentLang} />

        {/* Functional Front-End Appointment Request Form */}
        <AppointmentForm
          currentLang={currentLang}
          selectedTreatment={selectedTreatment}
          onClearTreatmentSelection={() => setSelectedTreatment('General Dental Consultation')}
        />

        {/* Hours & Location Section */}
        <HoursAndLocation currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileBottomBar
        currentLang={currentLang}
        onBookClick={() => scrollToBooking()}
      />
    </div>
  );
}
