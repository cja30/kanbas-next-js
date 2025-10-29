"use client";

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Lab3Home from "./Lab3Home";
import PathParameters from "./PathParameters";
import AddPathParameters from "./AddPathParameters";

export default function Lab3RouterApp() {
  return (
    <div id="wd-lab3" className="p-3">
      <h3>Lab 3</h3>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Lab3Home />} />
          <Route path="/path" element={<PathParameters />} />
          <Route path="/add/:a/:b" element={<AddPathParameters />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
