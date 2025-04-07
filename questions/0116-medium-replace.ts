// #medium #template-literal

type Replace<
  S extends string, 
  From extends string, 
  To extends string
> = From extends ""
  ? S
  : S extends `${infer F}${From}${infer E}`
    ? `${F}${To}${E}`
    : S;

type Res1161 = Replace<"foobar", "bar", "foo">;     // 🟩
type Res1162 = Replace<"foobarbar", "bar", "foo">;  // 🟩
type Res1163 = Replace<"foobarbar", "", "foo">;     // 🟩
type Res1164 = Replace<"foobarbar", "bar", "">;     // 🟩
type Res1165 = Replace<"foobarbar", "bra", "foo">;  // 🟩
type Res1166 = Replace<"", "", "">;                 // 🟩

