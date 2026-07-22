import { useState, useEffect } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  Building2,
  Calendar,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  GitBranch,
  GraduationCap,
  HeartPulse,
  Hospital,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  X,
  Zap,
} from "lucide-react";

const ASSISTANT_URL = "https://interativa.agentesnasaude.com.br/";
const COURSE_URL = "http://inscricoes.ufsc.br/cursosimulacao";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Curso", href: "#curso" },
  { label: "Equipe", href: "#equipe" },
  { label: "Parcerias", href: "#parcerias" },
  { label: "Contato", href: "#contato" },
];

const stats = [
  { icon: Calendar, value: "Desde 2020", label: "Pesquisa e desenvolvimento contínuo" },
  { icon: Hospital, value: "UFSC + HU", label: "Departamento de Enfermagem e Hospital Universitário" },
  { icon: GitBranch, value: "Cenários Ramificados", label: "Decisões clínicas com múltiplos desfechos" },
  { icon: ShieldCheck, value: "Segurança do Paciente", label: "Foco central em todas as simulações" },
];

const pillars = [
  {
    icon: MonitorPlay,
    title: "Simulação Virtual Imersiva",
    desc: "Ambientes clínicos digitais realistas que reproduzem situações do cuidado em saúde e enfermagem, sem risco ao paciente real.",
  },
  {
    icon: GitBranch,
    title: "Cenários Ramificados",
    desc: "Cada decisão do estudante abre novos caminhos narrativos, promovendo raciocínio clínico, pensamento crítico e aprendizado ativo.",
  },
  {
    icon: BrainCircuit,
    title: "Agente Inteligente InterAtiva",
    desc: "Assistente virtual que guia o aluno durante as simulações, oferecendo feedback contextual e suporte em tempo real.",
  },
  {
    icon: ClipboardCheck,
    title: "Protocolos de Segurança",
    desc: "Conteúdo alinhado às metas internacionais de segurança do paciente e às boas práticas do cuidado em enfermagem.",
  },
];

const partners = [
  { name: "LAPETEC", desc: "Laboratório de Pesquisa em Tecnologia" },
  { name: "GIATE", desc: "Grupo Interdisciplinar de Apoio à Telessaúde" },
  { name: "UFSC", desc: "Universidade Federal de Santa Catarina" },
  { name: "FAPESC", desc: "Fundação de Amparo à Pesquisa e Inovação de SC" },
];

