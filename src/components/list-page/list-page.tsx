import React, {ChangeEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {delay, generateArray, getRandomArbitrary} from "../../utils";
import {LinkedList} from "./classList";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import style from "../list-page/list-page.module.css";
import {TLinkedList, TMap} from "../../types/list";

const randomArr = String(generateArray(getRandomArbitrary(3, 4), 9))
    .split("")
    .filter((item) => item !== ",");
const list = new LinkedList<string>(randomArr);

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState({
    prepend: false,
    append: false,
    delTail: false,
    delHead: false,
    addItemIndex: false,
    delItemIndex: false,
  });
  const [linkedList, setLinkedList] = useState<TMap[]>([]);
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const changeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(e.target.value));
  };

  const newListArr = () => {
    let arr:TLinkedList[];
    arr = list.toArray();
    const mapArr: TMap[] = arr.map((item) => {
      return {
        ...item,
        state: ElementStates.Default,
      };
    });
    return mapArr;
  };

  useEffect(() => {
    const listArr = newListArr();
    setLinkedList(listArr);
  }, []);

  const minValue = value.length;
  const maxIndex = index >= list.getSize() || index < 0;
  const prepend = async (value: string) => {
    setLoading({
      ...loading,
      prepend: true,
    });
    setValue("");
    list.prepend(value);
    const listArr = newListArr();
    if (linkedList.length) {
      linkedList[0].head = { value: value, next: null };
      listArr[0].state = ElementStates.Modified;
    }
    setLinkedList([...linkedList]);
    await delay(SHORT_DELAY_IN_MS);
    setLinkedList(listArr);
    await delay(SHORT_DELAY_IN_MS);
    listArr[0].state = ElementStates.Default;
    setLoading({
      ...loading,
      prepend: false,
    });
  };

  const delHead = async () => {
    setLoading({
      ...loading,
      delHead: true,
    });
    list.delHead();
    const listArr = newListArr();
    linkedList[0].head = { value: linkedList[0].value, next: listArr[0] };
    linkedList[0].value = "";
    linkedList[0].state = ElementStates.Modified;
    await delay(SHORT_DELAY_IN_MS);
    setLinkedList(listArr);
    setLoading({
      ...loading,
      delHead: false,
    });
  };
  const append = async (value: string) => {
    setLoading({
      ...loading,
      append: true,
    });
    setValue("");
    list.append(value);
    const listArr = newListArr();
    if (linkedList.length) {
      linkedList[listArr.length - 2].tail = {
        value: value,
        next: listArr[listArr.length - 1],
      };
      listArr[listArr.length - 1].state = ElementStates.Modified;
    }
    setLinkedList([...linkedList]);
    await delay(SHORT_DELAY_IN_MS);
    setLinkedList(listArr);
    await delay(SHORT_DELAY_IN_MS);
    listArr[listArr.length - 1].state = ElementStates.Default;
    setLoading({
      ...loading,
      append: false,
    });
  };

  const delTail = async () => {
    setLoading({
      ...loading,
      delTail: true,
    });
    list.delTail();
    const listArr = newListArr();
    linkedList[linkedList.length - 1].head = {
      value: linkedList[linkedList.length - 1].value,
      next: listArr[0],
    };
    linkedList[linkedList.length - 1].value = "";
    linkedList[linkedList.length - 1].state = ElementStates.Modified;
    await delay(SHORT_DELAY_IN_MS);
    setLinkedList(listArr);
    setLoading({
      ...loading,
      delTail: false,
    });
  };

  const addItemIndex = async (index: number) => {
    setLoading({
      ...loading,
      addItemIndex: true,
    });
    setIndex(0);
    list.delIndex(index);
    const listArr = newListArr();
    for (let i = 0; i <= index; i++) {
      linkedList[i].state = ElementStates.Changing;

      await delay(SHORT_DELAY_IN_MS);
      setLinkedList([...linkedList]);
    }
    linkedList[index].head = {
      value: linkedList[index].value,
      next: linkedList[index],
    };
    linkedList[index].state = ElementStates.Default;
    linkedList[index].value = "";
    setLinkedList([...linkedList]);
    await delay(SHORT_DELAY_IN_MS);
    setLinkedList(listArr);
    setLoading({
      ...loading,
      addItemIndex: false,
    });
  };

  const delItemIndex = async (value: string, index: number) => {
    setLoading({
      ...loading,
      delItemIndex: true,
    });
    setValue("");
    setIndex(0);
    list.insertAt(value, index);
    const listArr = newListArr();
    for (let i = 0; i < index; i++) {
      linkedList[i].state = ElementStates.Changing;
      linkedList[i].head = { value: value, next: linkedList[i] };
      await delay(SHORT_DELAY_IN_MS);
      setLinkedList([...linkedList]);
      for (let j = 0; j < index; j++) {
        linkedList[j].head = null;
      }
    }
    await delay(SHORT_DELAY_IN_MS);
    listArr[index].state = ElementStates.Modified;
    setLinkedList(listArr);
    await delay(SHORT_DELAY_IN_MS);
    listArr[index].state = ElementStates.Default;
    setLinkedList(listArr);
    setLoading({
      ...loading,
      delItemIndex: false,
    });
  };

  return (
      <SolutionLayout title="Связный список">
        <div className={style.container}>
          <form className={style.form} onSubmit={event => event.preventDefault()}>
            <Input
                data-cy="input"
                type={"text"}
                maxLength={4}
                isLimitText={true}
                extraClass={style.input}
                value={value}
                onChange={changeValue}
            />
            <Button
                data-cy="button_add_head"
                text="Добавить в head"
                extraClass={style.button_small}
                onClick={() => prepend(value)}
                isLoader={loading.prepend}
                disabled={
                    loading.addItemIndex ||
                    loading.delItemIndex ||
                    loading.append ||
                    loading.delTail ||
                    loading.delHead ||
                    !minValue
                }
            />
            <Button
                data-cy="button_add_tail"
                text="Добавить в tail"
                extraClass={style.button_small}
                onClick={() => append(value)}
                isLoader={loading.append}
                disabled={
                    loading.addItemIndex ||
                    loading.delItemIndex ||
                    loading.prepend ||
                    loading.delTail ||
                    loading.delHead ||
                    !minValue
                }
            />
            <Button
                data-cy="button_delete_head"
                text="Удалить из head"
                extraClass={style.button_small}
                onClick={() => delHead()}
                isLoader={loading.delHead}
                disabled={
                    loading.addItemIndex ||
                    loading.delItemIndex ||
                    loading.append ||
                    loading.prepend ||
                    loading.delHead ||
                    !linkedList.length
                }
            />
            <Button
                data-cy="button_delete_tail"
                text="Удалить из tail"
                extraClass={style.button_small}
                onClick={() => delTail()}
                isLoader={loading.delTail}
                disabled={
                    loading.addItemIndex ||
                    loading.delItemIndex ||
                    loading.append ||
                    loading.prepend ||
                    loading.delHead ||
                    !linkedList.length
                }
            />
          </form>
          <form className={style.form} onSubmit={event => event.preventDefault()}>
            <Input
                data-cy="input_index"
                type={"number"}
                extraClass={style.input}
                value={index}
                onChange={changeIndex}
                max={linkedList.length - 1}
            />
            <Button
                data-cy="button_add_index"
                text="Добавить по индексу"
                extraClass={style.button}
                onClick={() => delItemIndex(value, index)}
                isLoader={loading.delItemIndex}
                disabled={
                    loading.addItemIndex ||
                    loading.prepend ||
                    loading.append ||
                    loading.delTail ||
                    loading.delHead ||
                    !minValue ||
                    maxIndex
                }
            />
            <Button
                data-cy="button_delete_index"
                text="Удалить по индексу"
                extraClass={style.button}
                onClick={() => addItemIndex(index)}
                isLoader={loading.addItemIndex}
                disabled={
                    loading.prepend ||
                    loading.delItemIndex ||
                    loading.append ||
                    loading.delTail ||
                    loading.delHead ||
                    !linkedList.length ||
                    maxIndex
                }
            />
          </form>
          <ul className={style.list}>
            {linkedList.map((item, index) => (
                <li key={index} className={style.list__item}>
                  <Circle
                      head={
                        item.head ? (
                            <Circle
                                letter={item.head?.value}
                                isSmall={true}
                                state={ElementStates.Changing}
                            />
                        ) : "" || index === 0 ? (
                            "head"
                        ) : (
                            ""
                        )
                      }
                      tail={
                        item.tail ? (
                            <Circle
                                letter={item.tail?.value}
                                isSmall={true}
                                state={ElementStates.Changing}
                            />
                        ) : "" || index === linkedList.length - 1 ? (
                            "tail"
                        ) : (
                            ""
                        )
                      }
                      letter={item.value}
                      index={index}
                      state={item.state}
                      isSmall={false}
                      extraClass="mr-12 ml-12"
                  ></Circle>
                  {index + 1 < linkedList.length && <ArrowIcon />}
                </li>
            ))}
          </ul>
        </div>
      </SolutionLayout>
  );
};

