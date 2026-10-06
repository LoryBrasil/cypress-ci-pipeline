import { defineConfig } from 'cypress';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mochawesomePlugin = require('cypress-mochawesome-reporter/plugin');

export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  retries: { runMode: 1, openMode: 0 },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'index',
    reportPageTitle: 'Relatório de Testes E2E - Cypress',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
  },
  e2e: {
    baseUrl: 'https://example.cypress.io',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {
      mochawesomePlugin(on);
    },
  },
});
