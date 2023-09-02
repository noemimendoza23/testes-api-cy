/// <reference types="cypress" />

describe('login - Testes da API Serverest', ()=> {
  it.only('Deve fazer login com sucesso', () => {
    cy.request({
    method: 'POST',
    url: 'http://localhost:3000/login',
    body: {
          "email": "luiz_fernando@ebac.com.br",
          "password": "t1234"
          }

    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.message).to.equal('Login realizado com sucesso')
      cy.log(response.body.authorization)

      })

    
    });
    
    });
