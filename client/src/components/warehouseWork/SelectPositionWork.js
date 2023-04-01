import React from "react";
import { useState } from "react";

function SelectPositionWork({ handle, name, status }) {
  let listTypePosition = ["magazyn", "obróbka", "gotowa"];
  if (!status) {
    status = "magazyn";
  }
  const [statusWork, setStatusWork] = useState(status);

  return (
    <select
      value={statusWork}
      name={name}
      onChange={handle}
      onClick={(e) => setStatusWork(e.target.value)}
    >
      {listTypePosition.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </select>
  );
}

export default SelectPositionWork;
