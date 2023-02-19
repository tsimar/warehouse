import React, { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
  return (
    <li
      className="menuItems--li"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items && items.subMenu ? (
        <>
          <button
            className="menuItems--button"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.value}
          </button>
          <Dropdown
            className="dropdown-shadow"
            submenus={items.subMenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link className="menuItems__li--a" to={items.Link}>
          {items.value}
        </Link>
      )}
    </li>
  );
};
export default MenuItems;
