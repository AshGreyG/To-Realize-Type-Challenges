// #medium #readonly #object-keys

type FlattenAndType<T> = {
  [P in keyof T]: T[P];
}

type GetReadonlyAccordingly<T, K extends keyof T = keyof T> =
  FlattenAndType<
   { readonly [P in K]: T[P]; } & 
   { [P in keyof T as P extends K ? never : P]: T[P]; }
  >

interface Todo8 {
  title: string;
  description: string;
  completed: boolean;
}

type Res8 = GetReadonlyAccordingly<Todo8, "title" | "description">;