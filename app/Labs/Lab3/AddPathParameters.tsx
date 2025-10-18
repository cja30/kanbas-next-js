"use client";
import { useParams } from "react-router-dom";

export default function AddPathParameters() {
  const { a = "0", b = "0" } = useParams();
  return (
    <div id="wd-add">
      <h4>Add Path Parameters</h4>
      {a} + {b} = {Number(a) + Number(b)}
    </div>
  );
}