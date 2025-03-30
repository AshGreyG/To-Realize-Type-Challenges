// #hard #array

// Currying is the technique of converting a function that takes multiple
// arguments into a sequence of functions that each takes a single argument

// Currying for a function
//       (Arg1: type1, Arg2: type2, ..., ArgN: typeN) => ReturnType
// to
//       (Arg1: type1) => (Arg2: type2) => ... => (ArgN: typeN) => ReturnType

// 🏅 My personal answer:

type CurryingPopEnd<T extends readonly any[]>
  = T extends []
    ? []
    : T extends readonly []
      ? readonly []
      : T extends [...infer Rest, infer L]
        ? Rest
        : T extends readonly [...infer ReadonlyRest, infer L]
          ? readonly [...ReadonlyRest]
          : never;

type CurryingLastAsTuple<T extends readonly any[]>
  = T extends readonly [...infer Rest, any]
    ? T extends readonly[...Rest, ...infer L]
      ? L
      : never
    : never;

type CurryingReturnType<F extends Function>
  = F extends (...params: infer P) => infer R
    ? P["length"] extends 0 | 1
      ? (...params: P) => R
      : CurryingReturnType<(...params: CurryingPopEnd<P>) => (...arg: CurryingLastAsTuple<P>) => R>
    : never;

declare function Currying11<T extends Function>(fn: T): CurryingReturnType<T>;

function testAdd(a: number, b: number): number {
  return a + b;
}

const Res171 = Currying11(testAdd);

let testAdd1: number = testAdd(1, 2);
let testAdd2: number = Res171(1)(2);  // 🟩

// However, when using 'Currying' to the function, the parameter name will be changed
// to 'arg', to save more information of functions we need find another way. 
// 🎉 I know !!!, I need use `LastAsTuple` to record the information of parameter names

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/28634

type FirstAsTuple<T extends readonly any[]>
  = T extends readonly [any, ...infer R]
    ? T extends readonly [...infer F, ...R]
      ? F
      : never
    : never;

// type A = FirstAsTuple<Parameters<(a: number, b: number) => void>>;
//      A: [a: number]
// 🥳 So if I use tuple to record the parameters, I can record the parameter names!!!!
// 🩷 Huaier planted a kiss on my lips. Oh yeah !!!

type Curried1<F>
  = F extends (...args: infer Args) => infer Return
    ? Args["length"] extends 0 | 1
      ? F
      : Args extends [any, ...infer Rest]
        ? (...args: FirstAsTuple<Args>) => Curried1<(...params: Rest) => Return>
        : never
    : never;

declare function Currying12<T extends Function>(fn: T): Curried1<T>;

const Res172 = Currying12(testAdd);

let testAdd3: number = Res172(1)(2);  // 🟩