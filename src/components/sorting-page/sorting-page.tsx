import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import style from "../sorting-page/sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TElementState } from "../../types/sorting";
import { swap } from "./utils";
import {delay, generateArray, getRandomArbitrary} from "../../utils";

type TLoading = {
  ascending: boolean;
  descending: boolean;
};
export const SortingPage: React.FC = () => {
  const [value, setValue] = useState("choice");
  const [loading, setLoading] = useState<TLoading>({
    ascending: false,
    descending: false,
  });
  const [state, setState] = useState<TElementState[]>([]);

  useEffect(() => {
    randomArr(generateArray(getRandomArbitrary(3, 17), 100));
  }, []);
  const handlerRandomArr = () => {
    randomArr(generateArray(getRandomArbitrary(3, 17), 100));
  };

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const randomArr = (arr: number[]): void => {
    let fromArr: TElementState[] = [];
    Array.from(arr, (item) => {
      fromArr.push({ index: item, state: ElementStates.Default });
    });
    setState(fromArr);
  };

  const bubbleSort = async (
      arr: TElementState[],
      reverse: boolean
  ): Promise<TElementState[]> => {
    reverse
        ? setLoading({ ascending: false, descending: true })
        : setLoading({ ascending: true, descending: false });
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        if (
            reverse
                ? arr[j].index < arr[j + 1].index
                : arr[j].index > arr[j + 1].index
        ) {
          await delay(SHORT_DELAY_IN_MS);
          let tmp = arr[j].index;
          arr[j].index = arr[j + 1].index;
          arr[j + 1].index = tmp;
          setState([...arr]);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
    }
    setLoading({ ascending: false, descending: false });
    return arr;
  };

  const selectionSort = async (
      arr: TElementState[],
      reverse: boolean
  ): Promise<TElementState[]> => {
    let n = arr.length;
    reverse
        ? setLoading({ ascending: false, descending: true })
        : setLoading({ ascending: true, descending: false });
    for (let i = 0; i < n; i++) {
      let min = i;
      arr[i].state = ElementStates.Changing;
      for (let j = i; j < n; j++) {
        arr[j].state = ElementStates.Changing;
        setState([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (
            reverse
                ? arr[j].index > arr[min].index
                : arr[j].index < arr[min].index
        ) {
          min = j;
          arr[j].state = ElementStates.Changing;
          arr[min].state =
              i === min ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== i) {
          arr[j].state = ElementStates.Default;
        }
        setState([...arr]);
      }
      swap(arr, min, i);
      arr[min].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setState([...arr]);
    }
    setLoading({ ascending: false, descending: false });
    return arr;
  };
  const handelSort = (arr: TElementState[], reverse: boolean) => {
    value === "choice" ? selectionSort(arr, reverse) : bubbleSort(arr, reverse);
  };

  return (
      <SolutionLayout title="Сортировка массива">
        <div className={style.container}>
          <form className={style.form}>
            <div className={style.radio__container}>
              <RadioInput
                  label={"Выбор"}
                  value={"choice"}
                  checked={value === "choice"}
                  onChange={handleOptionChange}
                  extraClass="mr-20"
              />
              <RadioInput
                  label={"Пузырёк"}
                  value={"bubble"}
                  checked={value === "bubble"}
                  onChange={handleOptionChange}
                  extraClass="mr-25"
              />
            </div>
            <div className={style.button__container}>
              <Button
                  isLoader={loading.ascending}
                  disabled={loading.descending}
                  text="По возрастанию"
                  sorting={Direction.Ascending}
                  extraClass="mr-6"
                  onClick={() => handelSort(state, false)}
              />
              <Button
                  isLoader={loading.descending}
                  disabled={loading.ascending}
                  text="По убыванию"
                  sorting={Direction.Descending}
                  extraClass="mr-40"
                  onClick={() => handelSort(state, true)}
              />
              <Button
                  disabled={loading.ascending || loading.descending}
                  text="Новый массив"
                  onClick={handlerRandomArr}
              />
            </div>
          </form>
          <ul className={style.list}>
            {state.map((item, index) => {
              return <Column index={item.index} key={index} state={item.state} />;
            })}
          </ul>
        </div>
      </SolutionLayout>
  );
};
