import React from "react";
import { useRef } from "react";

function SelectPositionWork({ handle, name }) {
  let listTypePosition = ["magazyn", "obróbka", "gotowa"];

  return (
    <select name={name} onChange={handle}>
      {listTypePosition.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}

export default SelectPositionWork;
