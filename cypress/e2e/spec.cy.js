describe("Users should be able to see order and add new orders", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders'
    }).as('fetch-orders')
    .visit('http://localhost:3000/')
  }) 

  it("should load existing orders when visitng page", () => {
    cy.wait('@fetch-orders').then(intercept => {
      cy.get('h1').should('have.text', 'Burrito Builder')
      .get('form').should('be.visible')
      .get('form').children().should('have.length', 15)
      .get('p').should('have.text', 'Order: Nothing selected')
      .get(':nth-child(15)').should('be.visible')
      .get('section > :nth-child(1)').should('be.visible')
      .get(':nth-child(1) > h3').should('have.text', 'Pat')
      .get(':nth-child(1) > .ingredient-list > :nth-child(1)').should('have.text', 'beans')
      .get(':nth-child(1) > .ingredient-list > :nth-child(2)').should('have.text', 'lettuce')
      .get(':nth-child(1) > .ingredient-list > :nth-child(3)').should('have.text', 'carnitas')
      .get(':nth-child(1) > .ingredient-list > :nth-child(4)').should('have.text', 'queso fresco')
      .get(':nth-child(1) > .ingredient-list > :nth-child(5)').should('have.text', 'jalapeno')
    })
  });

  it("should be able to add new ordres by filling out form", () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: { "id": 3, "name": "Sally", "ingredients": ["beans", "steak"] }
    }).as('fetch-orders2')

    cy.wait('@fetch-orders').then(intercept => {
      cy.get('input').type('Sally')
      cy.get('[name="beans"]').click()
      cy.get('[name="steak"]').click()
      cy.get('p').should('have.text', 'Order: beans, steak')
      cy.get(':nth-child(15)').click()
      cy.wait('@fetch-orders2').then(intercept => {
        cy.get(':nth-child(15)').should('have.text', 'Order sent successfully!')
        cy.get('section > :nth-child(2)').should('be.visible')
        cy.get(':nth-child(2) > h3').should('have.text', 'Sally')
        cy.get(':nth-child(2) > .ingredient-list > :nth-child(1)').should('have.text', 'beans')
        cy.get(':nth-child(2) > .ingredient-list > :nth-child(2)').should('have.text', 'steak')
      })
    })
  })  
});
