// #easy #array

type First<T extends readonly any[]>
  = T extends readonly [infer F, ...infer Rest]
    ? F
    : never;

type Test141 = ["a", "b", "c"];
const test142 = [1, "2", "3"] as const;

type Res141 = First<Test141>;         // 🟩
type Res142 = First<typeof test142>;  // 🟩