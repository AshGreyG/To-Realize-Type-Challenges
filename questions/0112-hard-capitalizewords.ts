// #hard #template-literal

import type {
  LowercaseLetters,
  UppercaseLetters,
  ConvertLowerToUpper,
  GetCapitalize
} from "./0110-medium-capitalize.ts"

type CapitalizeWordsIgnoreFirst<T extends string>
  = T extends `${infer F}${infer Rest}`
    ? F extends LowercaseLetters | UppercaseLetters
      ? `${F}${CapitalizeWordsIgnoreFirst<Rest>}` // When F is a letter, write F into the result normally
      : Rest extends `${infer RF}${infer RR}`
        ? RF extends LowercaseLetters | UppercaseLetters
          ? RF extends LowercaseLetters
            ? `${F}${ConvertLowerToUpper<RF>}${CapitalizeWordsIgnoreFirst<RR>}`
            : `${F}${RF}${CapitalizeWordsIgnoreFirst<RR>}`
          : `${F}${CapitalizeWordsIgnoreFirst<Rest>}`
        : Rest
    : T;

type CapitalizeWords<T extends string> = GetCapitalize<CapitalizeWordsIgnoreFirst<T>>;

type Res11201 = CapitalizeWords<"abc de">;                                               // 🟩
type Res11202 = CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">;  // 🟩
type Res11203 = CapitalizeWords<"abb||as">;                                              // 🟩

// 😢 This is a 'bug' of TypeScript
// 🎉 Actually the problem is my `CapitalWordsIgnoreFirst` cannot deal with continuous
//    non-letters characters like '|||' or just an emoji.

type TestEmojiR1  = "🤣" extends `${infer F}${infer R}` ? R : 1;  // "�"
type TestEmojiF1  = "🤣" extends `${infer F}${infer R}` ? F : 1;  // "�"
type TestEmoji1   = `${TestEmojiF1}${TestEmojiR1}`                // "🤣"

type TestEmojiR1R = TestEmojiR1 extends `${infer F}${infer R}` ? R : 1;  // ""
type TestEmojiR1F = TestEmojiR1 extends `${infer F}${infer R}` ? F : 1;  // "�"

type TestEmojiR2  = "👩‍👩‍👦‍👦" extends `${infer F}${infer R}` ? R : 1;        // �‍👩‍👦‍👦
type TestEmojiF2  = "👩‍👩‍👦‍👦" extends `${infer F}${infer R}` ? F : 1;        // �
type TestEmojiR2F = TestEmojiR2 extends `${infer F}${infer R}` ? F : 1; // �
type TestEmoji2   = `${TestEmojiF2}${TestEmojiR2F}`;                    // 👩

// Reference
//   [1]. https://github.com/microsoft/TypeScript/issues/61525
//   [2]. https://github.com/microsoft/TypeScript/issues/41149