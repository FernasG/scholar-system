describe('Funcionalidade de Login', () => {
    it('deve redirecionar para a home', () => {
      cy.visit('http://localhost:3000/');
  
      cy.get('#email').type('emailvalido6@email.com');
  
      cy.get('#password').type('Senha123!');
  
      cy.get('button[type="button"]').click();
  
      cy.url().should('include', '/dashboard');
    });
  });
  