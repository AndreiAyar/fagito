describe('Homepage load', () => {
  it('Visits', () => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('Should have Latest Recipes category', () => {
    cy.get('#latest-recipes h1').contains("Latest Recepies From Our Users") 
  })

  it('Should have 6 recepies loaded', () => {
    cy.get('#recepies-grid').children().should('have.length', 6)
  })
})

// describe('Login page', () => {
//   it('Visits', () => {
//     cy.visit('http://127.0.0.1:5173/login')
//   })

//   it('Should have Latest Recipes category', () => {
//     cy.get('#latest-recipes h1').contains("Latest Recepies From Our Users") 
//   })

//   it('Should have 6 recepies loaded', () => {
//     cy.get('#recepies-grid').children().should('have.length', 6)
// //   })
// })