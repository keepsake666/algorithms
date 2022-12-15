import { ElementStates } from "../../types/element-states";

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
