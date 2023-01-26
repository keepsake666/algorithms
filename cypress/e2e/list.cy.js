import {border} from "./constants";

describe('тестирование компонента queue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу', function () {
        cy.get("[data-cy=\"input\"]").should('have.value', '')
        cy.get("[data-cy=\"button_add_head\"]").should('be.disabled')
        cy.get("[data-cy=\"button_add_tail\"]").should('be.disabled')
        cy.get("[data-cy=\"button_add_index\"]").should('be.disabled')
    });
    it('отрисовки дефолтного списка', function () {
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length.above', 2)
    });
    it('добавления элемента в head и удаление из head', function () {
        cy.clock()
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length.above', 2)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                        .prev()
                        .should('have.text', 'head')
                    cy.get("[data-cy=\"input\"]").type('q').should('have.value', 'q')
                    cy.get("[data-cy=\"button_add_head\"]").should('not.be.disabled').click()
                    cy.wrap(item)
                        .prev()
                        .should('have.text', 'q')
                    cy.tick(500)
                    cy.wrap(item)
                        .should('have.css', 'border', border.modified)
                        .and('have.text', 'q')
                    cy.tick(500)
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                    cy.get("[data-cy=\"button_delete_head\"]").should('not.be.disabled').click()
                    cy.wrap(item)
                        .should('have.css', 'border', border.modified)
                        .and('have.text', '')
                        .prev()
                        .should('have.text', 'q')
                    cy.tick(500)
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                        .and('not.have.text', 'q')
                }
            })
    });
    it('добавления элемента в tail и удаления из tail', function () {
        cy.clock()
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length.above', 2)
            .eq(-1)
            .should('have.css', 'border', border.default)
        cy.get("[data-cy=\"input\"]").type('q').should('have.value', 'q')
        cy.get("[data-cy=\"button_add_tail\"]").should('not.be.disabled').click()
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .eq(-1)
            .should('have.css', 'border', border.changing)
            .and('have.text', 'q')
        cy.tick(500)
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .eq(-1)
            .should('have.css', 'border', border.modified)
        cy.tick(500)
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .eq(-1)
            .should('have.css', 'border', border.default)
        cy.get("[data-cy=\"button_delete_tail\"]").should('not.be.disabled').click()
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .eq(-1)
            .should('have.css', 'border', border.modified)
            .and('have.text', '')
            .prev()
            .should('have.text', 'q')
        cy.tick(500)
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .eq(-1)
            .should('have.css', 'border', border.default)
            .and('not.have.text', 'q')
    });
    it('добавления элемента по индексу и удаление по индексу', function () {
        cy.clock()
        cy.get("[data-cy=\"input\"]").type('q').should('have.value', 'q')
        cy.get("[data-cy=\"button_add_index\"]").should('not.be.disabled').click()
        cy.tick(500)
        cy.get("p[data-cy=\"circle_text\"]").parent()
            .should('have.length.above', 2)
            .each((item, index) => {
                if (index === 0) {
                    cy.wrap(item)
                        .should('have.text', 'q')
                        .and('have.css', 'border', border.modified)
                    cy.tick(500)
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                    cy.get("[data-cy=\"button_delete_index\"]").should('not.be.disabled').click()
                    cy.wrap(item)
                        .should('have.css', 'border', border.changing)
                    cy.tick(500)
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                        .and('have.text', '')
                        .prev()
                        .should('have.text', 'q')
                    cy.tick(500)
                    cy.wrap(item)
                        .should('not.have.text', 'q')
                }
            })
    });
});