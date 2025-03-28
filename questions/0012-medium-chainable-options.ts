// #medium #application

import { MergeInsertions } from "../utils"

// 😎  Answer from https://github.com/type-challenges/type-challenges/issues/13951

type Chainable<T extends Record<string, any> = {}> = { // Generic T is designed to store the key-value pair
  option: <K extends string, V>(
    key: K extends keyof T  // Check if K is same with a key in previous returned Chainable object
      ? never
      : K,
    value: V
  ) => K extends keyof T
    ? Chainable<MergeInsertions<Omit<T, K> & Record<K, V>>>
    : Chainable<MergeInsertions<T & Record<K, V>>>,
  get: () => T;
}

// 😩 I need to know the "name" of key, so I need a generic parameter
// 😢 Oh I get it, I can't use Chainable as an object type, it should
//    use its generic parameter as the object type

declare const test121: Chainable;
declare const test122: Chainable;

const result1 = test121
  .option("foo", 12)
  .option("ha", "1")
  .get();

const result2 = test122
  .option("po", 122)
  // @ts-expect-error
  .option("po", "string")
  .get();

type Res121 = typeof result1; // 🟩
type Res122 = typeof result2; // 🟩