describe('проверки работы роутинга', function() {
    beforeEach(function() {
        cy.visit('/');
    });
    it('страница компонента строки', ()=> {
        cy.get('a[href*="/recursion"]').click()
        cy.contains("Строка")
    })
    it('страница компонента последовательность Фибоначчи', ()=> {
        cy.get('a[href*="/fibonacci"]').click()
        cy.contains("Последовательность Фибоначчи")
    })
    it('страница компонента сортировка массива', ()=> {
        cy.get('a[href*="/sorting"]').click()
        cy.contains("Сортировка массива")
    })
    it('страница компонента стек', ()=> {
        cy.get('a[href*="/stack"]').click()
        cy.contains("Стек")
    })
    it('страница компонента очередь', ()=> {
        cy.get('a[href*="/queue"]').click()
        cy.contains("Очередь")
    })
    it('страница компонента связный список', ()=> {
        cy.get('a[href*="/list"]').click()
        cy.contains("Связный список")
    })
});