import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const { calculatePriority, createProject, exportProjectJSON } = await import(moduleUrl);

const baseInput = {
  idea: "Criar um painel para transformar ideias em projetos rastreáveis.",
  appName: "Elle App Pilot",
  client: "Agentes na Saúde",
  objective: "Padronizar o início de projetos internos.",
  stack: "HTML, CSS e JavaScript",
  priority: "media",
  risks: [],
  checklist: ["Objetivo validado", "Responsável definido"],
  checklistTotal: 4,
};

test("cria projeto normalizado com ideia e progresso do checklist", () => {
  const project = createProject(
    { ...baseInput, appName: "  Elle App Pilot  " },
    new Date("2026-07-12T15:00:00.000Z"),
  );

  assert.equal(project.appName, "Elle App Pilot");
  assert.equal(project.idea, baseInput.idea);
  assert.equal(project.id, "project-20260712150000000");
  assert.equal(project.checklist.progress, 50);
  assert.equal(project.environment, "piloto-local");
  assert.match(project.nextStep, /Completar o checklist/);
});

test("calcula prioridade considerando quantidade de riscos", () => {
  assert.deepEqual(calculatePriority("baixa", []), { score: 1, label: "Baixa" });
  assert.deepEqual(calculatePriority("média", ["Prazo crítico"]), { score: 3, label: "Alta" });
  assert.deepEqual(calculatePriority("alta", ["A", "B", "C"]), { score: 4, label: "Crítica" });
});

test("exporta JSON válido preservando os dados do projeto", () => {
  const project = createProject(baseInput, new Date("2026-07-12T15:00:00.000Z"));
  const exported = exportProjectJSON(project);
  const parsed = JSON.parse(exported);

  assert.equal(parsed.appName, "Elle App Pilot");
  assert.equal(parsed.priority.label, "Média");
  assert.deepEqual(parsed.checklist.completed, baseInput.checklist);
  assert.match(exported, /\n  "appName"/);
});
