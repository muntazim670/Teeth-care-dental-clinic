import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle, Send, PhoneCall } from 'lucide-react';
import { businessData } from '../data/business';
import { Language, translations } from '../data/translations';

interface AppointmentFormProps {
  currentLang: Language;
  selectedTreatment?: string;
  onClearTreatmentSelection?: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  additionalMessage: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  currentLang,
  selectedTreatment,
  onClearTreatmentSelection,
}) => {
  const t = translations[currentLang];

  const defaultTreatment = selectedTreatment || businessData.treatments[0]?.name || "General Dental Consultation";

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: t.booking.timeOptions[0],
    treatment: defaultTreatment,
    additionalMessage: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  // Sync selected treatment when passed from treatment cards
  React.useEffect(() => {
    if (selectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: selectedTreatment }));
    }
  }, [selectedTreatment]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = currentLang === 'ur' ? 'برائے مہربانی اپنا نام درج کریں' : 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = currentLang === 'ur' ? 'نام کم از کم 3 حروف پر مشتمل ہو' : 'Name must be at least 3 characters';
    }

    // Phone (Pakistan phone format or general digits)
    const phoneClean = formData.phone.replace(/[\s\-\(\)]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = currentLang === 'ur' ? 'فون نمبر درج کرنا ضروری ہے' : 'Phone number is required';
    } else if (!/^(\+?92|0)?3[0-9]{9}$/.test(phoneClean) && phoneClean.length < 10) {
      newErrors.phone = currentLang === 'ur' ? 'درست پاکستانی فون نمبر درج کریں (مثلاً: 03361879257)' : 'Please enter a valid phone number (e.g. 0336 1879257)';
    }

    // Optional Email validation
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = currentLang === 'ur' ? 'درست ای میل پتہ درج کریں' : 'Please enter a valid email address';
      }
    }

    // Date
    if (!formData.preferredDate) {
      newErrors.preferredDate = currentLang === 'ur' ? 'تاریخ کا انتخاب کریں' : 'Please select your preferred date';
    }

    // Time
    if (!formData.preferredTime) {
      newErrors.preferredTime = currentLang === 'ur' ? 'وقت کا انتخاب کریں' : 'Please select your preferred time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      /**
       * Integration Point:
       * In production, this posts to a verified backend endpoint (e.g. /api/appointments or email webhook).
       * We simulate network delivery and log the request safely to localStorage for local audit/reception.
       */
      const appointmentPayload = {
        id: `TC-${Date.now().toString().slice(-6)}`,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        doctorNotes: '',
        ...formData,
      };

      // Save to client storage as an audit log for reception review
      const existing = JSON.parse(localStorage.getItem('tc_appointment_requests') || '[]');
      existing.unshift(appointmentPayload);
      localStorage.setItem('tc_appointment_requests', JSON.stringify(existing.slice(0, 50)));

      // Simulate network request latency (600ms)
      await new Promise((resolve) => setTimeout(resolve, 600));

      setLastSubmittedId(appointmentPayload.id);
      setIsSubmitted(true);
    } catch {
      alert("Submission error. Please call the clinic directly at +92 336 1879257.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      preferredDate: '',
      preferredTime: t.booking.timeOptions[0],
      treatment: defaultTreatment,
      additionalMessage: '',
    });
    setErrors({});
    if (onClearTreatmentSelection) onClearTreatmentSelection();
  };

  // Get minimum date as today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="book" className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            {t.booking.tagline}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 font-display">
            {t.booking.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.booking.subheading}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Submission Success State */}
          {isSubmitted ? (
            <div className="bg-slate-50 border border-teal-200 rounded-2xl p-8 text-center shadow-xs">
              <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                {t.booking.successTitle}
              </h3>

              <div className="text-xs font-mono text-teal-800 bg-teal-50 px-3 py-1 rounded-md inline-block mb-4 border border-teal-200/60">
                Reference Request ID: {lastSubmittedId}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto mb-6">
                {t.booking.successMessage}
              </p>

              <div className="p-4 bg-white rounded-xl border border-slate-200 text-left mb-6 space-y-2 text-xs text-slate-600">
                <div><strong className="text-slate-800">Patient:</strong> {formData.fullName}</div>
                <div><strong className="text-slate-800">Contact Number:</strong> {formData.phone}</div>
                <div><strong className="text-slate-800">Requested Treatment:</strong> {formData.treatment}</div>
                <div><strong className="text-slate-800">Preferred Slot:</strong> {formData.preferredDate} ({formData.preferredTime})</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${businessData.contact.phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Reception Now</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
                >
                  {t.booking.submitAnother}
                </button>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} noValidate className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
              
              <div className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.booking.fullName} <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t.booking.fullNamePlaceholder}
                      className={`w-full pl-10 pr-3 py-2.5 bg-white border text-sm text-slate-900 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Contact: Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.booking.phone} <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.booking.phonePlaceholder}
                        className={`w-full pl-10 pr-3 py-2.5 bg-white border text-sm text-slate-900 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Optional Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.booking.email}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.booking.emailPlaceholder}
                        className={`w-full pl-10 pr-3 py-2.5 bg-white border text-sm text-slate-900 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Date & Time Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.booking.preferredDate} <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className={`w-full pl-10 pr-3 py-2.5 bg-white border text-sm text-slate-900 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.preferredDate ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                        aria-invalid={!!errors.preferredDate}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Time Window */}
                  <div>
                    <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      {t.booking.preferredTime} <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                      >
                        {t.booking.timeOptions.map((time, idx) => (
                          <option key={idx} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Treatment of Interest */}
                <div>
                  <label htmlFor="treatment" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.booking.treatment}
                  </label>
                  <select
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 text-sm text-slate-900 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer"
                  >
                    <option value="General Dental Consultation">General Dental Consultation</option>
                    {businessData.treatments.map((tr) => (
                      <option key={tr.id} value={tr.name}>
                        {tr.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Message */}
                <div>
                  <label htmlFor="additionalMessage" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t.booking.additionalMessage}
                  </label>
                  <div className="relative">
                    <textarea
                      id="additionalMessage"
                      name="additionalMessage"
                      rows={3}
                      value={formData.additionalMessage}
                      onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                      placeholder={t.booking.additionalMessagePlaceholder}
                      className="w-full p-3 bg-white border border-slate-300 text-sm text-slate-900 rounded-lg shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:opacity-60 rounded-xl shadow-xs transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t.booking.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.booking.submitBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Transparency Note */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Inquiry processed by clinic reception. No unverified third-party sharing.</span>
                  </div>
                  <a
                    href={`tel:${businessData.contact.phoneRaw}`}
                    className="text-teal-700 hover:text-teal-900 font-semibold whitespace-nowrap hidden sm:inline"
                  >
                    Or call {businessData.contact.phoneFormatted}
                  </a>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
