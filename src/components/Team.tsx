import React from 'react';
import { Phone, UserCheck, ShieldAlert, Award } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';

interface TeamProps {
  currentLang: Language;
}

export const Team: React.FC<TeamProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const { team } = businessData;

  return (
    <section id="team" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            {t.team.tagline}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display">
            {t.team.heading}
          </h2>
        </div>

        {/* Conditional Rendering: If team is NOT verified, show the required neutral notice */}
        {!team.isVerified || team.members.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/90 p-8 shadow-xs text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-6 h-6 text-slate-600" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t.team.noticeTitle}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {team.neutralNotice[currentLang]}
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 mb-6 flex items-start gap-3 text-left">
              <ShieldAlert className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <strong className="text-slate-800">Verification Policy:</strong> In compliance with medical transparency guidelines, practitioner profiles, PMDC registration numbers, and degree titles are only published once formally validated with the clinic.
              </div>
            </div>

            <a
              href={`tel:${businessData.contact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>Contact Clinic for Practitioner Information</span>
            </a>
          </div>
        ) : (
          /* Rendered when verified team members are configured in business.ts */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.members.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-slate-100 flex items-center justify-center text-slate-400">
                    <UserCheck className="w-16 h-16" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <div className="text-sm text-teal-700 font-medium">{member.role}</div>
                  <div className="text-xs text-slate-500 mt-1">{member.qualifications}</div>
                  {member.pmdcRegistration && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                      <Award className="w-3.5 h-3.5 text-teal-600" />
                      <span>PMDC No: {member.pmdcRegistration}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
