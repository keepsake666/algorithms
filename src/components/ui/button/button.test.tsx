import renderer from "react-test-renderer";
import {Button} from "./button";
import { render, screen, fireEvent } from '@testing-library/react';

describe('тестирование компонента Button:', () => {
    it("кнопки с текстом", () => {
        const button = renderer.create(<Button />);

        expect(button).toMatchSnapshot();
    });
    it("кнопки без текста", () => {
        const button = renderer.create(<Button text="test"/>);

        expect(button).toMatchSnapshot();
    });
    it("заблокированной кнопки", () => {
        const button = renderer.create(<Button disabled={true}/>);

        expect(button).toMatchSnapshot();
    });
    it("кнопки с индикацией загрузки", () => {
        const button = renderer.create(<Button isLoader={true}/>);

        expect(button).toMatchSnapshot();
    });
    it("проверяем корректность вызова колбека при клике на кнопку", () => {
        window.alert = jest.fn();
        render(<Button onClick={() => {alert('Test')}} text="Test"/>);
        const button = screen.getByText("Test");
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith('Test');
    });
});