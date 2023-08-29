/// <reference types="cypress" />

describe('login - Testes da API Serverest', ()=> {

  it.only('Deve fazer login com sucesso', () => {
  cy.request({
    Method:'POST',
    url:'login',
    Body: {
      "email": "fulano@qa.com",
      "password": "teste"
    }

  }).then((Response) => {
expect(Response.status).to.equal(200)
cy.log('Não gerou o token')
  })

  });

  });
