import {ElementStates} from "./element-states";

export type TLinkedList = {
    value: string;
    next: TLinkedList;
};

export type TMap = {
    value: string;
    next: TLinkedList;
    state: ElementStates;
    head?: TLinkedList | null;
    tail?: TLinkedList | null;
};