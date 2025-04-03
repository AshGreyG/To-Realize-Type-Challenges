// #medium #template-literal

type TrimLeft<T extends string>
  = T extends `${" " | "\n" | "\t"}${infer Rest}`
    ? TrimLeft<Rest>
    : T;

type Res1061 = TrimLeft<"   19">;         // 🟩
type Res1062 = TrimLeft<" \n  19   \t">;  // 🟩
type Res1063 = TrimLeft<" \t  19   \t">;  // 🟩

export type { TrimLeft };