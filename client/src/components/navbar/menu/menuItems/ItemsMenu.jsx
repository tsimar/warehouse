import React from "react";
import { Link } from "react-router-dom";
import { NameItemsMenu } from "./nameItemsMenu/NameItemsMenu";

export default function ItemsMenu() {
  return (
    <>
      {NameItemsMenu.map((item, index) => {
        return (
          <li className="menuItems--li" key={index}>
            <Link to={item.Link}>{item.value}</Link>
          </li>
        );
      })}
    </>
  );
}
