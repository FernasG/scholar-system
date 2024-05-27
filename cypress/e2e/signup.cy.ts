describe('Formulário de Cadastro', () => {
  it('deve enviar o formulário de cadastro com credenciais válidas', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#username').type('Usuário de Teste');

    cy.wait(500);

    cy.get('#email').type('emailvalido6@email.com');

    cy.wait(500);

    cy.get('#password').type('Senha123!');

    cy.wait(500);

    cy.get('#confirm-password').type('Senha123!');

    cy.wait(500);

    cy.get('button[type="button"]').click();

    cy.wait(500);

    cy.get('.alert-success').should('be.visible');
   
  });

  it('deve mostrar mensagem de erro de nome de usuário em nome de usuário inválido', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#username').type('Teste');

    cy.wait(500);

    cy.get('button[type="button"]').click();

    cy.wait(500);

    cy.get('#username-error').should('be.visible');
    cy.get('#username-error').should('contain', 'O nome de usuário deve ter pelo menos 10 caracteres.');
  });

  it('deve mostrar mensagem de erro de e-mail em e-mail inválido', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#email').type('email_invalido');

    cy.wait(500);

    cy.get('button[type="button"]').click();

    cy.get('#email-error').should('be.visible');
    cy.get('#email-error').should('contain', 'Por favor, insira um email válido.');
  });

  it('deve mostrar mensagem de erro de senha em senha inválida', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#password').type('senha');

    cy.wait(500);

    cy.get('button[type="button"]').click();

    cy.get('#password-error').should('be.visible');
    cy.get('#password-error').should('contain', 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
  });

  it('deve mostrar mensagem de erro de confirmação de senha em caso de incompatibilidade de senha', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('#username').type('Usuário de Teste');

    cy.get('#email').type('usuariodeteste@exemplo.com');

    cy.get('#password').type('Senha123!');

    cy.wait(500);

    cy.get('#confirm-password').type('SenhaDiferente');

    cy.wait(500);

    cy.get('button[type="button"]').click();

    cy.get('#confirm-password-error').should('be.visible');
    cy.get('#confirm-password-error').should('contain', 'As senhas não coincidem.');
  });
});
