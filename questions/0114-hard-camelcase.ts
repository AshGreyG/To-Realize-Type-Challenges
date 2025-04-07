// #hard #template-literal

import type {
  LowercaseLetters,
  UppercaseLetters,
  ConvertUpperToLower,
  ConvertLowerToUpper,
} from "./0110-medium-capitalize.ts"

type CamelCase<T extends string>
  = T extends `${infer F}${infer Rest}`
    ? F extends LowercaseLetters | UppercaseLetters
      ? F extends UppercaseLetters
        ? `${ConvertUpperToLower<F>}${CamelCase<Rest>}`
        : `${F}${CamelCase<Rest>}`
      : F extends "_"
        ? Rest extends `${infer RF}${infer RR}`
          ? RF extends LowercaseLetters | UppercaseLetters
            ? RF extends LowercaseLetters
              ? `${ConvertLowerToUpper<RF>}${CamelCase<RR>}`
              : `${RF}${CamelCase<RR>}`
            : `${F}${CamelCase<Rest>}`
          : F
        : `${F}${CamelCase<Rest>}`
    : T;

type Res1141  = CamelCase<"foobar">;                 // 🟩
type Res1142  = CamelCase<"FOOBAR">;                 // 🟩
type Res1143  = CamelCase<"foo_bar">;                // 🟩
type Res1144  = CamelCase<"foo_$bar">;               // 🟩
type Res1145  = CamelCase<"foo_bar_">;               // 🟩
type Res1146  = CamelCase<"foo_bar__">;              // 🟩
type Res1147  = CamelCase<"foo_bar_$">;              // 🟩
type Res1148  = CamelCase<"foo_bar_hello_world">;    // 🟩
type Res1149  = CamelCase<"HELLO_WORLD_WITH_TYPES">; // 🟩
type Res11410 = CamelCase<"-">;                      // 🟩
type Res11411 = CamelCase<"_">;                      // 🟩
type Res11412 = CamelCase<"">;                       // 🟩
type Res11413 = CamelCase<"🥕">;                     // 🟩