const STORAGE_KEY = "elle-app-pilot:project";
const PRIORITY_BASE = { baixa: 1, media: 2, alta: 3 };
const PRIORITY_LABEL = { 1: "Baixa", 2: "Média", 3: "Alta", 4: "Crítica" };

function clean(value) {
  return String(value ?? "").trim();
}

export function calculatePriority(initialPriority, risks = []) {
  const base = PRIORITY_BASE[initialPriority];
  if (!base) throw new Error("Prioridade inicial inválida.");
  const riskAdjustment = risks.length >= 3 ? 2 : risks.length >= 1 ? 1 : 0;
  const score = Math.min(4, base + riskAdjustment);
  return { score, label: PRIORITY_LABEL[score] };
}

export function createProject(input, now = new Date()) {
  const appName = clean(input.appName);
  const client = clean(input.client);
  const objective = clean(input.objective);
  const stack = clean(input.stack);
  const initialPriority = clean(input.priority).toLowerCase();
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
    createdAt,
    environment: "piloto-local",
  };
}

export function exportProjectJSON(project) {
  if (!project || !project.id) throw new Error("Crie um projeto antes de exportar.");
  return JSON.stringify(project, null, 2);
}

function readForm(form) {
  const data = new FormData(form);
  return {
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

function initApp() {
  const form = document.querySelector("#project-form");
  const emptyState = document.querySelector("#empty-state");
  const summary = document.querySelector("#project-summary");
  const toast = document.querySelector("#toast");
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
    document.querySelector("#summary-objective").textContent = project.objective;
    document.querySelector("#summary-stack").textContent = project.stack;
    document.querySelector("#summary-priority").textContent = `${project.priority.label} · ${project.priority.score}/4`;
    document.querySelector("#summary-risks").textContent = project.risks.length ?project.risks.join(", ") : "Nenhum risco sinalizado";
    document.querySelector("#summary-progress").textContent = `${project.checklist.completed.length} de ${project.checklist.total} itens (${project.checklist.progress}%)`;
    document.querySelector("#progress-bar").style.width = `${project.checklist.progress}%`;
    document.querySelector("#updated-at").textContent = `Criado em ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(project.createdAt))}`;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    try {
      const project = createProject(readForm(form));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      render(project);
      notify("Projeto criado e salvo neste dispositivo.");
      summary.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (error) {
      notify(error.message);
    }
  });

  document.querySelector("#clear-button").addEventListener("click", () => {
    form.reset();
    objective.dispatchEvent(new Event("input"));
    localStorage.removeItem(STORAGE_KEY);
    render(null);
    notify("Dados locais removidos.");
    document.querySelector("#app-name").focus();
  });

  document.querySelector("#export-button").addEventListener("click", () => {
    try {
      const content = exportProjectJSON(currentProject);
      const blobUrl = URL.createObjectURL(new Blob([content], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${currentProject.appName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "projeto"}.json`;
      link.click();
      URL.revokeObjectURL(blobUrl);
      notify("Arquivo JSON exportado.");
    } catch (error) {
      notify(error.message);
    }
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
