import {border} from "./constants";

describe('тестирование компонента stack', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/stack')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get("[data-cy=\"input\"]").should('have.value', '')
        cy.get("[data-cy=\"button_add\"]").should('be.disabled')
    });
    it('правильность добавления элемента в стек', function () {
        cy.clock()
        cy.get("[data-cy=\"input\"]").type("1").should('have.value', '1')
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click().should('be.disabled')
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length', 1)
            .each((item) => {
                cy.wrap(item)
                    .should('have.text', '1')
                    .and('have.css', 'border', border.changing)
                cy.get("[data-cy=\"circle_head\"]").should('have.text', 'top')
                cy.tick(500)
                cy.wrap(item).should('have.css', 'border', border.default)
            })
        cy.get("[data-cy=\"input\"]").type("2").should('have.value', '2')
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click().should('be.disabled')
        cy.get("p[data-cy=\"circle_text\"]").parent()
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
                    cy.get("[data-cy=\"circle_head\"]").should('have.text', 'top')
                    cy.tick(500)
                    cy.wrap(item).should('have.css', 'border', border.default)
                }
            })
        cy.get("[data-cy=\"input\"]").type("3").should('have.value', '3')
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click().should('be.disabled')
        cy.get("p[data-cy=\"circle_text\"]").parent()
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
                    cy.get("[data-cy=\"circle_head\"]").should('have.text', 'top')
                    cy.tick(500)
                    cy.wrap(item).should('have.css', 'border', border.default)
                }
            })

    });
    it('правильность удаления элемента из стека', () => {
        cy.clock()
        cy.get("[data-cy=\"input\"]").type("1")
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click()
        cy.tick(500)
        cy.get("[data-cy=\"input\"]").type("2")
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click()
        cy.tick(500)
        cy.get("[data-cy=\"input\"]").type("3")
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click()
        cy.tick(500)
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length', 3)
        cy.get("[data-cy=\"button_delete\"]").should('not.disabled').click()

        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length', 3)
            .each((item, index) => {
                if (index === 2) {
                    cy.wrap(item)
                        .should('have.text', '3')
                        .and('have.css', 'border', border.changing)
                    cy.tick(500)
                    cy.get("p[data-cy=\"circle_text\"]").parent()
                        .should('have.length', 2)
                }
            })
    })
    it(' поведение кнопки «Очистить»', () => {
        cy.clock()
        cy.get("[data-cy=\"input\"]").type("1")
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click()
        cy.tick(500)
        cy.get("[data-cy=\"input\"]").type("2")
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click()
        cy.tick(500)
        cy.get("[data-cy=\"input\"]").type("3")
        cy.get("[data-cy=\"button_add\"]").should('not.disabled').click()
        cy.tick(500)
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length', 3)
        cy.get("[data-cy=\"button_delete\"]").should('not.disabled').click()

        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length', 3)
        cy.tick(4000)
        cy.get("[data-cy=\"button_clear\"]").should('not.disabled').click()
        cy.tick(500)
        cy.get("p[data-cy=\"circle_text\"]").should('not.be.exist')
    });
});
