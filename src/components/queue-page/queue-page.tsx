import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import style from "../queue-page/queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./classQueue";
import { TLoading } from "../../types/queue";
import {delay} from "../../utils";

const queue = new Queue<string>(6);
export const QueuePage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<TLoading>({
    enqueue: false,
    dequeue: false,
    clear: false,
  });
  const [arr, setArr] = useState<(string | undefined)[]>(queue.getContainer());
  const [currIndex, setCurrIndex] = useState<number>(-1);
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const minLen = !value.length;
  const enqueue = async (item: string) => {
    setLoading({ enqueue: true, dequeue: false, clear: false });
    setValue("");
    setCurrIndex(queue.getTail());
    queue.enqueue(item);
    await delay(SHORT_DELAY_IN_MS);
    setArr(queue.getContainer());
    setCurrIndex(-1);
    setLoading({ enqueue: false, dequeue: false, clear: false });
  };

  const dequeue = async () => {
    setLoading({ enqueue: false, dequeue: true, clear: false });
    setCurrIndex(queue.getHead());
    queue.dequeue();
    await delay(SHORT_DELAY_IN_MS);
    setArr(queue.getContainer());
    setCurrIndex(-1);
    setLoading({ enqueue: false, dequeue: false, clear: false });
  };

  const clear = async () => {
    setLoading({ enqueue: false, dequeue: false, clear: true });
    queue.clear();
    setArr(queue.getContainer());
    setCurrIndex(-1);
    await delay(SHORT_DELAY_IN_MS);
    setLoading({ enqueue: false, dequeue: false, clear: false });
  };
  return (
      <SolutionLayout title="Очередь">
        <div className={style.container}>
          <form className={style.form} onSubmit={event => event.preventDefault()}>
            <Input
                data-cy="input"
                value={value}
                type={"text"}
                maxLength={4}
                isLimitText={true}
                extraClass={style.input}
                onChange={changeValue}
            />{" "}
            <Button
                data-cy="button_add"
                text="Добавить"
                extraClass="mr-6"
                onClick={() => enqueue(value)}
                isLoader={loading.enqueue}
                disabled={
                    loading.dequeue ||
                    loading.clear ||
                    minLen ||
                    queue.getSize() === queue.getTail()
                }
            />
            <Button
                data-cy="button_delete"
                text="Удалить"
                extraClass="mr-40"
                onClick={dequeue}
                isLoader={loading.dequeue}
                disabled={loading.enqueue || loading.clear || queue.isEmpty()}
            />
            <Button
                data-cy="button_clear"
                text="Очистить"
                onClick={clear}
                isLoader={loading.clear}
                disabled={loading.enqueue || loading.dequeue}
            />
          </form>
          <ul className={style.list}>
            {arr.map((item, index) => (
                <li key={index} className={style.list__item}>
                  <Circle
                      head={queue.getHead() === index ? "head" : ""}
                      tail={queue.getTail() === index + 1 ? "tail" : ""}
                      letter={item}
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
