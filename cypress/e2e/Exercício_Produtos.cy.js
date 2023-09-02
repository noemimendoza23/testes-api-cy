/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Teste da funcionalidade produtos', () => {
    let token
    before(() => {
    cy.token('luiz_fernando@ebac.com.br', 't1234').then(tkn => {token = tkn})
    });

    it.only('Deve validar contrato de produtos', () => {
    cy.request('produtos').then(response => {
        return contrato.validateAsync(response.body)

    })
});


    it('Listar produtos', () => {
    cy.request({
        method: 'GET',
        url: 'produtos',
    }).then((response) => {
        expect(response.body.produtos[6].nome).to.equal('Mochila de Couro Social')
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('produtos')
        expect(response.duration).to.be.lessThan(15)
    })
    });


    it('Cadastrar produto', () => {
        let produto = `Acessorios Couro ${Math.floor(Math.random() * 100000000)}`
        cy.request({
        method: 'POST',
        url: 'Produtos',
        body: {
            "nome": produto,
            "preco": 1000,
            "descricao": "Novo Produto",
            "quantidade": 400
          },

        headers: {authorization: token}
            }).then((response) =>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    })
    });


    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
    cy.cadastrarProduto(token, "Mochila Preta", 300, "Descrição do produto novo", 200)
        
     .then((response) =>{
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')
    })
    });


    it('Deve editar um preoduto já cadastrado', () => {
        cy.request('produtos').then(response => {
        let id = response.body.produtos[1]._id
        cy.request({
            method: 'PUT',
            url: `produtos/${id}`,
            headers: {authorization: token},
            body: 
            {
                "nome": "Jaqueta de couro",
                "preco": 200,
                "descricao": "produto editado",
                "quantidade": 150
              }

        }).then((response) =>{
            expect(response.body.message).to.equal('Registro alterado com sucesso')
    })
    })
    });


    it('Deve cadastrar um produto cadastrado previamente', () => {
        let produto = `Acessorios Couro ${Math.floor(Math.random() * 100000000)}`
        cy.cadastrarProduto(token, produto, 300, "Descrição do produto novo", 200)
        .then(response => {
        let id = response.body._id

        cy.request({
            method: 'PUT',
            url: `produtos/${id}`,
            headers: {authorization: token},
            body: 
            {
                "nome": produto,
                "preco": 250,
                "descricao": "produto editado",
                "quantidade": 100
              }

        }).then((response) =>{
            expect(response.body.message).to.equal('Registro alterado com sucesso')
    })
    })
    });


    it('Deve deletar um produto previamente cadastrado', () => {
        let produto = `Acessorios Couro ${Math.floor(Math.random() * 100000000)}`
        cy.cadastrarProduto(token, produto, 300, "Descrição do produto novo", 200)
        .then(response => {
        let id = response.body._id
        cy.request({
            method: 'DELETE',
            url: `produtos/${id}`,
            headers: {authorization: token},

        }).then(response =>{
        expect(response.body.message).to.equal('Registro excluído com sucesso')
        expect(response.status).to.equal(200)
    })
    })
    });



});