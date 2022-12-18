interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => number | null;
  getSize: () => number;
  clear: () => void;
  getContainer: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): number | null => {
    if (this.container.length) {
      return this.container.length - 1;
    }
    return null;
  };

  getSize = () => this.container.length;
  clear = () => {
    this.container = [];
  };

  getContainer = () => {
    return this.container;
  };
}
