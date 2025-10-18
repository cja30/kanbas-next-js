"use client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lab3Home from "./Lab3Home";
import PathParameters from "./PathParameters";
import AddPathParameters from "./AddPathParameters";

function WhereAmI() {
  const loc = useLocation();
  return (
    <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
      <code>ReactRouter pathname: {loc.pathname}</code>
    </div>
  );
}

export default function Lab3RouterApp() {
  return (
    <div id="wd-lab3" className="p-3">
      <h3>Lab 3</h3>
      <BrowserRouter basename="/Labs/Lab3">
        <Routes>
          <Route path="/" element={<Lab3Home />} />
          <Route path="path" element={<PathParameters />} />
          <Route path="add/:a/:b" element={<AddPathParameters />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
