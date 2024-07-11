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


describe('UpdateUserComponent', () => {
  beforeEach(() => {
    cy.login(); // Assuming you have a login command
    cy.visit('/user-menu/update-user');
  });

  it('allows a user to update their information', () => {
    // Stub the API call for updating user details
    cy.intercept('PATCH', 'http://localhost:3000/api/users/update/*', {}).as('updateUser');

    // Fill out the form
    cy.get('#firstName').type('NewFirstName');
    cy.get('#lastName').type('NewLastName');
    cy.get('#password').type('NewPassword');
    cy.get('#phone').type('123456789');

    // Submit the form
    cy.get('form').submit();

    // Verify the API call
    cy.wait('@updateUser').its('request.body').should('deep.equal', {
      email: 'admin@isep.ipp.pt', // Assuming this is the logged-in user's email
      firstName: 'NewFirstName',
      lastName: 'NewLastName',
      password: 'NewPassword',
      phone: '123456789'
    });
  });
});