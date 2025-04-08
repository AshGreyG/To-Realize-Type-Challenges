// #hard #template-literal

type ControlsMap = {
  c: "char",
  s: "string",
  d: "dec",
  o: "oct",
  h: "hex",
  f: "float",
  p: "pointer"
}

type CPrintfParser<S extends string, Res extends string[] = []>
  = S extends `${infer F}%${infer E}`
    ? E extends `${infer Target}${infer Rest}`
      ? Target extends keyof ControlsMap 
        ? CPrintfParser<Rest, [...Res, ControlsMap[Target]]>
        : CPrintfParser<Rest, Res>
      : Res
    : Res;

type Res1471 = CPrintfParser<"">;                         // 🟩
type Res1472 = CPrintfParser<"Any string">;               // 🟩
type Res1473 = CPrintfParser<"The result is %d">;         // 🟩
type Res1474 = CPrintfParser<"The result is %%d.">;       // 🟩
type Res1475 = CPrintfParser<"The result is %f.">;        // 🟩
type Res1476 = CPrintfParser<"The result is %q.">;        // 🟩
type Res1477 = CPrintfParser<"Hello %s: score is %d.">;   // 🟩
type Res1478 = CPrintfParser<"The result is %">;          // 🟩