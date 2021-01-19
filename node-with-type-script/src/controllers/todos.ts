import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  TODOS.push(new Todo(Math.random().toString(), text));

  res.status(201).json({ message: "created successfully" });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const text = (req.body as { text: string }).text;

  const todo_index = TODOS.findIndex((todo) => todo.id === id);
  if (todo_index < 0) {
    throw new Error("TODO not found");
  }

  TODOS[todo_index].text = text;

  res.status(200).json({ message: "updated successfully" });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const todo_index = TODOS.findIndex((todo) => todo.id === id);
  if (todo_index < 0) {
    throw new Error("TODO not found");
  }

  TODOS.splice(todo_index, 1);

  res.status(200).json({ message: "deleted successfully" });
};
