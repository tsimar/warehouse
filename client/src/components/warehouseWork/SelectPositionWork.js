import React from "react";
import { useRef } from "react";

function SelectPositionWork() {
  let listTypePosition = ["magazyn", "obróbka", "gotowa"];

  const handle = (e) => {
    console.log(e.target.value);
  };
  return (
    // <select value={selectUser} onChange={(e) => setSelectUser(e.target.value)}>
    <select onChange={handle}>
      {listTypePosition.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}

export default SelectPositionWork;
