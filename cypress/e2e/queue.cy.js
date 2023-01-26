import {border, button_add, button_clear, button_delete, circle_text, input} from "./constants";

describe('тестирование компонента queue', () => {
    beforeEach(() => {
        cy.visit('queue')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get(input).should('have.value', '')
        cy.get(button_add).should('be.disabled')
    });
    it('правильность добавления элемента в очередь', function () {
        cy.clock()
        cy.get(input).type("1").should('have.value', '1')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.get(circle_text).parent()
            .should('have.length', 6)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.text', '')
                        .and('have.css', 'border', border.changing)
                        .prev()
                        .should('have.text', 'head')
                        .next().next().next()
                        .should('have.text', 'tail')
                    cy.tick(500)
                    cy.wrap(item).should('have.text', '1')
                        .and('have.css', 'border', border.default)
                }
            })
        cy.get(input).type("2").should('have.value', '2')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.get(circle_text).parent()
            .should('have.length', 6)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.text', '1')
                        .and('have.css', 'border', border.default)
                        .prev()
                        .should('have.text', 'head')
                        .next().next().next()
                        .should('have.text', '')
                } else if (index === 1) {
                    cy.wrap(item)
                        .should('have.text', '')
                        .and('have.css', 'border', border.changing)
                        .prev()
                        .should('have.text', '')
                        .next().next().next()
                        .should('have.text', 'tail')
                    cy.tick(500)
                    cy.wrap(item).should('have.text', '2')
                        .and('have.css', 'border', border.default)
                }
            })
    });
    it(' правильность удаления элемента из очереди ', function () {
        cy.clock()
        cy.get(input).type("1").should('have.value', '1')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.tick(500)
        cy.get(input).type("2").should('have.value', '2')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.tick(500)
        cy.get(circle_text).parent()
            .should('have.length', 6)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.text', '1')
                } else if (index === 1) {
                    cy.wrap(item)
                        .should('have.text', '2')
                }
            })
        cy.get(button_delete).click()
        cy.get(circle_text).parent()
            .should('have.length', 6)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.text', '1')
                        .and('have.css', 'border', border.changing)
                        .prev()
                        .should('have.text', '')
                        .next().next().next()
                        .should('have.text', '')
                    cy.tick(500)
                    cy.wrap(item)
                        .should('have.text', '')
                        .and('have.css', 'border', border.default)
                } else if (index === 1) {
                    cy.wrap(item)
                        .should('have.text', '2')
                        .and('have.css', 'border', border.default)
                        .prev()
                        .should('have.text', 'head')
                        .next().next().next()
                        .should('have.text', 'tail')
                }
            })
    });
    it('поведение кнопки «Очистить» ', function () {
        cy.clock()
        cy.get(input).type("1").should('have.value', '1')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.tick(500)
        cy.get(input).type("2").should('have.value', '2')
        cy.get(button_add).should('not.disabled').click().should('be.disabled')
        cy.tick(500)
        cy.get(button_clear).click()
        cy.get(circle_text).parent()
            .should('have.length', 6)
            .each((item) => {
                cy.wrap(item)
                    .should('have.text', '')
            })
    });
});