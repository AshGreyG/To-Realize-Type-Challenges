// #medium #array

type Last<T extends readonly any[]>
  = T extends readonly [...infer Rest, infer L]
    ? L
    : never;

type Test151 = ["a", "b", "c"];
const test152 = [1, "2", "3"] as const;

type Res151 = Last<Test151>;         // 🟩
type Res152 = Last<typeof test152>;  // 🟩