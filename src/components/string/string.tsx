import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "../string/string.module.css";
import { DELAY_IN_MS } from "../../constants/delays";
import { state } from "./utils";
import {delay} from "../../utils";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState("");
  const [reverseString, setReverseString] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const changeString = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value.trim());
  };

  const expand = async (
      str: string,
      start = 0,
      end = str.length - 1
  ): Promise<string[]> => {
    const splitString = str.split("");
    setReverseString([...splitString]);
    const mid: number = Math.floor(splitString.length / 2);
    setLoading(true);
    await delay(DELAY_IN_MS);
    while (start < mid) {
      let oneStart = splitString[start];
      splitString[start] = splitString[end];
      splitString[end] = oneStart;
      start++;
      end--;
      setReverseString([...splitString]);
      await delay(1000);
      setCurrentIndex((i) => i + 1);
    }
    setCurrentIndex((i) => i + 1);
    setLoading(false);
    return splitString;
  };
  const revers = () => {
    expand(string);
    setString("");
    setCurrentIndex(0);
  };
  return (
      <SolutionLayout title="Строка">
        <div className={style.form}>
          <Input
              data-cy="input"
              value={string}
              maxLength={11}
              max={0}
              isLimitText={true}
              extraClass={style.input}
              onChange={changeString}
          />{" "}
          <Button data-cy="button" isLoader={loading} text="Развернуть" onClick={revers} disabled={!string} />
        </div>
        <ul className={style.list}>
          {reverseString.map((item, index) => (
              <li key={index} className={style.list__item}>
                <Circle
                    letter={item}
                    state={state(currentIndex, index, reverseString)}
                ></Circle>
              </li>
          ))}
        </ul>
      </SolutionLayout>
  );
};
