import {border, button, circle_text, input} from "./constants";

describe('тестирование компонента fibonacci', () => {
    beforeEach(() => {
        cy.visit('fibonacci')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get(input).should('have.value', 0)
        cy.get(button).should('be.disabled')
    });
    it('числа генерируются корректно', ()=> {
        const res = [1,1,2,3,5,8]
        cy.get(input).type(5).should('have.value', '05')
        cy.get(button).should('not.disabled').click().should('be.disabled')
        cy.get(circle_text).parent()
            .should('have.length', '6')
            .each((item, index) => {
                cy.wrap(item)
                    .should('have.css', 'border', border.default)
                    .and('have.text', res[index])
            })
    })
});