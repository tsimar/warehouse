import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import User from "./components/add/user/User";
import Position from "./components/add/position/Position";
import WarehouseOut from "./components/warehouseOut/WarehouseOut";
import Elements from "./components/add/elements/Elements";
import Project from "./components/add/project/Project";


function App() {
  return (
    <Router>
      <div className="navbar">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" exact element={<WarehouseOut />} />
        <Route path="/addUser" element={<User />} />
        <Route path="/position" element={<Position />} />
        <Route path="/element" element={<Elements />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
