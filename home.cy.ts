describe('Página inicial', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir o título principal da página', () => {
    cy.get('h1').should('contain.text', 'Kitchen Sink');
  });

  it('deve exibir o menu de comandos', () => {
    cy.contains('.navbar-nav a, .dropdown-toggle', 'Commands').should('be.visible');
  });

  it('deve navegar para a página de ações ao clicar em "actions"', () => {
    cy.contains('.home-list a', 'type').click();
    cy.url().should('include', '/commands/actions');
  });
});
