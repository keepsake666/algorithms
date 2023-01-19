import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {Button} from "../button/button";
import {ElementStates} from "../../../types/element-states";

describe('Тестирование компонента Circle:', () => {
    it("без буквы", () => {
        const circle = renderer.create(<Circle />)
        expect(circle).toMatchSnapshot();
    })
    it("с буквами", () => {
        const circle = renderer.create(<Circle letter={'test'} />)
        expect(circle).toMatchSnapshot();
    })
    it("с head", () => {
        const circle = renderer.create(<Circle head={'test'} />)
        expect(circle).toMatchSnapshot();
    })
    it("с react-элементом в head", () => {
        const circle = renderer.create(<Circle head={<Button />} />)
        expect(circle).toMatchSnapshot();
    })
    it("с tail", () => {
        const circle = renderer.create(<Circle tail={"test"} />)
        expect(circle).toMatchSnapshot();
    })
    it("с react-элементом в tail", () => {
        const circle = renderer.create(<Circle tail={<Button />} />)
        expect(circle).toMatchSnapshot();
    })
    it("с index", () => {
        const circle = renderer.create(<Circle index={1} />)
        expect(circle).toMatchSnapshot();
    })
    it("с пропом isSmall ===  true", () => {
        const circle = renderer.create(<Circle isSmall={true} />)
        expect(circle).toMatchSnapshot();
    })
    it("в состоянии default", () => {
        const circle = renderer.create(<Circle state={ElementStates.Default} />)
        expect(circle).toMatchSnapshot();
    })
    it("в состоянии modified", () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified} />)
        expect(circle).toMatchSnapshot();
    })
    it("в состоянии changing", () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing} />)
        expect(circle).toMatchSnapshot();
    })
})