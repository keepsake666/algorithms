import {expand} from "./utils";

describe('Тестирование алгоритма разворота строки. Корректно разворачивает строку:', () => {
    it('с чётным количеством символов', () => {
        const test =  expand("qwer");
        expect(test).toBe("rewq");
    })
    it('с нечетным количеством символов', () => {
        const test =  expand("qwe");
        expect(test).toBe("ewq");
    })
    it('с одним символом', () => {
        const test =  expand('q');
        expect(test).toBe("q");
    })
    it('с пустую строку', () => {
        const test =  expand('');
        expect(test).toBe('');
    })
})