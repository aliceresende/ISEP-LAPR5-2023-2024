describe('SigninComponent', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should display the signin form', () => {
    cy.get('#login-form-wrap').should('exist');
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('#login').should('exist');
  });


  it('should show an error for invalid login', () => {
    cy.get('#email').type('invaliduser@example.com');
    cy.get('#password').type('wrongpassword');
    cy.get('#login').click();

    cy.url().should('include', '/auth/signin');
  });

});
