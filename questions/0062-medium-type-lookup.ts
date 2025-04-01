// #medium #union #map

type HasValue<T, V> = {} extends {
  [P in keyof T as T[P] extends V ? P : never]: T[P]
} ? false : true;

interface TestObject621 {
  type: "cat";
  breeds: 
    | "Abyssinian" 
    | "ShortHair" 
    | "Curl" 
    | "Bengal";
}

interface TestObject622 {
  type: "dog";
  breeds: 
    | 'Hound' 
    | 'Brittany' 
    | 'Bulldog' 
    | 'Boxer';
  color: 
    | 'brown' 
    | 'white' 
    | 'black';
}

type TestHasValue1 = HasValue<TestObject621, "cat">;    // true   🟩
type TestHasValue2 = HasValue<TestObject622, "boxer">;  // false  🟩

type LookUp<T, V> 
  = T extends {}
    ? HasValue<T, V> extends true
      ? T
      : never
    : never;

// 🎉 I become familiar with the distributive of union type !
// 🩷 😚 with Huaier

type Res621 = LookUp<TestObject621 | TestObject622, "cat">;   // 🟩
type Res622 = LookUp<TestObject621 | TestObject622, "dog">;   // 🟩
type Res623 = LookUp<TestObject621 | TestObject622, "boxer">; // 🟩