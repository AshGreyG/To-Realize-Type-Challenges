// #hard #utils #infer

type MyUnionToIntersections<U>
  = (U extends any ? (k: U) => void : never) extends
    (k: infer I) => void
      ? I
      : never;

// Union is distributive, for "1" | "2"
//
// (U extends any ? (k: U) => void : never)
// ("1" extends any ? (k: "1") => void : never) | ("2" extends any ? (k: "2") => void : never)
// (k: "1") => void | (k: "2") => void extends
// (k: infer I) => void
//
// So I = "1" & "2" = never
