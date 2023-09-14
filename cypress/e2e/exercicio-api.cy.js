/// <reference types="cypress" />
import usuariosSchema from '../contracts/usuarios.contract';
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
          let token;
          before(() => {
          cy.token('luiz_fernando@ebac.com.br', 't1234').then(tkn => {token = tkn});
          });
     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
          return contrato.validateAsync(response.body)
                    })
                    });

     it('Deve listar usuários cadastrados', () => {
         cy.request({
          method: 'GET',
          url: 'usuarios',
          }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('usuarios')
          expect(response.duration).to.be.lessThan(20)
                    })
                    });

    it('Deve cadastrar um usuário com sucesso', () => {
     let usuario = `${Math.floor(Math.random() * 100000000)}`
     let email = `${usuario}@qa.com`
     console.log(email)
          cy.request({
          method: 'POST',
          url: 'usuarios',
          body: {
               "nome": usuario,
               "email": email,
               "password": "teste123",
               "administrador": "true"
             },
          headers: {authorization: token}
          }).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal('Cadastro realizado com sucesso')
                    })
                    });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario(token, 'Maria Clara', 'maria_clara@@yahoo.com.br', 'teste123', 'true')
          .then((response) => {
          expect(response.status).to.equal(400)
          expect(response.body.message).to.equal('email deve ser um email válido')
                    })
                    });


     it('Deve editar um usuário previamente cadastrado', () => {
          let usuario = `Usuario ${Math.floor(Math.random() * 100000000)}`
          cy.cadastrarUsuario(token, usuario, 'elomariasilva@qa.com.br', 'teste123', 'true')
          .then(response => {
          let id = response.body._id

          cy.request({
               method: 'PUT',
               url: `usuarios/${id}`,
               headers: {authorization: token},
               body: {
                    "nome": "Eloisa Maria Silva Editado",
                    "email": "elomariasilva@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
                  }
           }).then(response => {
               expect(response.body.message).to.equal('Registro alterado com sucesso')
           })
                    })
                    });


    it('Deve deletar um usuário previamente cadastrado', () => {
     let usuario = `Eloisa Santos ${Math.floor(Math.random() * 100000000)}`
     cy.cadastrarUsuario(token, usuario, 'maria_clara@yahoo.com.br', 'teste123', 'true')
     .then(response => {
          let id = response.body._id
          cy.request({
               method: 'DELETE',
               url: `usuarios/${id}`,
               headers: {authorization: token}
     }).then(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(400)
     })
     })
     });


});
