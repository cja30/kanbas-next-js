"use client";
import { Link } from "react-router-dom";

export default function PathParameters() {
  return (
    <div id="wd-path-parameters">
      <h2>Path Parameters</h2>
      <Link to="add/1/2">1 + 2</Link><br />
      <Link to="add/3/4">3 + 4</Link>
    </div>
  );
}
