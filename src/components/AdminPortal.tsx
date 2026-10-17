import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  X,
  Search,
  Filter,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Plus,
  Download,
  Calendar,
  User,
  FileText,
  Eye,
  EyeOff,
  Stethoscope,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { businessData } from '../data/business';

export interface AppointmentRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  additionalMessage?: string;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  doctorNotes?: string;
}

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REQUIRED_PASSWORD = "Muntazim99";
const STORAGE_KEY = 'tc_appointment_requests';
const AUTH_KEY = 'tc_doctor_auth_session';

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Appointments data
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  // Manual new appointment modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '6:00 PM – 9:00 PM (Evening)',
    treatment: 'General Dental Consultation',
    additionalMessage: '',
    doctorNotes: '',
    status: 'confirmed' as const,
  });

  // Check existing session
  useEffect(() => {
    const session = sessionStorage.getItem(AUTH_KEY);
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load appointments
  const loadAppointments = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed: AppointmentRecord[] = JSON.parse(data);
        // Normalize any items that don't have a status
        const normalized = parsed.map((item) => ({
          ...item,
          status: item.status || 'pending',
        }));
        setAppointments(normalized);
      } else {
        setAppointments([]);
      }
    } catch {
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  const saveAppointments = (updated: AppointmentRecord[]) => {
    setAppointments(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === REQUIRED_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      setLoginError(null);
      setPasswordInput('');
      loadAppointments();
    } else {
      setLoginError("Incorrect password. Please verify the practitioner access key.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
    setPasswordInput('');
    setLoginError(null);
  };

  // Status update
  const handleUpdateStatus = (id: string, newStatus: AppointmentRecord['status']) => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    saveAppointments(updated);
  };

  // Save doctor notes
  const handleSaveNotes = (id: string) => {
    const updated = appointments.map((app) =>
      app.id === id ? { ...app, doctorNotes: tempNotes } : app
    );
    saveAppointments(updated);
    setEditingNotesId(null);
    setTempNotes('');
  };

  // Delete appointment
  const handleDeleteAppointment = (id: string) => {
    if (window.confirm(`Are you sure you want to remove appointment ${id}?`)) {
      const updated = appointments.filter((app) => app.id !== id);
      saveAppointments(updated);
    }
  };

  // Manual Add
  const handleAddNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.fullName.trim() || !newPatient.phone.trim()) {
      alert("Please provide at least a patient name and phone number.");
      return;
    }

    const newRecord: AppointmentRecord = {
      id: `TC-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      ...newPatient,
    };

    const updated = [newRecord, ...appointments];
    saveAppointments(updated);
    setShowAddModal(false);
    setNewPatient({
      fullName: '',
      phone: '',
      email: '',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '6:00 PM – 9:00 PM (Evening)',
      treatment: 'General Dental Consultation',
      additionalMessage: '',
      doctorNotes: '',
      status: 'confirmed',
    });
  };

  // Seed sample appointments for quick testing
  const handleSeedSamples = () => {
    const sampleRecords: AppointmentRecord[] = [
      {
        id: 'TC-948201',
        fullName: 'Muhammad Usman',
        phone: '0333 2149581',
        email: 'usman.khi@gmail.com',
        preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        preferredTime: '6:00 PM – 9:00 PM (Evening)',
        treatment: 'Teeth Scaling & Polishing',
        additionalMessage: 'Mild gum bleeding when brushing. Need routine cleaning.',
        submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'confirmed',
        doctorNotes: 'Confirmed for 7:30 PM slot. Patient requested gentle ultrasonic scaling.',
      },
      {
        id: 'TC-948202',
        fullName: 'Ayesha Siddiqui',
        phone: '0300 8291433',
        email: '',
        preferredDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        preferredTime: '9:00 PM – 11:30 PM (Late Evening)',
        treatment: 'Root Canal Treatment (RCT)',
        additionalMessage: 'Sharp pain in lower left molar when drinking cold water.',
        submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        status: 'pending',
        doctorNotes: '',
      },
      {
        id: 'TC-948203',
        fullName: 'Bilal Ahmed Khan',
        phone: '0345 3192084',
        email: 'bilal.khan@live.com',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '3:00 PM – 6:00 PM (Early Evening)',
        treatment: 'Dental Fillings (Composite / GIC)',
        additionalMessage: 'Lost an old silver filling while eating lunch.',
        submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'completed',
        doctorNotes: 'Completed shade A2 composite restoration on tooth #36.',
      },
    ];

    saveAppointments([...sampleRecords, ...appointments]);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) {
      alert("No appointments available to export.");
      return;
    }

    const headers = [
      "ID",
      "Patient Name",
      "Phone",
      "Email",
      "Preferred Date",
      "Time Window",
      "Treatment",
      "Status",
      "Doctor Notes",
      "Submitted At"
    ];

    const rows = appointments.map((app) => [
      app.id,
      `"${app.fullName.replace(/"/g, '""')}"`,
      `"${app.phone}"`,
      `"${app.email || ''}"`,
      app.preferredDate,
      `"${app.preferredTime}"`,
      `"${app.treatment}"`,
      app.status,
      `"${(app.doctorNotes || '').replace(/"/g, '""')}"`,
      app.submittedAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TeethCare_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filtered appointments
  const filtered = appointments.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.treatment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white text-slate-900 rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-white">
                  Doctor & Clinic Administration Portal
                </h2>
                {isAuthenticated && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                    Authenticated
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {businessData.clinicName} · Gulshan-e-Iqbal, Karachi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Lock portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area: Login Screen vs Dashboard */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center my-auto">
            <div className="w-14 h-14 bg-teal-50 text-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-100 shadow-2xs">
              <KeyRound className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
              Practitioner Access Verification
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              This portal is restricted to authorized dental surgeons and clinic staff of Teeth Care Dental Clinic.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin / Doctor Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (loginError) setLoginError(null);
                    }}
                    placeholder="Enter password"
                    autoFocus
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {loginError && (
                  <p className="mt-2 text-xs text-rose-600 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Verify Password & Open Portal</span>
              </button>
            </form>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-400">
              Teeth Care Dental Clinic Reception &bull; Shop 1, Block 13C, Gulshan-e-Iqbal
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Quick KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-medium text-slate-500">Total Bookings</div>
                <div className="text-2xl font-bold text-slate-900 font-display tabular-nums mt-1">
                  {totalCount}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Recorded in database</div>
              </div>

              <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl">
                <div className="text-xs font-semibold text-amber-800">Pending Review</div>
                <div className="text-2xl font-bold text-amber-950 font-display tabular-nums mt-1">
                  {pendingCount}
                </div>
                <div className="text-[11px] text-amber-700 mt-0.5">Needs reception call</div>
              </div>

              <div className="p-4 bg-sky-50/80 border border-sky-200/80 rounded-xl">
                <div className="text-xs font-semibold text-sky-800">Confirmed Slots</div>
                <div className="text-2xl font-bold text-sky-950 font-display tabular-nums mt-1">
                  {confirmedCount}
                </div>
                <div className="text-[11px] text-sky-700 mt-0.5">Scheduled on clinic roster</div>
              </div>

              <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-xl">
                <div className="text-xs font-semibold text-emerald-800">Completed</div>
                <div className="text-2xl font-bold text-emerald-950 font-display tabular-nums mt-1">
                  {completedCount}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">Treated & discharged</div>
              </div>
            </div>

            {/* Action Bar: Search, Status Filter, Walk-in, CSV */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patient, phone, ID, or treatment..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status Segmented Controls */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto text-xs shrink-0">
                {[
                  { id: 'all', label: `All (${totalCount})` },
                  { id: 'pending', label: `Pending (${pendingCount})` },
                  { id: 'confirmed', label: `Confirmed (${confirmedCount})` },
                  { id: 'completed', label: `Completed (${completedCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      statusFilter === tab.id
                        ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Add Walk-in & Export CSV */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Appointment</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
                  title="Export appointments to CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>

                <button
                  onClick={loadAppointments}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Refresh list"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Appointments List / Table */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <User className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-semibold text-slate-800">
                    No matching patient appointments found
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {searchQuery
                      ? "Try adjusting your search criteria."
                      : "No appointment requests logged in the reception database yet."}
                  </p>
                  {appointments.length === 0 && (
                    <div className="pt-2">
                      <button
                        onClick={handleSeedSamples}
                        className="px-4 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
                      >
                        Load Sample Patient Appointments (Demo)
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                filtered.map((app) => {
                  const cleanPhone = app.phone.replace(/[\s\-\(\)]/g, '');
                  // Format WhatsApp phone for Pakistan (+92)
                  const waPhone = cleanPhone.startsWith('0')
                    ? `92${cleanPhone.slice(1)}`
                    : cleanPhone.startsWith('+')
                    ? cleanPhone.slice(1)
                    : cleanPhone.startsWith('92')
                    ? cleanPhone
                    : `92${cleanPhone}`;

                  const waMessage = encodeURIComponent(
                    `Hello ${app.fullName}, this is Teeth Care Dental Clinic in Gulshan-e-Iqbal, Karachi. Regarding your appointment request (${app.id}) for ${app.treatment} on ${app.preferredDate} (${app.preferredTime}). Please let us know if this time suits you.`
                  );

                  return (
                    <div
                      key={app.id}
                      className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-xl shadow-2xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-start justify-between gap-4"
                    >
                      {/* Left: Patient Details & Treatment Info */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm sm:text-base font-bold text-slate-900 font-display">
                            {app.fullName}
                          </span>
                          <span className="font-mono text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/70">
                            {app.id}
                          </span>

                          {/* Status Pill */}
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app.id, e.target.value as any)}
                            className={`text-xs font-semibold rounded-md px-2 py-1 border transition-colors cursor-pointer ${
                              app.status === 'confirmed'
                                ? 'bg-sky-50 text-sky-800 border-sky-300'
                                : app.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : app.status === 'cancelled'
                                ? 'bg-slate-100 text-slate-600 border-slate-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="pending">Pending Confirmation</option>
                            <option value="confirmed">Confirmed Slot</option>
                            <option value="completed">Completed / Treated</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        {/* Contact details */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1 font-medium text-slate-900">
                            <Phone className="w-3.5 h-3.5 text-teal-600" />
                            <a href={`tel:${cleanPhone}`} className="hover:underline tabular-nums">
                              {app.phone}
                            </a>
                          </span>

                          {app.email && (
                            <span className="text-slate-500">
                              {app.email}
                            </span>
                          )}

                          <span className="text-slate-400">·</span>

                          <span className="inline-flex items-center gap-1 text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-teal-600" />
                            <strong>{app.preferredDate}</strong> ({app.preferredTime})
                          </span>
                        </div>

                        {/* Treatment Requested */}
                        <div className="text-xs text-slate-700 pt-1">
                          <strong className="text-slate-900">Treatment:</strong> {app.treatment}
                        </div>

                        {/* Patient's Symptoms / Dental Concerns */}
                        {app.additionalMessage && (
                          <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200/60 italic">
                            "{app.additionalMessage}"
                          </div>
                        )}

                        {/* Doctor Notes Box */}
                        <div className="pt-1">
                          {editingNotesId === app.id ? (
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="text"
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Add clinical note (e.g. Tooth #46, follow-up needed)..."
                                className="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-teal-600 bg-white"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveNotes(app.id)}
                                className="px-2.5 py-1.5 bg-teal-600 text-white rounded-md text-xs font-semibold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingNotesId(null);
                                  setTempNotes('');
                                }}
                                className="px-2 py-1.5 text-slate-500 hover:text-slate-700 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs">
                              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="text-slate-500 font-medium">Doctor's Note:</span>
                              <span className="text-slate-700 flex-1">
                                {app.doctorNotes || <em className="text-slate-400">No clinical notes added yet</em>}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingNotesId(app.id);
                                  setTempNotes(app.doctorNotes || '');
                                }}
                                className="text-[11px] text-teal-700 hover:underline font-medium"
                              >
                                {app.doctorNotes ? 'Edit' : '+ Add Note'}
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="text-[10px] text-slate-400 pt-0.5">
                          Submitted on {new Date(app.submittedAt).toLocaleDateString()} at{' '}
                          {new Date(app.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      {/* Right: Quick Operational Actions */}
                      <div className="flex lg:flex-col items-center justify-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        {/* Call Button */}
                        <a
                          href={`tel:${cleanPhone}`}
                          className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors w-full"
                          title="Call patient phone"
                        >
                          <Phone className="w-3.5 h-3.5 text-teal-700" />
                          <span>Call Patient</span>
                        </a>

                        {/* WhatsApp Message Button */}
                        <a
                          href={`https://wa.me/${waPhone}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors w-full"
                          title="Send prefilled WhatsApp confirmation message"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                          <span>WhatsApp</span>
                        </a>

                        {/* Quick Confirm Button if pending */}
                        {app.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'confirmed')}
                            className="hidden lg:inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors w-full cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-700" />
                            <span>Confirm Slot</span>
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteAppointment(app.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete appointment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* Footer Bar */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div>
            Password protected: <span className="font-mono text-slate-700 font-semibold">Muntazim99</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Portal
          </button>
        </div>
      </div>

      {/* Modal: Add Manual Walk-In Appointment */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Record Walk-In / Telephone Appointment
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={newPatient.fullName}
                  onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })}
                  placeholder="e.g. Asad Ullah"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    placeholder="0336 1234567"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    placeholder="patient@example.com"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={newPatient.preferredDate}
                    onChange={(e) => setNewPatient({ ...newPatient, preferredDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={newPatient.preferredTime}
                    onChange={(e) => setNewPatient({ ...newPatient, preferredTime: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="1:00 PM – 3:00 PM (Afternoon)">1:00 PM – 3:00 PM (Afternoon)</option>
                    <option value="3:00 PM – 6:00 PM (Early Evening)">3:00 PM – 6:00 PM (Early Evening)</option>
                    <option value="6:00 PM – 9:00 PM (Evening)">6:00 PM – 9:00 PM (Evening)</option>
                    <option value="9:00 PM – 11:30 PM (Late Evening)">9:00 PM – 11:30 PM (Late Evening)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Treatment</label>
                <select
                  value={newPatient.treatment}
                  onChange={(e) => setNewPatient({ ...newPatient, treatment: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="General Dental Consultation">General Dental Consultation</option>
                  {businessData.treatments.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Notes / Symptoms</label>
                <textarea
                  rows={2}
                  value={newPatient.additionalMessage}
                  onChange={(e) => setNewPatient({ ...newPatient, additionalMessage: e.target.value })}
                  placeholder="Notes from telephone discussion or walk-in inquiry..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-xs"
                >
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
