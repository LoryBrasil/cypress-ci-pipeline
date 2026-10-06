# Pipeline CI com GitHub Actions + Cypress (TypeScript)

Trabalho Final – Pós-graduação PGATS (Turma 3). Pipeline de **Integração Contínua** que executa testes automatizados E2E com **Cypress + TypeScript**, gera um **relatório HTML (Mochawesome)** e o armazena como **artifact** da execução.

## Objetivo

Garantir que, a cada alteração no código (ou em horários definidos), os testes automatizados sejam executados de forma padronizada, sem depender da máquina de ninguém, e que o resultado fique registrado e acessível.

## Estrutura do projeto

```
.
├── .github/workflows/ci.yml     # Definição da pipeline
├── cypress/
│   ├── e2e/                     # Testes (home, actions, assertions)
│   └── support/e2e.ts           # Registra o reporter
├── scripts/summary.js           # Resumo dos testes no Job Summary
├── cypress.config.ts            # Configuração do Cypress e do relatório
├── package.json / tsconfig.json
└── README.md
```

Os testes rodam contra a aplicação pública de demonstração `https://example.cypress.io`, e cobrem navegação, digitação, checkbox, select e consultas/asserções de elementos (10 testes).

## Como executar localmente

```bash
npm ci
npm run cy:open     # modo interativo
npm test            # modo headless (gera cypress/reports/index.html)
```

Requisitos: Node.js 20+.

## A pipeline (`.github/workflows/ci.yml`)

### Gatilhos (`on`)

| Gatilho | Quando executa |
|---|---|
| `push` / `pull_request` | A cada push ou PR na branch `main` |
| `workflow_dispatch` | Manualmente em **Actions → Pipeline CI → Run workflow**, com escolha do navegador (chrome, electron ou firefox) |
| `schedule` | Cron `0 11 * * 1-5`: de segunda a sexta às 11:00 UTC (07:00 em Manaus) |

### Etapas do job `e2e-tests`

1. **Checkout** do código (`actions/checkout`).
2. **Setup Node.js 20** com cache do npm (`actions/setup-node`).
3. **`npm ci`**: instalação reprodutível a partir do `package-lock.json`.
4. **`npx cypress run`**: executa os testes em modo headless.
5. **Job Summary**: `scripts/summary.js` lê os JSONs do Mochawesome e escreve uma tabela (total, passou, falhou, duração) na página da execução.
6. **Upload de artifacts** (`actions/upload-artifact`): relatório HTML (sempre), screenshots (somente em falha) e vídeos.

Os passos de relatório usam `if: always()`, então o relatório é salvo mesmo quando algum teste falha.

## Relatório de testes

O **cypress-mochawesome-reporter** gera `cypress/reports/index.html` (autocontido, com gráficos e screenshots embutidos). Para ver após uma execução:

1. Abra a aba **Actions** e entre na execução desejada.
2. Na seção **Artifacts**, baixe **relatorio-cypress**.
3. Descompacte e abra `index.html` no navegador.

O resumo rápido aparece também direto na página da execução (Job Summary).

## Conceitos utilizados

- **Integração Contínua (CI):** validação automática do código a cada mudança, para encontrar defeitos cedo.
- **Workflow, job e step:** o workflow é o arquivo YAML; contém jobs (executados em runners); cada job tem steps sequenciais.
- **Triggers:** eventos que disparam a pipeline (`push`, `workflow_dispatch`, `schedule`). O agendamento serve como teste de regressão periódico, mesmo sem commits.
- **Runner:** máquina virtual (`ubuntu-latest`) provisionada pelo GitHub para a execução.
- **Actions reutilizáveis:** checkout, setup-node e upload-artifact.
- **Artifacts:** arquivos gerados na execução e guardados pelo GitHub (aqui, retenção de 30 dias para o relatório).
- **Cache:** reaproveitamento das dependências do npm para acelerar a pipeline.
- **`concurrency`:** cancela execuções antigas da mesma branch quando chega um novo push.
- **`permissions` mínimas:** o workflow só tem leitura de conteúdo (princípio do menor privilégio).
- **Reporter e retries:** relatório Mochawesome e uma nova tentativa automática em modo `run` para reduzir flakiness.

## Evidência de execução

Após o push, a evidência está em **Actions** do repositório. Adicione aqui o link da execução bem-sucedida e um print:

- Execução: _colar link_
- Print do relatório / Job Summary: _colar imagem_

## Autora

Loriany Brasil
