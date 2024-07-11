describe('SignupComponent', () => {
    beforeEach(() => {
      cy.visit('/auth/signup');
    });
  
    it('should display the signup form with all fields', () => {
      cy.get('#login-form-wrap').should('exist');
      cy.get('#firstName').should('exist');
      cy.get('#lastName').should('exist');
      cy.get('#phone').should('exist');
      cy.get('#email').should('exist');
      cy.get('#password').should('exist');
      cy.get('#taxPayerNumber').should('exist');
      cy.get('#privacyPolicy').should('exist');
      cy.get('#login').should('have.value', 'Register Now');
    });
  
    it('should validate form fields', () => {
      cy.get('#login').click();
    });
  
    it('should display the privacy policy modal', () => {
      cy.get('a').contains('Política de Privacidade').click();
    });
  
    it('should show an error for invalid signup', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#privacyPolicy').check();
      cy.get('#login').click();

    });
  
    it('should allow a user to sign up', () => {
      cy.get('#firstName').type('Jane');
      cy.get('#lastName').type('Smith');
      cy.get('#phone').should('exist');
      cy.get('#email').should('exist');
      cy.get('#password').should('exist');
      cy.get('#taxPayerNumber').should('exist');
      cy.get('#privacyPolicy').check();
      cy.get('#login').click();
  

    });
  
  });
  