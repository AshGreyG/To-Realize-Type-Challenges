// #easy #promise #built-in

type MyAwaited<T> 
  = T extends null | undefined
    ? T
    : T extends object & { then: (onfulfilled: infer F, ...args: infer _) => any}
      ? F extends ((value: infer V, ...args: infer _) => any)
        ? MyAwaited<V>
        : never
      : T;

type Res1891 = MyAwaited<Promise<string>>;                                      // 🟩
type Res1892 = MyAwaited<Promise<{ field: number }>>;                           // 🟩
type Res1893 = MyAwaited<Promise<Promise<string | number>>>;                    // 🟩
type Res1894 = MyAwaited<{ then: (onfulfilled: (arg: number) => any) => any }>; // 🟩