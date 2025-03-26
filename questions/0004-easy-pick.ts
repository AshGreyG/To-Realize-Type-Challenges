// #easy #union #built-in

type GetPick<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P]
}

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreviewUsingPick = GetPick<Todo, "description" | "title">;

const todoUsingPick: TodoPreviewUsingPick = {
  title: "Clean room",
  description: "It should be completed in today"
}