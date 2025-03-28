// #easy #object-keys

type TupleToObject<T extends ReadonlyArray<any>> = {
  [K in TupleToUnion3<T>]: K;
}

type Arr111 = ["1", "2", "3", 2, true];
const arr112 = ["1", 2, {a: 1}] as const;
const sym111 = Symbol(1);
const sym112 = Symbol(2);
const arr113 = [sym111, sym112] as const;

type Res111 = TupleToObject<Arr111>;        // 🟩
type Res112 = TupleToObject<typeof arr112>; // 🟩
type Res113 = TupleToObject<typeof arr113>; // 🟩