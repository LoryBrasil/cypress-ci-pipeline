// Gera um resumo em Markdown dos testes a partir dos JSONs do mochawesome
// e escreve no "Job Summary" do GitHub Actions ($GITHUB_STEP_SUMMARY).
const fs = require('fs');
const path = require('path');

// Procura recursivamente JSONs do mochawesome (com "stats") em cypress/reports
function findJsons(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return findJsons(p);
    return e.name.endsWith('.json') ? [p] : [];
  });
}

let tests = 0, passes = 0, failures = 0, pending = 0, duration = 0;
for (const f of findJsons(path.join('cypress', 'reports'))) {
  try {
    const { stats } = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (!stats) continue;
    tests += stats.tests; passes += stats.passes; failures += stats.failures;
    pending += stats.pending; duration += stats.duration;
  } catch (e) { /* ignora JSON inválido */ }
}

const status = failures === 0 && tests > 0 ? '✅ Sucesso' : '❌ Falha';
const md = [
  '## 🧪 Resultado dos testes E2E (Cypress)',
  '',
  `**Status:** ${status}`,
  '',
  '| Total | Passou | Falhou | Pendentes | Duração |',
  '|:-----:|:------:|:------:|:---------:|:-------:|',
  `| ${tests} | ${passes} | ${failures} | ${pending} | ${(duration / 1000).toFixed(1)}s |`,
  '',
  'O relatório HTML completo está disponível em **Artifacts** desta execução (`relatorio-cypress`).',
  '',
].join('\n');

console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
