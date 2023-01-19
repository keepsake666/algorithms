describe('тестирование компонента строка', ()=> {
    beforeEach(()=> {
        cy.visit('http://localhost:3000/recursion')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get("[data-cy=\"input\"]").should('have.value', '')
        cy.get("[data-cy=\"button\"]").should('be.disabled')
    });
    it('строка разворачивается корректно', function () {
        cy.get("[data-cy=\"input\"]").type('qwer').should('have.value', 'qwer')
        cy.get("[data-cy=\"button\"]").should('not.disabled').click().should('be.disabled')
        cy.get("ul")
    });
})