describe('Asserções e consulta de elementos', () => {
  beforeEach(() => {
    cy.visit('/commands/querying');
  });

  it('deve localizar elemento por id', () => {
    cy.get('#query-btn').should('contain', 'Button');
  });

  it('deve localizar elementos por classe e validar quantidade', () => {
    cy.get('.query-list li').should('have.length.greaterThan', 2);
  });

  it('deve encontrar elemento dentro de um escopo com within', () => {
    cy.get('.query-form').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Email');
    });
  });
});
