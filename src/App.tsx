import { useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Star,
  Stethoscope,
  Users,
  Video,
  X,
  XCircle,
} from "lucide-react";

/* ---------------------------------- Dados --------------------------------- */

const DOCTORS = [
  {
    id: 1,
    name: "Dra. Camila Ferreira",
    specialty: "Cardiologia",
    rating: 4.9,
    reviews: 312,
    price: 280,
    initials: "CF",
    color: "#00FF66",
    nextSlot: "Hoje, 14:30",
    telemedicine: true,
  },
  {
    id: 2,
    name: "Dr. Rafael Mendes",
    specialty: "Dermatologia",
    rating: 4.8,
    reviews: 198,
    price: 240,
    initials: "RM",
    color: "#00F0FF",
    nextSlot: "Hoje, 16:00",
    telemedicine: true,
  },
  {
    id: 3,
    name: "Dra. Juliana Paiva",
    specialty: "Pediatria",
    rating: 5.0,
    reviews: 421,
    price: 260,
    initials: "JP",
    color: "#00FF66",
    nextSlot: "Amanhã, 09:00",
    telemedicine: false,
  },
  {
    id: 4,
    name: "Dr. André Nogueira",
    specialty: "Ortopedia",
    rating: 4.7,
    reviews: 156,
    price: 320,
    initials: "AN",
    color: "#00F0FF",
    nextSlot: "Amanhã, 10:30",
    telemedicine: false,
  },
  {
    id: 5,
    name: "Dra. Beatriz Lins",
    specialty: "Neurologia",
    rating: 4.9,
    reviews: 267,
    price: 350,
    initials: "BL",
    color: "#00FF66",
    nextSlot: "Qui, 08:00",
    telemedicine: true,
  },
  {
    id: 6,
    name: "Dr. Tiago Salles",
    specialty: "Ginecologia",
    rating: 4.8,
    reviews: 289,
    price: 290,
    initials: "TS",
    color: "#00F0FF",
    nextSlot: "Qui, 11:00",
    telemedicine: true,
  },
];

const SPECIALTIES = [
  "Todas",
  "Cardiologia",
  "Dermatologia",
  "Pediatria",
  "Ortopedia",
  "Neurologia",
  "Ginecologia",
];

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

const APPOINTMENTS = [
  {
    id: 1,
    doctor: "Dra. Camila Ferreira",
    specialty: "Cardiologia",
    time: "14:30",
    date: "Hoje",
    type: "Telemedicina",
    status: "confirmada",
    initials: "CF",
    color: "#00FF66",
  },
  {
    id: 2,
    doctor: "Dr. Rafael Mendes",
    specialty: "Dermatologia",
    time: "16:00",
    date: "Hoje",
    type: "Presencial",
    status: "confirmada",
    initials: "RM",
    color: "#00F0FF",
  },
  {
    id: 3,
    doctor: "Dra. Juliana Paiva",
    specialty: "Pediatria",
    time: "09:00",
    date: "Amanhã",
    type: "Presencial",
    status: "pendente",
    initials: "JP",
    color: "#00FF66",
  },
  {
    id: 4,
    doctor: "Dra. Beatriz Lins",
    specialty: "Neurologia",
    time: "08:00",
    date: "Quinta",
    type: "Telemedicina",
    status: "confirmada",
    initials: "BL",
    color: "#00F0FF",
  },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "agendar", label: "Agendar", icon: Calendar },
  { id: "consultas", label: "Minhas Consultas", icon: CalendarCheck },
  { id: "medicos", label: "Médicos", icon: Stethoscope },
  { id: "pacientes", label: "Pacientes", icon: Users },
  { id: "prontuario", label: "Prontuário", icon: FileText },
];

const WEEKDAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

/* --------------------------------- Helpers -------------------------------- */

