// #medium #infer #tuple #union

type TupleToUnion<T extends [...params: any[]]>
  = T extends [infer F, ...infer Rest]
    ? Rest extends never
      ? F
      : F | TupleToUnion<Rest>
    : never;

type Arr10 = ["1", "2", "3", 2, true];
type Res10 = TupleToUnion<Arr10>;