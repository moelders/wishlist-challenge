describe('Products', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should not redirect to next page if the authentication fails', () => {
    cy.get('.form-group').find('input').clear();

    cy.get('.form-group input#userNameField[type="text"]')
      .type('user-name')
      .should('have.value', 'user-name');
    cy.get('.form-group input#passwordField[type="password"]')
      .type('user-password')
      .should('have.value', 'user-password');

    return cy.url()
    .then((url) => {
      cy.get('.login').get('.modal .modal__footer .btn').click();

      cy.url().should('eq', url);
    });
  });
});
