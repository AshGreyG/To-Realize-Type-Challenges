// #medium #template-literal

type LowercaseLetters =
  | "a" | "b" | "c" | "d" | "e" | "f"
  | "g" | "h" | "i" | "j" | "k" | "l"
  | "m" | "n" | "o" | "p" | "q" | "r"
  | "s" | "t" | "u" | "v" | "w" | "x"
  | "y" | "z" ;

type UppercaseLetters =
  | "A" | "B" | "C" | "D" | "E" | "F"
  | "G" | "H" | "I" | "J" | "K" | "L"
  | "M" | "N" | "O" | "P" | "Q" | "R"
  | "S" | "T" | "U" | "V" | "W" | "X"
  | "Y" | "Z" ;

type ConvertLowerToUpper<T extends LowercaseLetters>
  = T extends "a" ? "A" : T extends "b" ? "B" :
    T extends "c" ? "C" : T extends "d" ? "D" :
    T extends "e" ? "E" : T extends "f" ? "F" :
    T extends "g" ? "G" : T extends "h" ? "H" :
    T extends "i" ? "I" : T extends "j" ? "J" :
    T extends "k" ? "K" : T extends "l" ? "L" :
    T extends "m" ? "M" : T extends "n" ? "N" :
    T extends "o" ? "O" : T extends "p" ? "P" :
    T extends "q" ? "Q" : T extends "r" ? "R" :
    T extends "s" ? "S" : T extends "t" ? "T" :
    T extends "u" ? "U" : T extends "v" ? "V" :
    T extends "w" ? "W" : T extends "x" ? "X" :
    T extends "y" ? "Y" : T extends "z" ? "Z" :
    never;

type ConvertUpperToLower<T extends UppercaseLetters>
  = T extends "A" ? "a" : T extends "B" ? "b" :
    T extends "C" ? "c" : T extends "D" ? "d" :
    T extends "E" ? "e" : T extends "F" ? "f" :
    T extends "G" ? "g" : T extends "H" ? "h" :
    T extends "I" ? "i" : T extends "J" ? "j" :
    T extends "K" ? "k" : T extends "L" ? "l" :
    T extends "M" ? "m" : T extends "N" ? "n" :
    T extends "O" ? "o" : T extends "P" ? "p" :
    T extends "Q" ? "q" : T extends "R" ? "r" :
    T extends "S" ? "s" : T extends "T" ? "t" :
    T extends "U" ? "u" : T extends "V" ? "v" :
    T extends "W" ? "w" : T extends "X" ? "x" :
    T extends "Y" ? "y" : T extends "Z" ? "z" :
    never;

type GetCapitalize<T extends string>
  = T extends `${infer F extends LowercaseLetters}${infer Rest}`
    ? `${ConvertLowerToUpper<F>}${Rest}`
    : T;