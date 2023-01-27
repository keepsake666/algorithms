import {bubbleSort, selectionSort} from "./utils";
describe('Тестирование алгоритмов сортировки выбором и пузырьком. Корректно сортирует:', ()=> {
    it('пустой массив. Сортировка пузырьком',  ()=> {
        const test =  bubbleSort([]);
        expect(test).toStrictEqual([]);
    });
    it('массив из одного элемента. Сортировка пузырьком',  ()=> {
        const test =  bubbleSort([5]);
        expect(test).toStrictEqual([5]);
    });
    it('массив из нескольких элементов. Сортировка пузырьком',  ()=> {
        const test =  bubbleSort([5,4,6,2,3,1]);
        expect(test).toStrictEqual([6,5,4,3,2,1]);
    });
    it('пустой массив. Сортировка выбором',  ()=> {
        const test =  selectionSort([]);
        expect(test).toStrictEqual([]);
    });
    it('массив из одного элемента. Сортировка выбором',  ()=> {
        const test =  selectionSort([5]);
        expect(test).toStrictEqual([5]);
    });
    it('массив из нескольких элементов. Сортировка выбором',  ()=> {
        const test =  selectionSort([5,4,6,2,3,1]);
        expect(test).toStrictEqual([6,5,4,3,2,1]);
    });
})