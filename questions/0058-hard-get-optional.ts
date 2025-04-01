// #hard #utils #infer

type GetOptional<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P]
}

type Res581 = GetOptional<{ foo: number, bar?: string }>;       // 🟩
type Res582 = GetOptional<{ foo: undefined, bar?: undefined }>; // 🟩