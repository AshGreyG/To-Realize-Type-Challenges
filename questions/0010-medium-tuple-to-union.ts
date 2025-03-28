// #medium #infer #tuple #union

// 🏅 My personal answer, using recursive is a little complicated and unnecessary
// 😟 And many many errors...

type TupleToUnion1<T extends ReadonlyArray<unknown>>
  = T extends readonly [infer F, ...infer Rest]
    ? F | TupleToUnion1<Rest>
    : never;

type Arr101 = ["1", "2", "3", 2, true];
const arr102 = ["1", 2, {a: 1}] as const;
const sym101 = Symbol(1);
const sym102 = Symbol(2);
const arr103 = [sym101, sym102] as const;

type Res1011 = TupleToUnion1<Arr101>;         // 🟩
type Res1012 = TupleToUnion1<typeof arr102>;  // 🟩
type Res1013 = TupleToUnion1<typeof arr103>;  // 🟩

type TestForMyAnswer101 = typeof arr102;
type TestForMyAnswer102 
  = TestForMyAnswer101 extends ReadonlyArray<unknown>
    ? true
    : false;
// true
type TestForMyAnswer103
  = TestForMyAnswer101 extends readonly [infer F, ...infer Rest]
    ? F | Rest
    : undefined;
// 🎉 Aha! The problem is `readonly` !!!

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/7

type TupleToUnion2<T> = T extends ReadonlyArray<infer I> ? I : never;

type Res1021 = TupleToUnion2<Arr101>;         // 🟩
type Res1022 = TupleToUnion2<typeof arr102>;  // 🟩
type Res1023 = TupleToUnion2<typeof arr103>;  // 🟩

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/7#issuecomment-664757285

type TupleToUnion3<T> = T extends ReadonlyArray<unknown> ? T[number] : never;

type Res1031 = TupleToUnion3<Arr101>;         // 🟩
type Res1032 = TupleToUnion3<typeof arr102>;  // 🟩
type Res1033 = TupleToUnion3<typeof arr103>;  // 🟩