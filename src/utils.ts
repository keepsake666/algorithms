export const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));
export const generateArray = (length: number, max: number): number[] =>
    [...new Array(length)].map(() => Math.round(Math.random() * max));
export function getRandomArbitrary(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}
