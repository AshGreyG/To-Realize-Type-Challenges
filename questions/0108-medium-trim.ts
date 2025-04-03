import type { TrimLeft } from "./0106-medium-trimleft.ts";

type TrimRight<T extends string>
  = T extends `${infer Rest}${" " | "\n" | "\t"}`
    ? TrimRight<Rest>
    : T;

type Trim<T extends string> = TrimLeft<TrimRight<T>>;