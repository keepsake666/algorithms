import { ElementStates } from "../../types/element-states";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const state = (
  index: number,
  currIndex: number,
  arr: Array<string | number>
) => {
  let arrLength = arr.length - 1;
  if (currIndex < index || currIndex > arrLength - index) {
    return ElementStates.Modified;
  }
  if (currIndex === index || currIndex === arrLength - index) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};

export const expand = (
    str: string,
    start = 0,
    end = str.length - 1
)=> {
  const splitString = str.split("");
  const mid: number = Math.floor(splitString.length / 2);

  while (start < mid) {
    let oneStart = splitString[start];
    splitString[start] = splitString[end];
    splitString[end] = oneStart;
    start++;
    end--;
  }

  return splitString.join('');
};