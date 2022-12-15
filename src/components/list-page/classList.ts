export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
  delHead: () => void;
  delTail: () => void;
  delIndex: (index: number) => void;
  prepend: (element: T) => void;
  fromArray: (value: T[]) => void;
  toArray: () => T[] | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialArray: T[]) {
    this.head = null;
    this.size = 0;
    initialArray.forEach((item) => this.append(item));
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else if (this.head !== null) {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex !== index - 1 && curr.next) {
          curr = curr.next;
          currIndex++;
        }
        curr.next = new Node(element, curr.next);
        this.size++;
      }

      this.size++;
    }
  }
  prepend(element: T) {
    this.head = new Node(element, this.head);
    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
  delHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  delTail() {
    let current;
    if (!this.head?.next) {
      this.head = null;
    } else {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.size--;
  }

  delIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    let current = this.head;
    if (index === 0) {
      if (this.head) this.head = this.head?.next;
    } else {
      let prev = null;
      let currIndex = 0;
      while (currIndex++ < index) {
        prev = current;
        if (current) {
          current = current.next;
        }
      }
      if (prev?.next) prev.next = current?.next ? current.next : null;
    }
    this.size--;
  }
  fromArray(values: T[]) {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray() {
    const nodes: any = [];

    let currentNode = this.head;

    // Перебираем все узлы и добавляем в массив.
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    // Возвращаем массив из всех узлов.
    return nodes;
  }
}
