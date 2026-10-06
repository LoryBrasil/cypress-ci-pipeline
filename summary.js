// Gera um resumo em Markdown dos testes a partir dos JSONs do mochawesome
// e escreve no "Job Summary" do GitHub Actions ($GITHUB_STEP_SUMMARY).
const fs = require('fs');
const path = require('path');

const dir = path.join('cypress', 'reports', '.jsons');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')) : [];

let tests = 0, passes = 0, failures = 0, pending = 0, duration = 0;
for (const f of files) {
  const { stats } = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  tests += stats.tests; passes += stats.passes; failures += stats.failures;
  pending += stats.pending; duration += stats.duration;
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
