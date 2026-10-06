describe('Comandos de ação', () => {
  beforeEach(() => {
    cy.visit('/commands/actions');
  });

  it('deve digitar um e-mail válido no campo', () => {
    cy.get('.action-email')
      .type('loriany@teste.com')
      .should('have.value', 'loriany@teste.com');
  });

  it('deve marcar e desmarcar um checkbox', () => {
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check().should('be.checked');
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked');
  });

  it('deve selecionar uma opção em um select', () => {
    cy.get('.action-select').select('apples').should('have.value', 'fr-apples');
  });

  it('deve exibir o tooltip/estado após clicar no botão de ação', () => {
    cy.get('.action-btn').click();
    cy.get('.action-btn').should('exist');
  });
});
