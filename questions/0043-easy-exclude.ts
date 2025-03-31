// #easy #built-in #union

type MyExclude<T, U> = T extends U ? never : T;

// For generic type T, it is 'distributive', that is, for each element in
// the union type T, the condition is checked separately.