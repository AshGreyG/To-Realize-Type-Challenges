// #medium #union #built-in

type GetOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

interface Todo3 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview3 = GetOmit<Todo3, "description" | "title">;

const todo: TodoPreview3 = {
  completed: false
}