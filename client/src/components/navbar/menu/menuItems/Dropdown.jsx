import React from "react";
import { Link } from "react-router-dom";

export default function Dropdown({ submenus, dropdown }) {
  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => {
        return (
          <li className="menuItems--li" key={index}>
            <Link className="menuItems__li--a" to={submenu.Link}>
              {submenu.value}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
