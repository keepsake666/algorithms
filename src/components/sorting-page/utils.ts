import { TElementState } from "../../types/sorting";
export const swap = (
  arr: TElementState[] | number[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const bubbleSort =  (
    arr:number[]
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      if ( arr[j] < arr[j + 1]
      ) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
};
export const selectionSort =  (
    arr: number[]) => {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i; j < n; j++) {
      if (arr[j] > arr[min]
      ) {
        min = j;
      }
      if (j !== i) {
      }
    }
    swap(arr, min, i);
  }
  return arr;
};