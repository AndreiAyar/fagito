describe('Homepage load', () => {
	it('Visits', () => {
		cy.visit('http://127.0.0.1:4173/');
	});

	it('Should have Latest Recipes category', () => {
		cy.get('#latest-recipes h1').contains('Latest Recepies From Our Users');
	});

	it('Should have 6 recepies loaded', () => {
		cy.get('#recepies-grid').children().should('have.length', 6);
	});
});

describe('Login page', () => {
	it('Visits', () => {
		cy.visit('http://127.0.0.1:4173/login');
	});
	it('Should login with default user', () => {
		cy.wait(500);
		cy.get('#email', {
			timeout: 5000
		}).should('be.visible');
	});

	it('Should login with default user', () => {
		cy.get('#email').click();
		cy.get('#email').type('nopermissionuser@fagito.com');
	});
	it('Should login with default user', () => {
		cy.get('#password').type('nopermissionblank').type('{enter}');
	});
	it('Should redirect to account', () => {
		cy.location('pathname').should('include', '/account');
	});
});
