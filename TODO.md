+ [Utils](./utils/index.d.ts)
  + [ ] Why can `UnionToIntersections` work? Understand covariance and 
        contravariance.
+ [0005-extreme-readonly-keys](./questions/0005-extreme-readonly-keys.ts)
  + [x] Why can

      ``` typescript
      type GetReadonlyKeys1<
        T,
        U extends Readonly<T>,
        K extends keyof T
      > = K extends keyof T ? Equal<Pick<T, K>, Pick<U, K>> extends true ? K : never;
      ```

      get the readonly fields of an interface? The default value type parameter `K`
      is `keyof T`, so when `T` is a mixin interface which has `readonly` fields and
      normal fields, the result of `GetReadonlyKeys1<T>` should be `never`...

  + [ ] Figure out why the `Equal` type function can check the identity between
        two types. That's one of the strangest thing in TypeScript type system.
  + [ ] Figure out why we can't use `Pick<Readonly<T>, P>`, but to use
        `Readonly<Pick<T>, P>`. I guess it may be related to the fact that TypeScript
        compiler first check the **assignability** of `T` and `S` between `Func<T>` and 
        `Func<S>`.
+ [0009-medium-deep-readonly](./questions/0009-medium-deep-readonly.ts)
  + [ ] Why `{ a: string; } | { b: number; } extends object` is true? How does TypeScript's
        type system treat the union type?
+ [0189-easy-awaited]
  + [ ] Figure out `Promise` and `Awaited` types.