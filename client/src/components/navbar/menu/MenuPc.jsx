import React from "react";
import MenuItems from "./menuItems/MenuItems";
import { menuItems } from "./menuItems/nameItemsMenu/menuItems";
import "./styleMenu/menu.css";

export default function MenuPc() {
  return (
    <>
      <ul className="ul__menu--pc">
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </>
  );
}
