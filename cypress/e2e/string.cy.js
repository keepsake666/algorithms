import {border, button, circle_text, input} from "./constants";

describe('тестирование компонента строка', () => {
    beforeEach(() => {
        cy.visit('recursion')
    })
    it('если в инпуте пусто, то кнопка добавления недоступна', function () {
        cy.get(input).should('have.value', '')
        cy.get(button).should('be.disabled')
    });

    it('строка разворачивается корректно', function () {
        cy.clock()
        const string = 'qwert';
        cy.get(input).type(string)
        cy.get(button).should('not.disabled').click().should('be.disabled')
        cy.get(circle_text).parent()
            .should('have.length', '5')
            .each((item, index) => {
                if (index === 0 || index === 4) {
                    cy.wrap(item)
                        .should('have.css', 'border', border.changing)
                        .and('have.text', string[index]);
                } else {
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                        .and('have.text', string[index]);
                }
            });
        cy.tick(1000)
            .then(() => {
            })
            .get(circle_text)
            .parent()
            .each((item, index) => {
                if (index === 0 || index === 4) {
                    cy.wrap(item)
                        .should('have.css', 'border', border.changing)
                        .and('have.text', string[string.length - 1 - index]);
                } else {
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                        .and('have.text', string[index]);
                }
            });
        cy.tick(1000)
            .then(() => {
            })
            .get(circle_text)
            .parent()
            .each((item, index) => {
                if (index === 0 || index === 4) {
                    cy.wrap(item)
                        .should('have.css', 'border', border.modified)
                        .and('have.text', string[string.length - 1 - index]);
                } else if (index === 1 || index === 3) {
                    cy.wrap(item)
                        .should('have.css', 'border', border.changing)
                        .and('have.text', string[string.length - 1 - index]);
                } else {
                    cy.wrap(item)
                        .should('have.css', 'border', border.default)
                        .and('have.text', string[index]);
                }
            });
        cy.tick(1000)
            .then(() => {
            })
            .get(circle_text)
            .parent()
            .each((item, index) => {
                cy.wrap(item)
                    .should('have.css', 'border', border.modified)
                    .and('have.text', string[string.length - 1 - index])
            });
    });
})