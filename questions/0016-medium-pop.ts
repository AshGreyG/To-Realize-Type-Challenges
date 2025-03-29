// #medium #array

type Pop<T extends readonly any[]>
  = T extends []  // T is a not readonly empty array
    ? []
    : T extends readonly [] // T is a readonly empty array
      ? readonly []
      : T extends [...infer Rest, infer L]
        ? Rest
        : T extends readonly [...infer ReadonlyRest, infer ReadonlyL]
          ? readonly [...ReadonlyRest]
          : never;

type Test161 = ["a", "b", "c"];
type Test162 = readonly [1, "2", "3"];
type Test163 = [true, 1];
type Test164 = readonly [false, 1];
type Test165 = [];
type Test166 = readonly [];

type Res161 = Pop<Test161>; // 🟩
type Res162 = Pop<Test162>; // 🟩
type Res163 = Pop<Test163>; // 🟩
type Res164 = Pop<Test164>; // 🟩
type Res165 = Pop<Test165>; // 🟩
type Res166 = Pop<Test166>; // 🟩