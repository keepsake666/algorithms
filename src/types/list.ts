import {ElementStates} from "./element-states";

export type TLinkedList = {
    value: string;
    next: TLinkedList | null;
};

export type TMap = {
    value: string;
    next: TLinkedList | null;
    state: ElementStates;
    head?: TLinkedList | null;
    tail?: TLinkedList | null;
};