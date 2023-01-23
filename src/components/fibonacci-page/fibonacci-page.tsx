import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import style from "../fibonacci-page/fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils";
export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [fibonacci, setFibonacci] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
  const buttonDisabled = !(1 <= value && value <= 19);
  const fibIterative = async (n: number): Promise<void> => {
    let arr: number[] = [1, 1];
    setLoading(true);
    for (let i = 2; i <= n; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    for (let j = 0; j <= n; j++) {
      await delay(SHORT_DELAY_IN_MS);
      setFibonacci(arr.slice(0, j + 1));
    }
    setLoading(false);
  };
  const clickFib = () => {
    fibIterative(value);
    setValue(0);
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.form}>
        <Input
            data-cy="input"
            value={value}
            type={"number"}
            maxLength={2}
            max={19}
            isLimitText={true}
            extraClass={style.input}
            onChange={changeValue}
        />{" "}
        <Button
            data-cy="button"
            isLoader={loading}
            text="Расчитать"
            onClick={clickFib}
            disabled={buttonDisabled}
        />
      </div>
      <ul className={style.list}>
        {fibonacci.map((item, index) => (
            <li key={index} className={style.list__item}>
              <Circle letter={`${item}`}></Circle>
            </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
