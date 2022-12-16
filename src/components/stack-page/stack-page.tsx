import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "../stack-page/stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./classStack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TLoading } from "../../types/stack";
import {delay} from "../../utils";
const stack = new Stack<string>();
export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<TLoading>({
    push: false,
    pop: false,
    clear: false,
  });
  const [arr, setArr] = useState<string[]>([]);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const minLen = !value.length;
  const push = async (item: string) => {
    setLoading({ push: true, pop: false, clear: false });
    stack.push(item);
    setArr(stack.getContainer());
    setValue("");
    await delay(SHORT_DELAY_IN_MS);
    setCurrIndex(currIndex + 1);
    setLoading({ push: false, pop: false, clear: false });
  };

  const pop = async () => {
    setLoading({ push: false, pop: true, clear: false });
    setCurrIndex(stack.getSize() - 1);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArr([...stack.getContainer()]);
    setLoading({ push: false, pop: false, clear: false });
  };

  const clear = async () => {
    setLoading({ push: false, pop: false, clear: true });
    stack.clear();
    setArr(stack.getContainer());
    setCurrIndex(0);
    await delay(SHORT_DELAY_IN_MS);
    setLoading({ push: false, pop: false, clear: false });
  };
  return (
      <SolutionLayout title="Стек">
        <div className={style.container}>
          <form className={style.form} onSubmit={event => event.preventDefault()}>
            <Input
                value={value}
                type={"text"}
                maxLength={4}
                isLimitText={true}
                extraClass={style.input}
                onChange={changeValue}
            />{" "}
            <Button
                text="Добавить"
                extraClass="mr-6"
                onClick={() => push(value)}
                isLoader={loading.push}
                disabled={loading.pop || loading.clear || minLen}
            />
            <Button
                text="Удалить"
                extraClass="mr-40"
                onClick={pop}
                isLoader={loading.pop}
                disabled={loading.push || loading.clear || !arr.length}
            />
            <Button
                text="Очистить"
                onClick={clear}
                isLoader={loading.clear}
                disabled={loading.push || loading.pop || !arr.length}
            />
          </form>
          <ul className={style.list}>
            {arr.map((item, index) => (
                <li key={index} className={style.list__item}>
                  <Circle
                      head={stack.peak() === index ? "top" : ""}
                      letter={`${item}`}
                      index={index}
                      state={
                        index === currIndex
                            ? ElementStates.Changing
                            : ElementStates.Default
                      }
                  ></Circle>
                </li>
            ))}
          </ul>
        </div>
      </SolutionLayout>
  );
};
