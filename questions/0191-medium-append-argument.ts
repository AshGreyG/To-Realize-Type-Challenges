// #medium #arguments

type AppendArgument<
  F extends (...args: any) => any, 
  A
> = (...args: [...Parameters<F>, A]) => ReturnType<F>;

type Res1911 = AppendArgument<(a: number, b: string) => number, boolean>; // 🟩
type Res1912 = AppendArgument<() => void, undefined>;                     // 🟩