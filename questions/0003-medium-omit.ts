// #medium #union #built-in

type GetOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = GetOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false
}