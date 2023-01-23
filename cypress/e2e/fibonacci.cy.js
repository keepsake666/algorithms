import {border} from "./constants";

describe('тестирование компонента строка', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get("[data-cy=\"input\"]").should('have.value', 0)
        cy.get("[data-cy=\"button\"]").should('be.disabled')
    });
    it('числа генерируются корректно', ()=> {
        const res = [1,1,2,3,5,8]
        cy.get("[data-cy=\"input\"]").type(5).should('have.value', '05')
        cy.get("[data-cy=\"button\"]").should('not.disabled').click().should('be.disabled')
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length', '6')
            .each((item, index) => {
                cy.wrap(item)
                    .should('have.css', 'border', border.default)
                    .and('have.text', res[index])
            })
    })
});