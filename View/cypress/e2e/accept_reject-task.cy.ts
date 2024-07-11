Cypress.Commands.add('login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/signin', // Your actual login endpoint
      body: {
        email: 'admin@isep.ipp.pt', // Use a valid email
        password: 'admin1234'    // Use a valid password
      }
    }).then((resp) => {
      window.localStorage.setItem('authToken', resp.body.token); // Store the token
    });
  });
  describe('WaitingRequestsComponent', () => {
    beforeEach(() => {
     cy.login(); 
      cy.visit('/task-menu/waiting'); 
    });
  
    it('displays pickup delivery and vigilance tasks', () => {
      cy.get('.table').should('have.length', 2); // Assuming there are two tables
    });

    it('displays correct data in pickup delivery tasks table', () => {
        cy.get('.table').first().find('tr').should('have.length.at.least', 1); // Adjust depending on expected minimum rows
        // Further assertions to check the content of the rows can be added here
      });
    
      it('displays correct data in vigilance tasks table', () => {
        cy.get('.table').eq(1).find('tr').should('have.length.at.least', 1); // Adjust similarly
      });
  });
  