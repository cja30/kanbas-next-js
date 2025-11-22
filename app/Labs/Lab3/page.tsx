"use client";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { useSelector } from "react-redux";

import Lab3RouterApp from "./Lab3RouterApp";  // <-- your old router

export default function Lab3() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div id="wd-lab3">
      <h2>Lab 3</h2>

      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
      
      <Lab3RouterApp />

    </div>
  );
}
