// #extreme #template-literal

import { MergeInsertions } from "../utils"
import { TupleToUnion3 } from "./0010-medium-tuple-to-union.ts";

type AppendNewKV<
  O extends object, 
  K extends PropertyKey, 
  V extends string | boolean
> = K extends keyof O
  ? MergeInsertions<
      { [P in keyof O as P extends K ? never : P]: O[P] } & 
      { [P in K]: O[K] extends readonly (string | boolean)[] 
        ? V extends TupleToUnion3<O[K]>
          ? O[K]
          : [...O[K], V]
        : V extends O[K]
          ? O[K]
          : [O[K], V]}
    >
  : MergeInsertions<O & { [P in K]: V}>;

type ParseQueryString<S extends string, O extends object = {}>
  = S extends `${infer F}&${infer E}` // Multiple k-v pair
    ? F extends `${infer K}=${infer V}`
      ? ParseQueryString<E, AppendNewKV<O, K, V>>
      : ParseQueryString<E, AppendNewKV<O, F, true>>
    : S extends `${infer K}=${infer V}`
      ? AppendNewKV<O, K, V>
      : S extends ""
        ? {}
        : AppendNewKV<O, S, true>;