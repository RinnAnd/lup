import { create } from "zustand";
import Todo from "../types/todos";

type Store = {
  in_progress: Todo[];
  completed: Todo[];
  setTodos: (todos: { in_progress: Todo[]; completed: Todo[] }) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
};

export const useStore = create<Store>((set) => ({
  in_progress: [],
  completed: [],
  setTodos: (todos) => set(todos),
  addTodo: (todo) =>
    set((state) => ({
      in_progress: [...state.in_progress, todo],
      completed: state.completed,
    })),
  deleteTodo: (id) =>
    set((state) => ({
      in_progress: state.in_progress.filter((todo) => todo.id !== id),
      completed: state.completed.filter((todo) => todo.id !== id),
    })),
  updateTodo: (todo) =>
    set((state) => {
      const in_progress = state.in_progress.map((t) =>
        t.id === todo.id ? todo : t
      );
      const completed = state.completed.map((t) =>
        t.id === todo.id ? todo : t
      );

      return { in_progress, completed };
    }),
}));
