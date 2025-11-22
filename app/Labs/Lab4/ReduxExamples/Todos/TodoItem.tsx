"use client";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: any) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item>
      <Button
        id="wd-delete-todo-click"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        Delete
      </Button>

      <Button
        id="wd-set-todo-click"
        onClick={() => dispatch(setTodo(todo))}
      >
        Edit
      </Button>

      {todo.title}
    </ListGroup.Item>
  );
}
