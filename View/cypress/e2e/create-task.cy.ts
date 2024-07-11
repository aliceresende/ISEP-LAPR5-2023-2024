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

beforeEach(() => {
  cy.login(); // Log in before each test
  cy.visit('/user-menu/create-task'); // Visit the protected route
});

describe('CreateTasksComponent', () => {
  beforeEach(() => {
    cy.visit('/user-menu/create-task');
  });

  it('should display the task creation form', () => {
    cy.get('form').should('exist');
    cy.get('select[formControlName="taskType"]').should('exist');
  });

  it('should dynamically display fields for Vigilance when selected', () => {
    cy.get('select[formControlName="taskType"]').select('vigilance');
    cy.get('div[formGroupName="vigilance"]').should('exist');
  });

  it('should dynamically display fields for Pickup and Delivery when selected', () => {
    cy.get('select[formControlName="taskType"]').select('pickupanddelivery');
    cy.get('div[formGroupName="pickupanddelivery"]').should('exist');
  });

  it('should allow submission of a Vigilance task', () => {
    cy.get('select[formControlName="taskType"]').select('vigilance');
    cy.get('button[type="submit"]').click();
  });

  it('should allow submission of a Pickup and Delivery task', () => {
    cy.get('select[formControlName="taskType"]').select('pickupanddelivery');
    // ...
    cy.get('button[type="submit"]').click();
  });

});
