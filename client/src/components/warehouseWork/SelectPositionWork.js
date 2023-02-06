import React from "react";

export default function SelectPositionWork() {
  let listTypePosition = ["magazyn", "obróbka", "gotowa"];

  return (
    // <select value={selectUser} onChange={(e) => setSelectUser(e.target.value)}>
    <select>
      {listTypePosition.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}
