# Elle App Pilot

Painel interno, estático e local para estruturar o início de projetos da Agentes na Saúde. Esta é uma primeira versão pequena: não possui backend, autenticação, banco, integrações externas ou deploy.

## Escopo

- briefing com nome do app, cliente, objetivo, stack e prioridade inicial;
- sinalização de riscos e checklist de partida;
- prioridade calculada de 1 a 4, elevando o nível quando há riscos;
- resumo operacional com progresso;
- persistência de um projeto no `localStorage`;
- exportação do projeto em JSON.

Os dados ficam somente no navegador e dispositivo em uso. Não registre segredos, credenciais nem dados pessoais ou clínicos. Limpar os dados do navegador remove o projeto salvo.

## Executar localmente

Na pasta `workspace/`, inicie um servidor estático:

```bash
python3 -m http.server 8000
```

Abra `http://localhost:8000`. O servidor é recomendado porque o JavaScript usa módulos ES.

## Testes

Requer Node.js 18 ou superior e não instala dependências:

```bash
node tests/pilot.test.mjs
```

Os testes cobrem criação e normalização de projeto, cálculo de prioridade e exportação JSON válida.

## Decisões e limites

- Stack: HTML, CSS e JavaScript nativos para manter o piloto reversível e sem dependências.
- Identidade: navy profundo, verde assinatura, tipografia de sistema e interface operacional conforme as referências da Agentes na Saúde.
- Acessibilidade: HTML semântico, labels, navegação por teclado, foco visível, região de status e respeito a movimento reduzido.
- Risco: `localStorage` não sincroniza nem oferece controle de acesso; uma evolução com dados reais exige revisão de segurança, autenticação e aprovação humana.
- Rollback: remover os cinco arquivos do piloto; nenhum sistema externo ou ambiente de produção foi alterado.

## Arquivos

```text
workspace/
├── index.html
├── styles.css
├── app.js
├── README.md
└── tests/
    └── pilot.test.mjs
```
