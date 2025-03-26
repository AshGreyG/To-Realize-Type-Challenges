// #extreme #utils #object-keys

interface TodoReadonly5 {
  readonly title: string;
  readonly description: string;
  completed: boolean;
}

interface TodoWithoutReadonly5 {
  title: string;
  description: string;
  completed: string;
}

/**
 * The main difference between `NativeEqual` and `Equal` is the difference
 * between "assignable" and "identical". `NativeEqual` if two types can
 * assign each other, like `{a: number} & {b: string}` and `{a: number, 
 * b: string}` can assign each other, so they are assignable for each other.
 * But for TypeScript compiler, it should consider those two types identically.
 * 
 * When dealing with `BlackBox<X> extends BlackBox<Y>`, compiler will first
 * check if `X extends Y` and that's what we don't want: compiler analyze their
 * assignability rather than their identity. We can write them as
 *                 `BlackBox1<X> extends BlackBox2<Y>`
 * or inline
 *                         `⋯X⋯ extends ⋯Y⋯`
 * The appropriate definition or implementation of `BlackBox` type function is
 * `type BlackBox<Z> = <T>() => T extends Z ? 1 : 2`. Its a generic function,
 * so `type A = BlackBox<string>`, type `A` is `<T>() => T extends string ? 1 : 2`.
 * So if we declare a variable `g: A`, then `g` is a generic function.
 */
type Equal<X, Y>
  = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? true
    : false;

/// Todo: But why? Why this BlackBox type function is appropriate to our
/// identical check type function?

// Reference:
//   [1]. https://github.com/microsoft/TypeScript/issues/56721
//   [2]. https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same

type NativeEqual<X, Y> = X extends Y ? Y extends X ? true : false : false;

type TestEqual1 = Equal<1, 1>;                    // true
type TestEqual2 = Equal<1, any>;                  // false
type TestEqual3 = Equal<1 | 2, 2 | 1>;            // true
type TestEqual4 = Equal<never, never>;            // true
type TestEqual5 = Equal<{a: 1}, {a?: 1}>;         // false
type TestEqual6 = Equal<{a: 1}, {a: number}>;     // false
type TestEqual7 = Equal<{a: 1}, {readonly a: 1}>; // false
type TestEqual8 = Equal<TodoReadonly5["title"], TodoWithoutReadonly5["title"]>;
// true

type TestNativeEqual1 = NativeEqual<1, 1>;                    // true
type TestNativeEqual2 = NativeEqual<1, any>;                  // boolean
type TestNativeEqual3 = NativeEqual<1 | 2, 2 | 1>;            // boolean
type TestNativeEqual4 = NativeEqual<never, never>;            // never
type TestNativeEqual5 = NativeEqual<{a: 1}, {a?: 1}>;         // false
type TestNativeEqual6 = NativeEqual<{a: number}, {a: 1}>;     // false
type TestNativeEqual7 = NativeEqual<{a: 1}, {readonly a: 1}>; // true
type TestNativeEqual8 = NativeEqual<TodoReadonly5["title"], TodoWithoutReadonly5["title"]>;
// true

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/139

type GetReadonlyKeys1<
  T,
  U extends Readonly<T> = Readonly<T>,
  K extends keyof T = keyof T
> = K extends keyof T ? Equal<Pick<T, K>, Pick<U, K>> extends true ? K : never : never;

/// Why K seems like taking all the subtype of `keyof T`, which is handled by
/// TypeScript type system automatically? Here is a test:

type TestForAutomatic<
  T, 
  K extends keyof T | "Another" = keyof T | "Another"
> = K extends keyof T | "Another" ? [K] : never;

type ResTest5 = TestForAutomatic<TodoReadonly5>;

// K can take every union member of `keyof T | "Another"`, just like `[K in keyof T]`

type Res51 = GetReadonlyKeys1<TodoReadonly5>;

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/5221

type GetReadonlyKeys2<T> = keyof {
  [P in keyof T as Equal<Pick<T, P>, Readonly<Pick<T, P>>> extends true ? P : never]: T[P]
}

/// Why can't use `Pick<Readonly<T>, P>` ?

type Res52 = GetReadonlyKeys2<TodoReadonly5>;

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/12656

type GetReadonlyKeys3<T> = {
  [K in keyof Required<T>]: 
    Equal<{[P in K]: T[P]}, {-readonly [P in K]: T[P]}> extends true
      ? never
      : K
}[keyof T];

type Res53 = GetReadonlyKeys3<TodoReadonly5>;