export default function InterAtivaPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = chatOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [chatOpen]);

  return (
    <div className="min-h-screen bg-[#03141A] text-slate-200 antialiased selection:bg-[#00F0FF]/30 selection:text-white">
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradient-shift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes blink-dot { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up .8s ease-out both; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
        .pulse-ring::before { content: ""; position: absolute; inset: 0; border-radius: 9999px; background: rgba(0,240,255,.5); animation: pulse-ring 2s cubic-bezier(0,0,.2,1) infinite; }
        .blink-dot { animation: blink-dot 1.6s ease-in-out infinite; }
        .grid-bg { background-image: linear-gradient(rgba(0,240,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,.05) 1px, transparent 1px); background-size: 44px 44px; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ══════════ NAVBAR ══════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#03141A]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#00FF66] shadow-[0_0_24px_rgba(0,240,255,0.35)] transition-shadow group-hover:shadow-[0_0_36px_rgba(0,240,255,0.6)]">
              <HeartPulse className="h-5 w-5 text-[#03141A]" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-bold tracking-wide text-white">
                Inter<span className="text-[#00F0FF]">Ativa</span>
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                UFSC · FAPESC
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-[#00F0FF]"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setChatOpen(true)}
              className="group flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-4 py-2 text-sm font-semibold text-[#00F0FF] transition-all hover:border-[#00F0FF] hover:bg-[#00F0FF]/20 hover:shadow-[0_0_28px_rgba(0,240,255,0.4)]"
            >
              <Bot className="h-4 w-4" />
              Falar com a InterAtiva
            </button>
            <a
              href={COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#00FF66] px-4 py-2 text-sm font-bold text-[#03141A] transition-all hover:shadow-[0_0_28px_rgba(0,255,102,0.45)]"
            >
              Inscreva-se
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-300 hover:bg-white/5 lg:hidden"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#03141A]/95 backdrop-blur-xl lg:hidden">
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-[#00F0FF]"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setChatOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-4 py-2.5 text-sm font-semibold text-[#00F0FF]"
                >
                  <Bot className="h-4 w-4" />
                  Falar com a InterAtiva
                </button>
                <a
                  href={COURSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#00FF66] px-4 py-2.5 text-sm font-bold text-[#03141A]"
                >
                  Inscreva-se no Curso
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ══════════ HERO ══════════ */}
      <section id="inicio" className="relative overflow-hidden pt-16">
        <div className="grid-bg absolute inset-0" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#00F0FF]/10 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-[#00FF66]/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          {/* Texto */}
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/30 bg-[#0B2028]/70 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#00F0FF]" />
              <span className="text-xs font-semibold tracking-wide text-[#00F0FF]">
                Apoiado pela FAPESC · Desenvolvido desde 2020
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Simulação Virtual{" "}
              <span className="animate-gradient bg-gradient-to-r from-[#00F0FF] via-[#00FF66] to-[#00F0FF] bg-clip-text text-transparent">
                Interativa
              </span>{" "}
              para a Segurança do Paciente
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              O <strong className="font-semibold text-slate-200">Projeto InterAtiva</strong> promove
              a segurança do paciente no cuidado em saúde e enfermagem por meio de cenários
              ramificados imersivos — desenvolvido no Departamento de Enfermagem da{" "}
              <strong className="font-semibold text-slate-200">UFSC</strong> e no{" "}
              <strong className="font-semibold text-slate-200">Hospital Universitário</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={COURSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-[#00FF66] px-7 py-3.5 text-sm font-bold text-[#03141A] transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,255,102,0.5)]"
              >
                <GraduationCap className="h-5 w-5" />
                Conhecer o Curso
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => setChatOpen(true)}
                className="group flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/5 px-7 py-3.5 text-sm font-semibold text-[#00F0FF] backdrop-blur-md transition-all hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 hover:shadow-[0_0_36px_rgba(0,240,255,0.35)]"
              >
                <MessageCircle className="h-5 w-5" />
                Simular com a InterAtiva
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-[#00F0FF]" /> UFSC
              </span>
              <span className="flex items-center gap-1.5">
                <Hospital className="h-4 w-4 text-[#00F0FF]" /> Hospital Universitário
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#00FF66]" /> Fomento FAPESC
              </span>
            </div>
          </div>

          {/* Visual — Painel de simulação */}
          <div className="animate-fade-up animate-float relative" style={{ animationDelay: "0.15s" }}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B2028]/70 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00FF66]/80" />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Simulação · Cenário 01
                </span>
              </div>

              <div className="space-y-5 p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#00FF66]">
                    <Stethoscope className="h-5 w-5 text-[#03141A]" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 p-4">
                    <p className="text-sm leading-relaxed text-slate-300">
                      Paciente internado apresenta alergia medicamentosa registrada. Qual a sua
                      conduta antes da administração da medicação prescrita?
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pl-13">
                  {[
                    { t: "Checar identificação e pulseira de alergia", active: true },
                    { t: "Administrar a medicação imediatamente", active: false },
                    { t: "Aguardar nova prescrição sem agir", active: false },
                  ].map((o, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
                        o.active
                          ? "border-[#00F0FF]/50 bg-[#00F0FF]/10 text-white shadow-[0_0_24px_rgba(0,240,255,0.15)]"
                          : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#00F0FF]/30 hover:text-slate-200"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${
                          o.active
                            ? "border-[#00F0FF] bg-[#00F0FF] text-[#03141A]"
                            : "border-slate-600 text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      {o.t}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#00FF66]/20 bg-[#00FF66]/5 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Activity className="h-4 w-4 text-[#00FF66]" />
                    Ramificação desbloqueada · feedback em tempo real
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#00FF66]">
                    <span className="blink-dot h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
                    InterAtiva online
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#0B2028]/90 px-5 py-4 shadow-2xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00FF66]/15">
                  <ShieldCheck className="h-5 w-5 text-[#00FF66]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Segurança do Paciente</p>
                  <p className="text-xs text-slate-500">Metas internacionais aplicadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="relative border-y border-white/5 bg-[#0B2028]/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 px-6 py-8 transition-colors hover:bg-[#00F0FF]/5 lg:px-8"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00F0FF]/20 bg-[#00F0FF]/10 transition-all group-hover:border-[#00F0FF]/60 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <s.icon className="h-5 w-5 text-[#00F0FF]" />
              </div>
              <div>
                <p className="text-base font-bold text-white">{s.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ SOBRE / PILARES ══════════ */}
      <section id="sobre" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FF66]">
            Sobre o Projeto
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Tecnologia, educação e cuidado seguro{" "}
            <span className="text-[#00F0FF]">em um só ecossistema</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            Desde 2020, o Projeto InterAtiva une pesquisa científica e inovação tecnológica para
            transformar a formação em saúde e enfermagem, colocando a segurança do paciente no
            centro da experiência de aprendizagem.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B2028]/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00F0FF]/50 hover:shadow-[0_0_40px_rgba(0,240,255,0.18)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#00F0FF]/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#00F0FF]/20 bg-gradient-to-br from-[#00F0FF]/15 to-[#00FF66]/10 transition-all group-hover:border-[#00F0FF]/60">
                <p.icon className="h-6 w-6 text-[#00F0FF]" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CURSO DESTAQUE ══════════ */}
      <section id="curso" className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FF66]/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B2028] via-[#0B2028]/80 to-[#03141A] shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-5">
            <div className="relative p-8 sm:p-12 lg:col-span-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/10 px-4 py-1.5">
                <Zap className="h-3.5 w-3.5 text-[#00FF66]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#00FF66]">
                  Inscrições Abertas
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                Curso de Simulação Virtual em{" "}
                <span className="text-[#00F0FF]">Cenários Ramificados</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                Aprenda a tomar decisões clínicas seguras em ambientes virtuais que reagem às suas
                escolhas. Ideal para estudantes e profissionais de saúde e enfermagem que desejam
                dominar protocolos de segurança do paciente na prática.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Cenários com múltiplos desfechos baseados em evidências",
                  "Feedback inteligente conduzido pela agente InterAtiva",
                  "Certificação e metodologia validada em ambiente universitário",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <BookOpenCheck className="mt-0.5 h-4.5 w-4.5 h-5 w-5 shrink-0 text-[#00FF66]" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={COURSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#00FF66] px-8 py-4 text-sm font-bold text-[#03141A] transition-all hover:scale-[1.03] hover:shadow-[0_0_44px_rgba(0,255,102,0.5)]"
              >
                <GraduationCap className="h-5 w-5" />
                Inscrever-se Agora
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-3 text-xs text-slate-500">
                inscricoes.ufsc.br/cursosimulacao
              </p>
            </div>

            <div className="relative hidden items-center justify-center border-l border-white/5 bg-[#03141A]/40 p-12 lg:col-span-2 lg:flex">
              <div className="grid-bg absolute inset-0 opacity-60" />
              <div className="relative flex flex-col items-center gap-6">
                <div className="pulse-ring relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#00F0FF] to-[#00FF66] shadow-[0_0_60px_rgba(0,240,255,0.4)]">
                  <Bot className="h-14 w-14 text-[#03141A]" strokeWidth={1.8} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">Agente InterAtiva</p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-[#00FF66]">
                    <span className="blink-dot h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
                    Guiando suas simulações em tempo real
                  </p>
                </div>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-6 py-2.5 text-sm font-semibold text-[#00F0FF] transition-all hover:bg-[#00F0FF]/20 hover:shadow-[0_0_28px_rgba(0,240,255,0.4)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Iniciar conversa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ COORDENAÇÃO ══════════ */}
      <section id="equipe" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00FF66]">
              Coordenação
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Liderança científica com{" "}
              <span className="text-[#00F0FF]">propósito assistencial</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-400">
              O projeto é coordenado no Departamento de Enfermagem da UFSC, em articulação com o
              Hospital Universitário, integrando ensino, pesquisa e extensão para gerar impacto
              real na qualidade e na segurança do cuidado.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B2028]/60 p-8 backdrop-blur-md transition-all hover:border-[#00F0FF]/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)]">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#