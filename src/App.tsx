import { useMemo, useState } from "react";

/* ---------------------------------- Tipos --------------------------------- */
type StatusAgendamento = "confirmado" | "pendente";
type TipoConsulta = "Presencial" | "Telemedicina";

interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
  avaliacao: number;
  iniciais: string;
}

interface Agendamento {
  id: number;
  medico: string;
  especialidade: string;
  data: string;
  hora: string;
  tipo: TipoConsulta;
  status: StatusAgendamento;
}

/* ---------------------------------- Dados --------------------------------- */
const ESPECIALIDADES = [
  "Todas",
  "Cardiologia",
  "Dermatologia",
  "Pediatria",
  "Ortopedia",
  "Ginecologia",
  "Neurologia",
  "Clínico Geral",
];

const MEDICOS: Medico[] = [
  { id: 1, nome: "Dra. Ana Beatriz Santos", especialidade: "Cardiologia", crm: "CRM-SP 123.456", avaliacao: 4.9, iniciais: "AB" },
  { id: 2, nome: "Dr. Carlos Eduardo Lima", especialidade: "Dermatologia", crm: "CRM-SP 234.567", avaliacao: 4.8, iniciais: "CL" },
  { id: 3, nome: "Dra. Fernanda Oliveira", especialidade: "Pediatria", crm: "CRM-RJ 345.678", avaliacao: 4.9, iniciais: "FO" },
  { id: 4, nome: "Dr. Rafael Mendes", especialidade: "Ortopedia", crm: "CRM-MG 456.789", avaliacao: 4.7, iniciais: "RM" },
  { id: 5, nome: "Dra. Juliana Costa", especialidade: "Ginecologia", crm: "CRM-SP 567.890", avaliacao: 4.8, iniciais: "JC" },
  { id: 6, nome: "Dr. Thiago Almeida", especialidade: "Neurologia", crm: "CRM-PR 678.901", avaliacao: 4.9, iniciais: "TA" },
  { id: 7, nome: "Dr. Lucas Ferreira", especialidade: "Clínico Geral", crm: "CRM-SP 789.012", avaliacao: 4.8, iniciais: "LF" },
];

const HORARIOS = [
  { hora: "08:00", disponivel: true },
  { hora: "08:30", disponivel: false },
  { hora: "09:00", disponivel: true },
  { hora: "09:30", disponivel: true },
  { hora: "10:00", disponivel: false },
  { hora: "10:30", disponivel: true },
  { hora: "11:00", disponivel: true },
  { hora: "11:30", disponivel: false },
  { hora: "13:00", disponivel: true },
  { hora: "13:30", disponivel: true },
  { hora: "14:00", disponivel: true },
  { hora: "14:30", disponivel: false },
  { hora: "15:00", disponivel: true },
  { hora: "15:30", disponivel: true },
  { hora: "16:00", disponivel: false },
  { hora: "16:30", disponivel: true },
  { hora: "17:00", disponivel: true },
  { hora: "17:30", disponivel: true },
];

const PROXIMOS_AGENDAMENTOS: Agendamento[] = [
  { id: 1, medico: "Dra. Ana Beatriz Santos", especialidade: "Cardiologia", data: "12 de Nov", hora: "09:00", tipo: "Presencial", status: "confirmado" },
  { id: 2, medico: "Dr. Rafael Mendes", especialidade: "Ortopedia", data: "18 de Nov", hora: "14:30", tipo: "Telemedicina", status: "pendente" },
  { id: 3, medico: "Dra. Fernanda Oliveira", especialidade: "Pediatria", data: "25 de Nov", hora: "10:00", tipo: "Presencial", status: "confirmado" },
];

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

/* ---------------------------------- Ícones -------------------------------- */
type IconeProps = { className?: string };

const IconePulso = ({ className = "h-5 w-5" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const IconeBusca = ({ className = "h-4 w-4" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const IconeSino = ({ className = "h-5 w-5" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const IconeSetaEsquerda = ({ className = "h-4 w-4" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const IconeSetaDireita = ({ className = "h-4 w-4" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const IconeEstrela = ({ className = "h-3.5 w-3.5" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const IconeCheck = ({ className = "h-4 w-4" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const IconePin = ({ className = "h-4 w-4" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconeVideo = ({ className = "h-4 w-4" }: IconeProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" />
  </svg>
);

const IconeCalendario = ({