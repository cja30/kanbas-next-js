"use client";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroup.Item>
      <Button
        id="wd-add-todo-click"
        onClick={() => dispatch(addTodo(todo))}
      >
        Add
      </Button>

      <Button
        id="wd-update-todo-click"
        onClick={() => dispatch(updateTodo(todo))}
      >
        Update
      </Button>

      <Form.Control
        value={todo.title}
        onChange={(e) =>
          dispatch(setTodo({ ...todo, title: e.target.value }))
        }
      />
    </ListGroup.Item>
  );
}
