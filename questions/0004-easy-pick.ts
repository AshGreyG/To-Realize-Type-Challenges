// #easy #union #built-in

type GetPick<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P]
}

type GetPickSimpler<T, K extends keyof T> = {
  [P in K]: T[P];
}

interface Todo4 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview4 = GetPick<Todo4, "description" | "title">;

const todoUsingPick: TodoPreview4 = {
  title: "Clean room",
  description: "It should be completed in today"
}