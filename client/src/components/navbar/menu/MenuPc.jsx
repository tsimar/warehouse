import React from "react";
import ItemsMenu from "./menuItems/ItemsMenu";
import "./styleMenu/menu.css";

export default function MenuPc() {
  return (
    <>
      <ul className="ul__menu--pc">
        <ItemsMenu />
      </ul>
    </>
  );
}
