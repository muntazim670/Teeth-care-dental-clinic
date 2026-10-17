import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, AlertCircle, CheckCircle2 } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';

interface HoursAndLocationProps {
  currentLang: Language;
}

export const HoursAndLocation: React.FC<HoursAndLocationProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
  
  // Map JS Day to index in businessData.operatingHours (Monday=0 ... Sunday=6)
  const scheduleIndex = todayIndex === 0 ? 6 : todayIndex - 1;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            {t.location.tagline}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display">
            {t.location.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {businessData.address.fullAddress}
          </p>
        </div>

        {/* 2-Column Grid: Schedule & Contact on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (6 cols): Weekly Schedule & Contact Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Weekly Schedule Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {t.hours.heading}
                    </h3>
                    <div className="text-xs text-slate-500">Gulshan-e-Iqbal, Karachi</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  Karachi Time (PKT)
                </div>
              </div>

              {/* Day by Day List */}
              <div className="divide-y divide-slate-100">
                {businessData.operatingHours.map((schedule, idx) => {
                  const isToday = idx === scheduleIndex;
                  return (
                    <div
                      key={schedule.day}
                      className={`py-2.5 px-3 rounded-lg flex items-center justify-between text-xs sm:text-sm transition-colors ${
                        isToday ? 'bg-teal-50/80 font-semibold text-teal-950' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-24 sm:w-28">
                          {currentLang === 'ur' ? schedule.dayUrdu : schedule.day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 bg-teal-100/80 px-1.5 py-0.5 rounded">
                            Today
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        {schedule.hours ? (
                          <div className="tabular-nums font-medium">
                            {currentLang === 'ur' ? schedule.hoursUrdu : schedule.hours}
                            {schedule.notes && (
                              <div className="text-[11px] text-slate-500 font-normal">
                                {schedule.notes}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-slate-400 italic text-xs flex items-center gap-1 justify-end">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                            <span>{schedule.notes || 'Unverified'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call Ahead Notice */}
              <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
                <AlertCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {businessData.operatingHoursNotice[currentLang]}
                </p>
              </div>
            </div>

            {/* Quick Contact & Directions Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Direct Telephone Call</div>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    {businessData.contact.phoneFormatted}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${businessData.contact.phoneRaw}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>

                <a
                  href={businessData.maps.googleListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-700" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (6 cols): Location Details & Google Maps */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {businessData.clinicName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Block 13C, Gulshan-e-Iqbal, Karachi
                    </p>
                  </div>
                </div>

                <a
                  href={businessData.maps.googleListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200/60 mb-4 leading-relaxed">
                <strong className="text-slate-900 block mb-0.5">Physical Address:</strong>
                {businessData.address.fullAddress}
              </div>

              {/* Map View Frame */}
              <div className="rounded-xl overflow-hidden border border-slate-200 h-64 sm:h-72 relative bg-slate-100">
                <iframe
                  title="Teeth Care Dental Clinic Location Map in Gulshan-e-Iqbal Karachi"
                  src="https://maps.google.com/maps?q=Shop%201%2C%20Block%2013C%2C%20Gulshan-e-Iqbal%2C%20Karachi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              </div>

              {/* Map Footer Link */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Exact landmark in Block 13C, Gulshan-e-Iqbal</span>
                </div>

                <a
                  href={businessData.maps.googleListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
                >
                  <span>{t.location.getDirections}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* WhatsApp Verification Notice (Mandatory Rule #13: Hide WhatsApp button if unverified) */}
            {businessData.contact.whatsappNumber ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div className="text-xs text-emerald-900">
                  <strong>WhatsApp Available:</strong> Chat directly with reception.
                </div>
                <a
                  href={`https://wa.me/${businessData.contact.whatsappNumber}?text=${encodeURIComponent("Hello, I would like to ask about an appointment at Teeth Care Dental Clinic.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                >
                  Open WhatsApp
                </a>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>WhatsApp channel pending formal clinic verification. Please use direct phone call.</span>
                <a
                  href={`tel:${businessData.contact.phoneRaw}`}
                  className="text-teal-700 font-semibold hover:underline shrink-0 ml-2"
                >
                  Call +92 336 1879257
                </a>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
