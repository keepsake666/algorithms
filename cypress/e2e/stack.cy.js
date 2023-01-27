import {border, button_add, button_clear, button_delete, circle_head, circle_text, input} from "./constants";

describe('тестирование компонента stack', () => {
    beforeEach(() => {
        cy.visit('stack')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get(input).should('have.value', '')
        cy.get(button_add).should('be.disabled')
    });
    it('правильность добавления элемента в стек', function () {
        cy.clock()
        cy.get(input).type("1").should('have.value', '1')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.get(circle_text).parent()
            .should('have.length', 1)
            .each((item) => {
                cy.wrap(item)
                    .should('have.text', '1')
                    .and('have.css', 'border', border.changing)
                cy.get(circle_head).should('have.text', 'top')
                cy.tick(500)
                cy.wrap(item).should('have.css', 'border', border.default)
            })
        cy.get(input).type("2").should('have.value', '2')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.get(circle_text).parent()
            .should('have.length', 2)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.text', '1')
                        .and('have.css', 'border', border.default)
                        .prev()
                        .should('have.text', '')
                } else if (index === 1) {
                    cy.wrap(item)
                        .should('have.text', '2')
                        .and('have.css', 'border', border.changing)
                    cy.get(circle_head).should('have.text', 'top')
                    cy.tick(500)
                    cy.wrap(item).should('have.css', 'border', border.default)
                }
            })
        cy.get(input).type("3").should('have.value', '3')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.get(circle_text).parent()
            .should('have.length', 3)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.text', '1')
                        .and('have.css', 'border', border.default)
                        .prev()
                        .should('have.text', '')
                } else if (index === 1) {
                    cy.wrap(item)
                        .should('have.text', '2')
                        .and('have.css', 'border', border.default)
                        .prev()
                        .should('have.text', '')
                } else if (index === 2) {
                    cy.wrap(item)
                        .should('have.text', '3')
                        .and('have.css', 'border', border.changing)
                    cy.get(circle_head).should('have.text', 'top')
                    cy.tick(500)
                    cy.wrap(item).should('have.css', 'border', border.default)
                }
            })

    });
    it('правильность удаления элемента из стека', () => {
        cy.clock()
        cy.get(input).type("1")
        cy.get(button_add).should('not.disabled').click()
        cy.tick(500)
        cy.get(input).type("2")
        cy.get(button_add).should('not.disabled').click()
        cy.tick(500)
        cy.get(input).type("3")
        cy.get(button_add).should('not.disabled').click()
        cy.tick(500)
        cy.get(circle_text).parent()
            .should('have.length', 3)
        cy.get(button_delete).should('not.disabled').click()

        cy.get(circle_text).parent()
            .should('have.length', 3)
            .each((item, index) => {
                if (index === 2) {
                    cy.wrap(item)
                        .should('have.text', '3')
                        .and('have.css', 'border', border.changing)
                    cy.tick(500)
                    cy.get(circle_text).parent()
                        .should('have.length', 2)
                }
            })
    })
    it(' поведение кнопки «Очистить»', () => {
        cy.clock()
        cy.get(input).type("1")
        cy.get(button_add).should('not.disabled').click()
        cy.tick(500)
        cy.get(input).type("2")
        cy.get(button_add).should('not.disabled').click()
        cy.tick(500)
        cy.get(input).type("3")
        cy.get(button_add).should('not.disabled').click()
        cy.tick(500)
        cy.get(circle_text).parent()
            .should('have.length', 3)
        cy.get(button_delete).should('not.disabled').click()

        cy.get(circle_text).parent()
            .should('have.length', 3)
        cy.tick(4000)
        cy.get(button_clear).should('not.disabled').click()
        cy.tick(500)
        cy.get(circle_text).should('not.be.exist')
    });
});
