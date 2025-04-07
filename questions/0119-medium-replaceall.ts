// #medium #template-literal

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer F}${From}${infer E}`
    ? `${F}${To}${ReplaceAll<E, From, To>}`
    : S;

type Res1191 = ReplaceAll<'foobar', 'bar', 'foo'>;    // 🟩
type Res1192 = ReplaceAll<'foobar', 'bag', 'foo'>;    // 🟩
type Res1193 = ReplaceAll<'foobarbar', 'bar', 'foo'>; // 🟩
type Res1194 = ReplaceAll<'t y p e s', ' ', ''>;      // 🟩
type Res1195 = ReplaceAll<'foobarbar', '', 'foo'>;    // 🟩
type Res1196 = ReplaceAll<'barfoo', 'bar', 'foo'>;    // 🟩
type Res1197 = ReplaceAll<'foobarfoobar', 'ob', 'b'>; // 🟩
type Res1198 = ReplaceAll<'foboorfoboar', 'bo', 'b'>; // 🟩
type Res1199 = ReplaceAll<'', '', ''>;                // 🟩