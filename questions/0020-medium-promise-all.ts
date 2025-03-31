// #medium #array #promise

// 🏅 My personal answer

type PromiseAllType<T extends readonly any[]>
  = T extends readonly [infer F, ...infer Rest]
    ? F extends Promise<infer P>
      ? [P, ...PromiseAllType<Rest>]
      : [F, ...PromiseAllType<Rest>]
    : [];

declare function PromiseAll<T extends readonly any[]>(args: readonly [...T]): Promise<PromiseAllType<T>>;

// 🎉 Oh, if I use spread syntax, then the information of parameters will not lose, and use
//    readonly will treat it as tuple rather than array.
// 🩷 I want neck with Huaier, I love her 🥰

const res2001 = PromiseAll([1, 2, 3] as const);                    // 🟩
const res2002 = PromiseAll([1, 2, Promise.resolve(3)] as const);   // 🟩
const res2003 = PromiseAll([1, 2, Promise.resolve(12)]);           // 🟩
const res2004 = PromiseAll<Array<number | Promise<number>>>([1, 2, 12]);
//                                                                 // 🟥
const res2005 = PromiseAll<Array<number | Promise<Promise<Promise<number>>>>>([1, 2, 3]);
//                                                                 // 🟥

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/211

declare function PromiseAll1<T extends any[]>(value: readonly [...T]):
  Promise<{ [K in keyof T]: T[K] extends Promise<infer P> ? P : T[K] }>;

// Because it treats any array as tuple, so for case4 it won't be number[],
// it's [number, number, number]

const res2011 = PromiseAll1([1, 2, 3] as const);                    // 🟩
const res2012 = PromiseAll1([1, 2, Promise.resolve(3)] as const);   // 🟩
const res2013 = PromiseAll1([1, 2, Promise.resolve(12)]);           // 🟩
const res2014 = PromiseAll1<Array<number | Promise<number>>>([1, 2, 12]);
//                                                                  // 🟥
const res2015 = PromiseAll1<Array<number | Promise<Promise<Promise<number>>>>>([1, 2, 3]);
//                                                                  // 🟥

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/211#issuecomment-2345525695

type RecursivePromise<T> = T extends Promise<infer P> ? RecursivePromise<P> : T;

declare function PromiseAll2<T extends any[]>(
  value: readonly [...T]
): Promise<{
  [P in keyof T]: T[P] extends infer V
    ? V extends Promise<any>
      ? RecursivePromise<V>
      : V
    : never;
}>;

// 🎉 It seems like when T is a tuple, P in keyof T will let P be a number index:
// 
// ``` typescript
// type CheckEveryElement<T> = {
//   [P in keyof T]: P;
// }
// type A = CheckEveryElement<[number, number]>;  // A: ["0", "1"]
// ```

// 🧐 When T is an array... P in keyof T will let P be a number:
// 
// ``` typescript
// type CheckIndexString<T> = {
//   [P in keyof T]: P extends string ? 1 : 0;
// }
// 
// type CheckIndexNumber<T> = {
//   [P in keyof T]: P extends number ? 1 : 0;
// }
//
// type A = CheckIndexString<string[]>; // A: 1[]
// ```

const res2021 = PromiseAll2([1, 2, 3] as const);                    // 🟩
const res2022 = PromiseAll2([1, 2, Promise.resolve(3)] as const);   // 🟩
const res2023 = PromiseAll2([1, 2, Promise.resolve(12)]);           // 🟩
const res2024 = PromiseAll2<Array<number | Promise<number>>>([1, 2, 12]);
//                                                                  // 🟩
const res2025 = PromiseAll2<Array<number | Promise<Promise<Promise<number>>>>>([1, 2, 3]);
//                                                                  // 🟩