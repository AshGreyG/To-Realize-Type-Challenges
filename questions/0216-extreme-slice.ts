// #extreme #array

type DropEnd<T extends any[], EndNum extends number, Count extends any[] = []>
  = Count["length"] extends EndNum
    ? T
    : T extends [...infer Rest, infer E]
      ? DropEnd<Rest, EndNum, [...Count, E]>
      : [];

type DropStart<T extends any[], StartNum extends number, Count extends any[] = []>
  = Count["length"] extends StartNum
    ? T
    : T extends [infer S, ...infer Rest]
      ? DropStart<Rest, StartNum, [...Count, S]>
      : [];

// Utility type checkers

type CreateArrayFromLength<
  L extends number, 
  T extends any = number, 
  Count extends T[] = []
>
  = Count["length"] extends L
    ? Count
    : CreateArrayFromLength<L, T, [...Count, T]>;

export namespace Integer {

export type IsNegative<A extends number> = `${A}` extends `-${infer OA extends number}` ? true : false;
export type IsPositive<A extends number>
  = IsNegative<A> extends false
    ? A extends 0
      ? false
      : true
    : false;

export type Opposite<A extends number>
  = A extends 0
    ? 0
    : `${A}` extends `-${infer OA extends number}`
      ? OA
      : `-${A}` extends `${infer OA extends number}`
        ? OA
        : never;

type PositiveMinus<A extends number, B extends number, Count extends number[] = []>
  = A extends B
    ? Count["length"]
    : CreateArrayFromLength<A> extends [...infer Rest, infer E]
      ? PositiveMinus<Rest["length"], B, [...Count, Rest["length"]]>
      : "➖";

export type Less<A extends number, B extends number>
  = A extends B
    ? false
    : IsNegative<A> extends true
      ? IsPositive<B> extends true
        ? true
        : B extends 0
          ? true
          : Less<Opposite<A>, Opposite<B>> extends true
            ? false
            : true
      : IsPositive<A> extends true
        ? IsNegative<B> extends true
          ? false
          : B extends 0
            ? false
            : PositiveMinus<A, B> extends "➖"
              ? true
              : false
        : A extends 0
          ? IsNegative<B> extends true
            ? false
            : true
          : never;

export type Great<A extends number, B extends number>
  = A extends B
    ? false
    : Less<A, B> extends true
      ? false
      : true;

export type Add<A extends number, B extends number>
  = A extends Opposite<B>
    ? 0
    : IsPositive<A> extends true
      ? IsPositive<B> extends true
        ? [...CreateArrayFromLength<A>, ...CreateArrayFromLength<B>]["length"]
        : IsNegative<B> extends true
          ? Great<A, Opposite<B>> extends true
            ? PositiveMinus<A, Opposite<B>>
            : PositiveMinus<Opposite<B>, A> extends number
              ? Opposite<PositiveMinus<Opposite<B>, A>>
              : never // Impossible
          : A
      : IsNegative<A> extends true
        ? IsNegative<B> extends true
          ? [...CreateArrayFromLength<Opposite<A>>, ...CreateArrayFromLength<Opposite<B>>]["length"] extends number
            ? Opposite<[...CreateArrayFromLength<Opposite<A>>, ...CreateArrayFromLength<Opposite<B>>]["length"]>
            : never
          : IsPositive<B> extends true
            ? Less<Opposite<A>, B> extends true
              ? PositiveMinus<B, Opposite<A>>
              : PositiveMinus<Opposite<A>, B> extends number
                ? Opposite<PositiveMinus<Opposite<A>, B>>
                : never // Impossible
            : A
        : B;

export type Minus<A extends number, B extends number, Count extends number[] = []>
  = A extends B
    ? Count["length"]
    : IsPositive<A> extends true
      ? IsPositive<B> extends true
        ? Great<A, B> extends true
          ? PositiveMinus<A, B>
          : PositiveMinus<B, A> extends number
            ? Opposite<PositiveMinus<B, A>>
            : never
        : IsNegative<B> extends true
          ? Add<A, Opposite<B>>
          : A
      : IsNegative<A> extends true
        ? IsNegative<B> extends true
          ? Great<A, B> extends true
            ? PositiveMinus<Opposite<B>, Opposite<A>>
            : PositiveMinus<Opposite<A>, Opposite<B>> extends number
              ? Opposite<PositiveMinus<Opposite<A>, Opposite<B>>>
              : never
          : IsPositive<B> extends true
            ? Add<A, Opposite<B>>
            : A
        : Opposite<B>;
}

type Slice<
  T extends any[], 
  S extends number = 0, 
  E extends number = T["length"]
> = Integer.IsNegative<S> extends true
  ? Integer.Add<T["length"], S> extends number
    ? Slice<T, Integer.Add<T["length"], S>, E>
    : never
  : Integer.IsNegative<E> extends true
    ? Integer.Add<T["length"], E> extends number
      ? Slice<T, S, Integer.Add<T["length"], E>>
      : never
    : Integer.Minus<T["length"], E> extends number
      ? DropStart<DropEnd<T, Integer.Minus<T["length"], E>>, S>
      : never;