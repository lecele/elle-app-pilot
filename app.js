const STORAGE_KEY = "elle-app-pilot:project";
const PRIORITY_BASE = { baixa: 1, media: 2, alta: 3 };
const PRIORITY_LABEL = { 1: "Baixa", 2: "Média", 3: "Alta", 4: "Crítica" };

const IDEA_TEMPLATES = {
  simulador:
    "Criar um simulador clínico para treinar decisões em saúde com cenários realistas, sinais vitais e registro da conduta.",
  agenda:
    "Criar uma agenda inteligente para organizar reuniões, enviar convites e avisar sobre compromissos importantes.",
  documentos:
    "Criar um gerador de documentos comerciais com proposta, orçamento, contrato e histórico de aprovação.",
  comercial:
    "Criar um painel comercial para acompanhar leads, propostas abertas, follow-ups e próximos passos.",
};

function clean(value) {
  return String(value ?? "").trim();
}

function normalizePriority(value) {
  return clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function calculatePriority(initialPriority, risks = []) {
  const base = PRIORITY_BASE[normalizePriority(initialPriority)];
  if (!base) throw new Error("Prioridade inicial inválida.");
  const riskAdjustment = risks.length >= 3 ? 2 : risks.length >= 1 ? 1 : 0;
  const score = Math.min(4, base + riskAdjustment);
  return { score, label: PRIORITY_LABEL[score] };
}

export function createProject(input, now = new Date()) {
  const idea = clean(input.idea);
  const appName = clean(input.appName);
  const client = clean(input.client);
  const objective = clean(input.objective);
  const stack = clean(input.stack);
  const initialPriority = normalizePriority(input.priority);
  const risks = [...new Set((input.risks ?? []).map(clean).filter(Boolean))];
  const checkedItems = [...new Set((input.checklist ?? []).map(clean).filter(Boolean))];

  if (!appName || !client || !objective || !stack) {
    throw new Error("Preencha nome, cliente, objetivo e stack.");
  }

  const priority = calculatePriority(initialPriority, risks);
  const checklistTotal = Number(input.checklistTotal ?? 4);
  const createdAt = now instanceof Date ? now.toISOString() : new Date(now).toISOString();

  return {
    id: `project-${createdAt.replace(/\D/g, "").slice(0, 17)}`,
    idea,
    appName,
    client,
    objective,
    stack,
    priority: { initial: initialPriority, ...priority },
    risks,
    checklist: {
      completed: checkedItems,
      total: checklistTotal,
      progress: checklistTotal ? Math.round((checkedItems.length / checklistTotal) * 100) : 0,
    },
    nextStep: buildNextStep({ risks, checkedItems, checklistTotal }),
    createdAt,
    environment: "piloto-local",
  };
}

export function exportProjectJSON(project) {
  if (!project || !project.id) throw new Error("Crie um projeto antes de exportar.");
  return JSON.stringify(project, null, 2);
}

function buildNextStep({ risks, checkedItems, checklistTotal }) {
  if (risks.includes("Dados sensíveis")) {
    return "Chamar revisão de segurança antes de qualquer integração real.";
  }
  if (risks.includes("Escopo indefinido")) {
    return "Quebrar a ideia em uma primeira entrega pequena e testável.";
  }
  if (checkedItems.length < checklistTotal) {
    return "Completar o checklist mínimo antes de liberar a Harnnes Dev.";
  }
  return "Gerar backlog curto, branch de trabalho e primeiro protótipo navegável.";
}

function readForm(form) {
  const data = new FormData(form);
  return {
    idea: document.querySelector("#idea")?.value,
    appName: data.get("appName"),
    client: data.get("client"),
    objective: data.get("objective"),
    stack: data.get("stack"),
    priority: data.get("priority"),
    risks: data.getAll("risks"),
    checklist: data.getAll("checklist"),
    checklistTotal: form.querySelectorAll('[name="checklist"]').length,
  };
}

function slugify(value) {
  return clean(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function initApp() {
  const form = document.querySelector("#project-form");
  const emptyState = document.querySelector("#empty-state");
  const summary = document.querySelector("#project-summary");
  const toast = document.querySelector("#toast");
  const idea = document.querySelector("#idea");
  const objective = document.querySelector("#objective");
  let currentProject = null;
  let toastTimer;

  const notify = (message) => {
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
  };

  const render = (project) => {
    currentProject = project;
    emptyState.hidden = Boolean(project);
    summary.hidden = !project;
    if (!project) return;

    document.querySelector("#summary-name").textContent = project.appName;
    document.querySelector("#summary-client").textContent = project.client;
    document.querySelector("#summary-idea").textContent = project.idea || "Não informada";
    document.querySelector("#summary-objective").textContent = project.objective;
    document.querySelector("#summary-stack").textContent = project.stack;
    document.querySelector("#summary-priority").textContent = `${project.priority.label} · ${project.priority.score}/4`;
    document.querySelector("#summary-risks").textContent = project.risks.length
      ? project.risks.join(", ")
      : "Nenhum risco sinalizado";
    document.querySelector("#summary-progress").textContent = `${project.checklist.completed.length} de ${project.checklist.total} itens (${project.checklist.progress}%)`;
    document.querySelector("#progress-bar").style.width = `${project.checklist.progress}%`;
    document.querySelector("#summary-next-step").textContent = project.nextStep;
    document.querySelector("#updated-at").textContent = `Criado em ${new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(project.createdAt))}`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    try {
      const project = createProject(readForm(form));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      render(project);
      notify("Briefing criado e salvo neste dispositivo.");
      summary.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) {
      notify(error.message);
    }
  });

  document.querySelector("#clear-button").addEventListener("click", () => {
    form.reset();
    idea.value = "";
    idea.dispatchEvent(new Event("input"));
    objective.dispatchEvent(new Event("input"));
    localStorage.removeItem(STORAGE_KEY);
    render(null);
    notify("Dados locais removidos.");
    idea.focus();
  });

  document.querySelector("#export-button").addEventListener("click", () => {
    try {
      const content = exportProjectJSON(currentProject);
      const blobUrl = URL.createObjectURL(new Blob([content], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${slugify(currentProject.appName) || "projeto"}.json`;
      link.click();
      URL.revokeObjectURL(blobUrl);
      notify("Arquivo JSON exportado.");
    } catch (error) {
      notify(error.message);
    }
  });

  document.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const template = IDEA_TEMPLATES[button.dataset.template];
      idea.value = template;
      idea.dispatchEvent(new Event("input"));
      if (!objective.value) {
        objective.value = template;
        objective.dispatchEvent(new Event("input"));
      }
      notify("Ideia aplicada ao briefing.");
    });
  });

  idea.addEventListener("input", () => {
    document.querySelector("#idea-count").textContent = `${idea.value.length}/700`;
  });

  objective.addEventListener("input", () => {
    document.querySelector("#objective-count").textContent = `${objective.value.length}/500`;
  });

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) render(JSON.parse(saved));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    notify("O dado local estava inválido e foi descartado.");
  }
}

if (typeof document !== "undefined") initApp();
