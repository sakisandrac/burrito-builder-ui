describe('Users should see errors if anything goes wrong', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders'
    }).as('fetch-orders')
    .visit('http://localhost:3000/')
  })

  it('should display error message if user does not add name or any ingredients', () => {
    cy.wait('@fetch-orders').then(intercept => {
      cy.get('input').type('Nate')
      .get(':nth-child(15)').click()
      .get(':nth-child(15)').should('have.text','Please fill out entire order before subimtting!')
      .get('[name="beans"]').click()
      .get(':nth-child(15)').click()
      .get(':nth-child(15)').should('have.text','Please fill out entire order before subimtting!')
    })
  })
})