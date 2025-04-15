// #extreme #template-literal

import { MergeInsertions } from "../utils"
import { TupleToUnion3 } from "./0010-medium-tuple-to-union.ts";

type AppendNewKV<
  O extends object, 
  K extends PropertyKey, 
  V extends string | boolean
> = K extends keyof O
  ? MergeInsertions<
      { [P in keyof O as P extends K ? never : P]: O[P] } &   // Keep the other keys
      { [P in K]: O[K] extends readonly (string | boolean)[]  // O[K] has been an array that contains values or `true`
        ? V extends TupleToUnion3<O[K]>
          ? O[K]
          : [...O[K], V]
        : V extends O[K]  //  O[K] is not an array but a value
          ? O[K]
          : [O[K], V]}
    >
  : MergeInsertions<O & { [P in K]: V}>;  // When K is not in keyof O, append this K-V pair

type ParseQueryString<S extends string, O extends object = {}>
  = S extends `${infer F}&${infer E}`     // Multiple k-v pairs
    ? F extends `${infer K}=${infer V}`
      ? ParseQueryString<E, AppendNewKV<O, K, V>>     // First k-v pair, and it is `k=v` syntax
      : ParseQueryString<E, AppendNewKV<O, F, true>>  // First k-v pair, but not `k=v` syntax, default to `true`
    : S extends `${infer K}=${infer V}`   // Just one k-v pair
      ? AppendNewKV<O, K, V>  // This one k-v pair is `k=v` syntax
      : S extends ""
        ? {}  // S is "", and the result should be `{}`
        : AppendNewKV<O, S, true>;  // This one k-v pair is not `k=v` syntax, default to `true`

type Res1511  = ParseQueryString<"">;                         // 🟩
type Res1512  = ParseQueryString<"k1">;                       // 🟩
type Res1513  = ParseQueryString<"k1&k1">;                    // 🟩
type Res1514  = ParseQueryString<"k1&k2">;                    // 🟩
type Res1515  = ParseQueryString<"k1=v1">;                    // 🟩
type Res1516  = ParseQueryString<"k1=v1&k1=v2">;              // 🟩
type Res1517  = ParseQueryString<"k1=v1&k2=v2">;              // 🟩
type Res1518  = ParseQueryString<"k1=v1&k2=v2&k1=v2">;        // 🟩
type Res1519  = ParseQueryString<"k1=v1&k2">;                 // 🟩
type Res15110 = ParseQueryString<"k1=v1&k1=v1">;              // 🟩
type Res15111 = ParseQueryString<"k1=v1&k1=v2&k1=v1">;        // 🟩
type Res15112 = ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">;  // 🟩
type Res15113 = ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">;  // 🟩
type Res15114 = ParseQueryString<"k1=v1&k1">;                 // 🟩
type Res15115 = ParseQueryString<"k1&k1=v1">;                 // 🟩