function getCurrentWeek() {
  const today = new Date();
  const mondayOffset = (today.getDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - mondayOffset + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/* --------------------------------- Component -------------------------------- */

export default function ElleApp() {
  const [activeNav, setActiveNav] = useState("agendar");
  const [specialtyFilter, setSpecialtyFilter] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const [week] = useState<Date[]>(getCurrentWeek);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDoctor, setBookingDoctor] = useState<
    (typeof DOCTORS)[number] | null
  >(null);
  const [bookingType, setBookingType] = useState<"presencial" | "tele">(
    "presencial"
  );
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((d) => {
      const matchSpecialty =
        specialtyFilter === "Todas" || d.specialty === specialtyFilter;
      const matchSearch =
        searchQuery.trim() === "" ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSpecialty && matchSearch;
    });
  }, [specialtyFilter, searchQuery]);

  const monthLabel = useMemo(() => {
    const label = selectedDay.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
  }, [selectedDay]);

  function openBooking(doctor: (typeof DOCTORS)[number]) {
    setBookingDoctor(doctor);
    setBookingStep(1);
    setSelectedTime(null);
    setBookingConfirmed(false);
    setModalOpen(true);
  }

  function closeBooking() {
    setModalOpen(false);
    setTimeout(() => {
      setBookingStep(1);
      setBookingConfirmed(false);
    }, 200);
  }

  const steps = ["Data & Hora", "Modalidade", "Confirmação"];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#03141A] font-sans text-slate-200 antialiased">
      {/* ------------------------------- Sidebar ------------------------------- */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-[#0B2028] lg:flex">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF66]/10 ring-1 ring-[#00FF66]/40">
            <HeartPulse className="h-5 w-5 text-[#00FF66]" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-white">
              elle<span className="text-[#00FF66]">.</span>saúde
            </p>
            <p className="text-[11px] uppercase tracking-widest text-slate-500">
              Agendamento médico
            </p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-[#00FF66]/10 text-[#00FF66] ring-1 ring-[#00FF66]/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 h-5 w-5 ${
                    active ? "text-[#00FF66]" : "text-slate-500 group-hover:text-[#00F0FF]"
                  }`}
                />
                {item.label}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/5 px-3 py-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
            <Settings className="h-4 w-4" /> Configurações
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>

        <div className="m-3 rounded-2xl border border-[#00F0FF]/20 bg-gradient-to-br from-[#00F0FF]/10 to-transparent p-4">
          <p className="text-sm font-semibold text-white">Plano Pilot</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Telemedicina ilimitada e lembretes inteligentes ativos.
          </p>
          <button className="mt-3 w-full rounded-lg bg-[#00F0FF]/15 py-2 text-xs font-semibold text-[#00F0FF] ring-1 ring-[#00F0FF]/30 transition hover:bg-[#00F0FF]/25">
            Gerenciar plano
          </button>
        </div>
      </aside>

      {/* -------------------------------- Main -------------------------------- */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center gap-4 border-b border-white/5 bg-[#0B2028]/60 px-4 py-4 backdrop-blur sm:px-6">
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar médico, especialidade..."
              className="w-full rounded-xl border border-white/10 bg-[#03141A] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-[#00F0FF]/50 focus:ring-2 focus:ring-[#00F0FF]/20"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-xl border border-white/10 bg-[#03141A] p-2.5 text-slate-400 transition hover:border-[#00F0FF]/40 hover:text-[#00F0FF]">
              <Bell className="h-4.5 w-4.5 h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#00FF66] ring-2 ring-[#0B2028]" />
            </button>
            <button className="rounded-xl border border-white/10 bg-[#03141A] p-2.5 text-slate-400 transition hover:border-[#00F0FF]/40 hover:text-[#00F0FF]">
              <MessageSquare className="h-5 w-5" />
            </button>
            <div className="hidden items-center gap-3 border-l border-white/10 pl-3 sm:flex">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Leonardo Celestino</p>
                <p className="text-xs text-slate-500">Paciente · Pilot</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00FF66] to-[#00F0FF] text-sm font-bold text-[#03141A]">
                LC
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {/* Título + CTA */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Agendar consulta
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Escolha o especialista, o dia e o horário ideal para você.
              </p>
            </div>
            <button
              onClick={() => openBooking(filteredDoctors[0] ?? DOCTORS[0])}
              className="flex items-center gap-2 rounded-xl bg-[#00FF66] px-5 py-3 text-sm font-bold text-[#03141A] shadow-lg shadow-[#00FF66]/20 transition hover:brightness-110 active:scale-95"
            >
              <Plus className="h-4 w-4" strokeWidth={3} />
              Nova consulta
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              {
                label: "Consultas hoje",
                value: "2",
                icon: CalendarCheck,
                accent: "#00FF66",
                sub: "Próxima às 14:30",
              },
              {
                label: "Próximas consultas",
                value: "4",
                icon: Calendar,
                accent: "#00F0FF",
                sub: "Nos próximos 7 dias",
              },
              {
                label: "Telemedicina",
                value: "3",
                icon: Video,
                accent: "#00F0FF",
                sub: "Atendimentos online",
              },
              {
                label: "Taxa de presença",
                value: "98%",
                icon: Activity,
                accent: "#00FF66",
                sub: "Últimos 12 meses",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/5 bg-[#0B2028] p-4 transition hover:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {stat.label}
                    </p>
                    <div
                      className="rounded-lg p-2"
                      style={{ backgroundColor: `${stat.accent}14` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: stat.accent }} />
                    </div>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Calendário semanal */}
          <section className="mt-6 rounded-2xl border border-white/5 bg-[#0B2028] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#00F0FF]/10 p-2">
                  <Calendar className="h-4 w-4 text-[#00F0FF]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">{monthLabel}</h2>
                  <p className="text-xs text-slate-500">Semana atual</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-[#00F0FF]/40 hover:text-[#00F0FF]">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-[#00FF66]/40 hover:text-[#00FF66]">
                  Hoje
                </button>
                <button className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-[#00F0FF]/40 hover:text-[#00F0FF]">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-2">
              {week.map((day, i) => {
                const selected = isSameDay(day, selectedDay);
                const isToday = isSameDay(day, new Date());
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDay(day)}
                    className={`flex flex-col items-center rounded-xl border py-3 transition-all ${
                      selected
                        ? "border-[#00FF66]/60 bg-[#00FF66]/10 shadow-lg shadow-[#00FF66]/10"
                        : "border-white/5 bg-[#03141A]/60 hover:border-[#00F0FF]/30"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-medium uppercase tracking-wider ${
                        selected ? "text-[#00FF66]" : "text-slate-500"
                      }`}
                    >
                      {WEEKDAY_LABELS[i]}
                    </span>
                    <span
                      className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        isToday
                          ? "bg-[#00F0FF] text-[#03141A]"
                          : selected
                          ? "text-[#00FF66]"
                          : "text-white"
                      }`}
                    >
                      {day.getDate()}
                    </span>
                    <span
                      className={`mt-1.5 h-1 w-1 rounded-full ${
                        i % 2 === 0 ? "bg-[#00FF66]" : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Horários */}
            <div className="mt-5 border-t border-white/5 pt-5">
              <div className="mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00F0FF]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Horários disponíveis ·{" "}
                  {selectedDay.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                {TIME_SLOTS.map((slot, i) => {
                  const unavailable = (i * 7 + selectedDay.getDate()) % 5 === 0;
                  const selected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      disabled={unavailable}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-lg border py-2 text-xs font-semibold transition-all ${
                        unavailable
                          ? "cursor-not-allowed border-white/5 text-slate-600 line-through"
                          : selected
                          ? "border-[#00FF66] bg-[#00FF66] text-[#03141A] shadow-md shadow-[#00FF66]/30"
                          : "border-white/10 bg-[#03141A]/60 text-slate-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF]"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Especialidades + Médicos */}
          <section className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white">
                Especialistas disponíveis
              </h2>
              <p className="text-xs text-slate-500">
                {filteredDoctors.length} resultado(s)
              </p>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {SPECIALTIES.map((spec) => {
                const active = specialtyFilter === spec;
                return (
                  <button
                    key={spec}
                    onClick={() => setSpecialtyFilter(spec)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                      active
                        ? "border-[#00FF66] bg-[#00FF66] text-[#03141A]"
                        : "border-white/10 bg-[#0B2028] text-slate-400 hover:border-[#00F0FF]/40 hover:text-[#00F0FF]"
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredDoctors.map((doctor) => (
                <article
                  key={doctor.id}
                  className="group rounded-2xl border border-white/5 bg-[#0B2028] p-5 transition-all hover:-translate-y-0.5 hover:border-[#00F0FF]/30 hover:shadow-xl hover:shadow-[#00F0FF]/5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-[#03141A]"
                      style={{
                        background: `linear-gradient(135deg, ${doctor.color}, ${doctor.color}88)`,
                      }}
                    >
                      {doctor.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold text-white">
                        {doctor.name}
                      </h3>
                      <p className="text-xs font-medium text-[#00F0FF]">
                        {doctor.specialty}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                        <Star className="h-3.5 w-3.5 fill-[#00FF66] text-[#00FF66]" />
                        <span className="font-semibold text-white">
                          {doctor.rating.toFixed(1)}
                        </span>
                        <span>({doctor.reviews} avaliações)</span>
                      </div>
                    </div>
                    {doctor.telemedicine && (
                      <span className="flex items-center gap-1 rounded-full bg-[#00F0FF]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#00F0FF] ring-1 ring-[#00F0FF]/30">
                        <Video className="h-3 w-3" /> Online
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Próximo horário
                      </p>
                      <p className="text-xs font-semibold text-[#00FF66]">
                        {doctor.nextSlot}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">
                        Consulta
                      </p>
                      <p className="text-sm font-bold text-white">
                        {formatBRL(doctor.price)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openBooking(doctor)}
                    className="mt-4 w-full rounded-xl border border-[#00FF66]/40 bg-[#00FF66]/10 py-2.5 text-sm font-bold text-[#00FF66] transition-all hover:bg-[#00FF66] hover:text-[#03141A] active:scale-95"
                  >
                    Agendar consulta
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Próximas consultas */}
          <section className="mt-6 rounded-2xl border border-white/5 bg-[#0B2028] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Próximas consultas</h2>
              <button className="text-xs font-semibold text-[#00F0FF] transition hover:underline">
                Ver todas
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {APPOINTMENTS.map((appt) => (
                <div
                  key={appt.id}
                  className="flex flex-wrap items-center gap-4 rounded-xl border border-white/5 bg-[#03141A]/60 p-4 transition hover:border-white/10"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-[#03141A]"
                    style={{ backgroundColor: appt.color }}
                  >
                    {appt.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {appt.doctor}
                    </p>
                    <p className="text-xs text-slate-500">{appt.specialty}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-[#00F0FF]" />
                    {appt.date}
                    <span className="text-slate-600">·</span>
                    <Clock className="h-3.5 w-3.5 text-[#00F0FF]" />
                    {appt.time}
                  </div>
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                      appt.type === "Telemedicina"
                        ? "bg-[#00F0FF]/10 text-[#00F0FF] ring-1 ring-[#00F0FF]/30"
                        : "bg-white/5 text-slate-300 ring-1 ring-white/10"
                    }`}
                  >
                    {appt.type === "Telemedicina" ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <MapPin className="h-3 w-3" />
                    )}
                    {appt.type}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      appt.status === "confirmada"