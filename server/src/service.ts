import { v4 as uuid } from "uuid";

import { Todo } from "./models";

const db = new Map<string, Todo>();

const mockData: Todo[] = [
  { id: uuid(), text: "study", done: false },
  { id: uuid(), text: "buy milk", done: false },
  { id: uuid(), text: "do jogging", done: false },
  { id: uuid(), text: "clean my room", done: false },
];

export const initDb = () => {
  mockData.forEach((todo) => {
    db.set(todo.id, todo);
  });
  console.log("database initialization done.appRouter");
};

export const todoService = {
  getById(id: string): Todo | null {
    const todo = db.get(id);
    return todo ? todo : null;
  },
  getList(): Todo[] {
    return Array.from(db.values());
  },
  add(text: string): Todo {
    const id = uuid();
    const todo: Todo = { id, text, done: false };
    db.set(id, todo);
    return todo;
  },
  upsert(id: string, todo: Todo): Todo {
    db.set(id, todo);
    return todo;
  },
  delete(id: string): number {
    if (db.get(id)) {
      db.delete(id);
      return 1;
    }
    return 0;
  },
};
