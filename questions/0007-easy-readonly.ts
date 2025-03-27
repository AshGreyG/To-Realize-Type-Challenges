// #easy #built-in #readonly #object-keys

type GetReadonly<T> = {
  readonly [P in keyof T]: T[P];
}

interface Todo7 {
  title: string;
  description?: string;
}

type Res7 = GetReadonly<Todo7>;