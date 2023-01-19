describe('Тестирование работоспособности приложения', () => {
    it('поднялось localhost:3000', function () {
        cy.visit('http://localhost:3000');
    });
})