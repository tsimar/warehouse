import React from "react";
import { Link } from "react-router-dom";
import { NameItemsMenu } from "./nameItemsMenu/NameItemsMenu";

export default function ItemsMenu() {
  return (
    <>
      {NameItemsMenu.map((item, index) => (
        <li className="menuItems--li" key={index}>
          <Link to={{ pathname: item.href }}>{item.value}</Link>
        </li>
      ))}
    </>
  );
}
