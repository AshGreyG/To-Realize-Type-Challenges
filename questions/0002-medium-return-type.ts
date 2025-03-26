// #medium #infer #built-in

type GetReturnType<F extends Function>
  = F extends (...params: any[]) => infer Return
    ? Return
    : never;

const fn = (v: boolean) => {
  return v ? 1 : 2;
}

type Res2 = GetReturnType<typeof fn>;  // 1 | 2