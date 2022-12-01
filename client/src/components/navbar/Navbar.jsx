import React from "react";

import MenuPc from "./menu/MenuPc";
import "./styleNavbar/navbar.css";

function Navbar() {
  return (
    <header className="main-header">
      <nav className="main__header--nav">
        <MenuPc />
      </nav>
    </header>
  );
}

export default Navbar;
