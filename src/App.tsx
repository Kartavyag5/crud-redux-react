import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import Tree from "./pages/users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="tree" element={<Tree />} />
    </Routes>
  );
}

export default App;
