import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  GitBranch,
  GraduationCap,
  HeartPulse,
  Instagram,
  Mail,
  Maximize2,
  Menu,
  MessageCircle,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const LINKS = {
  curso: "http://inscricoes.ufsc.br/cursosimulacao",
  assistente: "https://interativa.agentesnasaude.com.br/",
  emailProjeto: "mailto:simulacaointerativa@gmail.com",
  emailCoord: "mailto:a.graziela@ufsc.br",
  igProjeto: "https://instagram.com/simulacaointerativa",
  igIana: "https://instagram.com/ianaenfermagem",
};

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Curso", href: "#curso" },
  { label: "Coordenação", href: "#coordenacao" },
  { label: "Parcerias", href: "#parcerias" },
  { label: "Contato", href: "#contato" },
];

const glass =
  "bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl";
const glowHover =
  "transition-all duration-300 hover:border-[#00F0FF]/40 hover:shadow-[0_0_45px_-12px_rgba(0,240,255,0.45)] hover:-translate-y-1";

export default function InterAtivaLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#03141A] text-slate-200 antialiased selection:bg-[#00F0FF]/30 selection:text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-12px);} }
        @keyframes floatSlow { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-8px);} }
        .anim-float { animation: float 6s ease-in-out infinite; }
        .anim-float-slow { animation: floatSlow 8s ease-in-out infinite; }
      `}</style>

      {/* ===== Background FX ===== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,240,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#00F0FF]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-[#00FF66]/[0.07] blur-[140px]" />
      </div>

      {/* ===== Navbar ===== */}
      <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#03141A]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#00FF66] shadow-[0_0_20px_-4px_rgba(0,240,255,0.6)]">
              <HeartPulse className="h-5 w-5 text-[#03141A]" strokeWidth={2.4} />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-wide text-white">
                Inter<span className="text-[#00F0FF]">Ativa</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                UFSC · FAPESC
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-[#00F0FF]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={LINKS.curso}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 rounded-xl bg-[#00FF66] px-4 py-2 text-sm font-semibold text-[#03141A] shadow-[0_0_25px_-6px_rgba(0,255,102,0.7)] transition hover:brightness-110"
            >
              Inscreva-se
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/5 bg-[#0B2028]/95 backdrop-blur-xl lg:hidden">
            <div className="space-y-1 px-4 py-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-[#00F0FF]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={LINKS.curso}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#00FF66] px-4 py-2.5 text-sm font-semibold text-[#03141A]"
              >
                Inscreva-se no Curso
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* ===== Hero ===== */}
        <section id="inicio" className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/25 bg-[#00F0FF]/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-[#00F0FF]">
                <Sparkles className="h-3.5 w-3.5" />
                Desde 2020 · Departamento de Enfermagem UFSC + Hospital Universitário
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Simulação Virtual{" "}
                <span className="bg-gradient-to-r from-[#00F0FF] to-[#00FF66] bg-clip-text text-transparent">
                  Interativa
                </span>{" "}
                para a Segurança do Paciente
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                O <strong className="text-slate-200">Projeto InterAtiva</strong> promove a
                segurança do paciente no cuidado em saúde e enfermagem por meio de
                cenários virtuais ramificados, tecnologia educacional e uma agente
                inteligente que guia cada decisão clínica.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={LINKS.curso}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#00FF66] px-6 py-3.5 text-sm font-bold text-[#03141A] shadow-[0_0_35px_-8px_rgba(0,255,102,0.8)] transition hover:brightness-110 hover:shadow-[0_0_45px_-6px_rgba(0,255,102,0.9)]"
                >
                  <GraduationCap className="h-5 w-5" />
                  Inscreva-se no Curso
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  onClick={() => setChatOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#00F0FF]/40 bg-[#00F0FF]/[0.06] px-6 py-3.5 text-sm font-semibold text-[#00F0FF] transition hover:bg-[#00F0FF]/15 hover:shadow-[0_0_35px_-10px_rgba(0,240,255,0.7)]"
                >
                  <Bot className="h-5 w-5" />
                  Falar com a InterAtiva
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: "2020", label: "Ano de início" },
                  { value: "02", label: "Frentes UFSC · PEN + HU" },
                  { value: "04", label: "Parceiros institucionais" },
                  { value: "01", label: "Agente inteligente" },
                ].map((s) => (
                  <div key={s.label} className={`${glass} ${glowHover} p-4`}>
                    <p className="bg-gradient-to-r from-[#00F0FF] to-[#00FF66] bg-clip-text text-2xl font-extrabold text-transparent">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#00F0FF]/15 via-transparent to-[#00FF66]/15 blur-2xl" />
              <div className={`${glass} relative overflow-hidden p-2 shadow-[0_0_60px_-20px_rgba(0,240,255,0.5)]`}>
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
                  alt="Profissional de saúde utilizando tecnologia em simulação clínica"
                  className="h-[420px] w-full rounded-xl object-cover"
                />
                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-[#03141A]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#00F0FF]">Projeto InterAtiva</p>
                    <p className="mt-1 text-lg font-bold text-white">Cenários Ramificados em Saúde</p>
                  </div>
                  <BadgeCheck className="h-8 w-8 text-[#00FF66]" />
                </div>
              </div>

              {/* Floating cards */}
              <div className={`${glass} anim-float absolute -left-6 top-8 hidden items-center gap-3 px-4 py-3 sm:flex`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00FF66]/15">
                  <ShieldCheck className="h-5 w-5 text-[#00FF66]" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Segurança do Paciente</p>
                  <p className="text-slate-400">Decisões clínicas seguras</p>
                </div>
              </div>
              <div className={`${glass} anim-float-slow absolute -right-4 bottom-24 hidden items-center gap-3 px-4 py-3 sm:flex`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00F0FF]/15">
                  <GitBranch className="h-5 w-5 text-[#00F0FF]" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">Cenários Ramificados</p>
                  <p className="text-slate-400">Múltiplos desfechos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Sobre ===== */}
        <section id="sobre" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00F0FF]">Sobre o projeto</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Educação imersiva a serviço do cuidado seguro
            </h2>
            <p className="mt-4 text-slate-400">
              Desenvolvido no Departamento de Enfermagem da UFSC em parceria com o
              Hospital Universitário, com apoio da FAPESC, o InterAtiva une pesquisa,
              ensino e tecnologia para transformar a formação em saúde.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                color: "#00FF66",
                title: "Segurança do Paciente",
                desc: "Treinamento de tomada de decisão em ambiente virtual seguro, sem riscos ao paciente real, fortalecendo a cultura de segurança.",
              },
              {
                icon: GitBranch,
                color: "#00F0FF",
                title: "Cenários Ramificados",
                desc: "Cada escolha abre novos caminhos narrativos: o estudante vivencia consequências realistas e múltiplos desfechos clínicos.",
              },
              {
                icon: MonitorPlay,
                color: "#00FF66",
                title: "Tecnologia Educacional",
                desc: "Plataforma digital com agente inteligente InterAtiva, que orienta as simulações e personaliza a experiência de aprendizagem.",
              },
            ].map((c) => (
              <article key={c.title} className={`${glass} ${glowHover} group p-7`}>
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-110"
                  style={{ backgroundColor: `${c.color}1f` }}
                >
                  <c.icon className="h-6 w-6" style={{ color: c.color }} />
                </div>
                <h3 className="text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ===== Curso em destaque ===== */}
        <section id="curso" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#00F0FF]/20 bg-gradient-to-br from-[#0B2028] via-[#0B2028]/80 to-[#03141A] p-1">
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#00F0FF]/15 blur-[100px]" />
            <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#00FF66]/10 blur-[100px]" />

            <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#00FF66]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00FF66]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FF66] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FF66]" />
                  </span>
                  Inscrições abertas
                </span>

                <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Curso de Simulação Virtual em{" "}
                  <span className="text-[#00F0FF]">Cenários Ramificados</span>
                </h2>

                <p className="mt-4 text-slate-400">
                  Formação voltada a estudantes e profissionais da saúde e enfermagem,
                  com casos clínicos interativos conduzidos pela agente InterAtiva.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Casos clínicos com múltiplos desfechos",
                    "Foco em segurança do paciente",
                    "Mediação pela agente inteligente InterAtiva",
                    "Certificação pela UFSC",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00FF66]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={LINKS.curso}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#00FF66] px-7 py-3.5 text-sm font-bold text-[#03141A] shadow-[0_0_35px_-8px_rgba(0,255,102,0.8)] transition hover:brightness-110"
                >
                  Garantir minha vaga
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <p className="mt-3 text-xs text-slate-500">
                  inscricoes.ufsc.br/cursosimulacao
                </p>
              </div>

              <div className="relative">
                <div className={`${glass} overflow-hidden p-2`}>
                  <img
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1200&auto=format&fit=crop"
                    alt="Equipe de saúde em treinamento de simulação"
                    className="h-80 w-full rounded-xl object-cover"
                  />
                  <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-[#03141A]/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-lg bg-[#03141A]/80 px-3 py-2 backdrop-blur">
                    <Bot className="h-4 w-4 text-[#00F0FF]" />
                    <span className="text-xs font-medium text-white">
                      Simulações guiadas por IA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Coordenação ===== */}
        <section id="coordenacao" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00F0FF]">Coordenação</p>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Liderança científica e acadêmica
              </h2>
              <p className="mt-4 text-slate-400">
                O projeto é coordenado pela Profa. Dra. Ana Graziela Alvarez, do
                Departamento de Enfermagem da UFSC, articulando pesquisa, extensão e
                inovação tecnológica no Hospital Universitário.
              </p>
            </div>

            <div className={`${glass} ${glowHover} flex flex-col gap-6 p-8 sm:flex-row sm:items-center`}>
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00F0FF] to-[#00FF66] text-3xl font-extrabold text-[#03141A] shadow-[0_0_30px_-8px_rgba(0,240,255,0.7)]">
                AG
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">Profa. Dra. Ana Graziela Alvarez</h3>
                <p className="mt-1 text-sm text-[#00F0FF]">Coordenadora do Projeto InterAtiva</p>
                <p className="mt-2 text-sm text-slate-400">
                  Departamento de Enfermagem · Universidade Federal de Santa Catarina
                </p>
                <a
                  href={LINKS.emailCoord}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#00F0FF]/30