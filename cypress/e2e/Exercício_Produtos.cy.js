/// <reference types="cypress" />

describe('Teste da funcionalidade produtos', () => {
    
    it('Listar produtos', () => {
        cy.request({
        method: 'GET',
        url: 'Produtos',
    }).then((Response) =>{
        expect(response.body.produtos[9].nome).to.equal('PRODUTO PRODUTO')
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('produtos')
        expect(response.duration).to.be.lessThan(20)
        })
    });

    it('Cadastrar produto', () => {
        
        cy.request({
        method: 'POST',
        url: 'Produtos',
        body: {
            "nome": "Produtos EBAC NOVO",
            "preco": 200,
            "descricao": "Produto novo",
            "quantidade": 100
          }

        })
    });



});