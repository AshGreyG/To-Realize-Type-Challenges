// #medium #readonly #object-keys #deep

type TestForDeepReadonly1 = {
  t: String,
  x: {
    a: 1,
    b: {
      c: "hi",
      d: true
    }
  },
  y: () => {}
};

type TestForDeepReadonly2 = {
  x: {
    a: 1,
    b: {
      c: "hi",
      d: true
    }
  },
  y: () => {}
};

type TestForDeepReadonly3 
  = { a: string; } | { b: number; };

type UnionResultIsNever
  = keyof TestForDeepReadonly3 extends never
    ? true
    : false;
// true

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/187

// It works fine when `T` only have primitive types (or not so complicated object 
// types). If the field in `T` has a complicate interface type (many field in it, 
// many function in it), this type function will give up when dealing with the 
// other object types.

// And for union type, the `keyof <union type>` returns `never`, and that's what
// we don't want...

// Reference:
//   [1]. https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367

type DeepReadonly1<T> = keyof T extends never
  ? T
  : { readonly [K in keyof T]: DeepReadonly1<T[K]> };

type Res911 = DeepReadonly1<TestForDeepReadonly1>; // 🟥
type Res912 = DeepReadonly1<TestForDeepReadonly2>; // 🟩
type Res913 = DeepReadonly1<TestForDeepReadonly3>; // 🟥

// 😎 Answer from https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367

type DeepReadonly2<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly2<T[K]> }
  : T;

type FunctionIsObject
  = (() => string) extends object
    ? true
    : false;
// true

type FunctionResultIsNever
  = keyof (() => string) extends never
    ? true
    : false;
// true

type StringInterfaceExtendsFunc
  = String extends ((...params: any[]) => any)
    ? true
    : false;

// So for `(...params: any[]) => any`, `T extends object` is right and
// will return `readonly [K in keyof (() => string)], and that's {}

type Res921 = DeepReadonly2<TestForDeepReadonly1>;  // 🟥
type Res922 = DeepReadonly2<TestForDeepReadonly2>;  // 🟥
type Res923 = DeepReadonly2<TestForDeepReadonly3>;  // 🟩

// 🏅 My personal answer

type DeepReadonly3<T>
  = T extends object
    ? T extends (...params: any[]) => any
      ? T // Function is object, detect is the type a function and return it originally
      : { readonly [K in keyof T]: DeepReadonly3<T[K]> }
    : T;

type Res931 = DeepReadonly3<TestForDeepReadonly1>;  // 🟥
type Res932 = DeepReadonly3<TestForDeepReadonly2>;  // 🟩
type Res933 = DeepReadonly3<TestForDeepReadonly3>;  // 🟩

// As you can see, when dealing with build-in interface, `DeepReadonly` treats
// them equally, and that's we don't want. So we can filter built-in types with
// a lot of conditional types.

type TestForTodo
  = { a: string; } | { b: number; } extends object
    ? true
    : false;