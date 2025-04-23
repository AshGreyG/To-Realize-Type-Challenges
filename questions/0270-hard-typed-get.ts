// #hard #utils #template-literal

type Get<T, P extends string>
  = P extends keyof T
    ? T[P]
    : P extends `${infer F}.${infer E}`
      ? F extends keyof T
        ? Get<T[F], E>
        : never
      : P extends keyof T
        ? T[P]
        : never;

type Data270 = {
  foo: {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  hello: 'world'
}

type Res2701 = Get<Data270, "hello">;
type Res2702 = Get<Data270, "foo.bar.count">;
type Res2703 = Get<Data270, "foo.bar">;
type Res2704 = Get<Data270, "foo.baz">;
type Res2705 = Get<Data270, "no.existed">;