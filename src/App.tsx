import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import Tree from "./pages/users";
import KanbanBoard from "./pages/drag & drop";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tree" element={<Tree />} />
      <Route path="drag-drop" element={<KanbanBoard />} />
    </Routes>
  );
}

export default App;
