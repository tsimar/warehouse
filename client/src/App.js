import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import User from "./components/add/user/User";
import Position from "./components/add/position/Position";
import Warehouse from "./components/warehouse/Warehouse";
import Elements from "./components/add/elements/Elements";
import Project from "./components/add/project/Project";
import WarehouseWork from "./components/warehouseWork/WarehouseWork";
import GoodElements from "./components/goodElement/GoodElements";

function App() {
  return (
    <Router>
      <div className="navbar">
        <Navbar />
      </div>
      <Routes>
        <Route index element={<Warehouse />} />

        <Route path="/project" element={<Project />} />
        <Route path="/user" element={<User />} />
        <Route path="/position" element={<Position />} />
        <Route path="/element" element={<Elements />} />

        <Route path="/wareWork" element={<WarehouseWork />} />
        <Route path="/goodElement" element={<GoodElements />} />
      </Routes>
    </Router>
  );
}

export default App;
