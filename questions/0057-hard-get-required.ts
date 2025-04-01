// #hard #utils #infer

// 🏅 My first answer

type GetRequired1<T extends {}> = {
  [P in keyof T as undefined extends T[P] ? never : P]: T[P]
}

type Res5711 = GetRequired1<{ foo: number, bar?: string }>;       // 🟩
type Res5712 = GetRequired1<{ foo: undefined, bar?: undefined }>; // 🟥

// It can't distinguish between 'a: undefined' and 'a?: ...'

// 🔖 Edge case 1: { foo: undefined }  =>(Required) { foo: undefined }
// 🔖 Edge case 2: { foo?: undefined } =>(Required) { foo: never }

//             T[P]           Required<T>[P]     infer R
// 1         undefined          undefined       undefined
// 2  undefined | undefined       never         undefined

type GetRequired2<T extends {}> = {
  [P in keyof T as 
    T[P] extends Required<T>[P] | infer R
      ? undefined extends R // 1. ?: 2. : undefined 3. ?: undefined
        ? Required<T>[P] extends never
          ? never // ?: undefined
          : undefined extends Required<T>[P]
            ? P // : undefined
            : never // ?:
        : P // : (not undefined type)
      : never // never
  ]: Required<T>[P]
}

// 🩷 Oh yeah, I got it ! Huaier says it's complicated, can I simplify it?

type Res5721 = GetRequired2<{ foo: number, bar?: string }>;       // 🟩
type Res5722 = GetRequired2<{ foo: undefined, bar?: undefined }>; // 🟩

// 😎 Answer from https://github.com/type-challenges/type-challenges/issues/285

type GetRequired3<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P]
}

// string extends string | undefined 🟥
// undefined extends never           🟥

type Res5731 = GetRequired2<{ foo: number, bar?: string }>;       // 🟩
type Res5732 = GetRequired2<{ foo: undefined, bar?: undefined }>; // 🟩