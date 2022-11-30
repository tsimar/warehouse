import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import User from "./components/add/user/User";
import Position from "./components/add/position/Position";
import WarehouseOut from "./components/warehouseOut/WarehouseOut";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" exact element={<WarehouseOut />} />
        <Route path="/addUser" element={<User />} />
        <Route path="/position" element={<Position />} />
      </Routes>
    </Router>
  );
}

export default App;
