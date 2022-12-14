// import matchers from "@testing-library/jest-dom/matchers";
import React from "react";

const ReadItem = ({ item, index, handleEditClick }) => {
  const objName = Object.keys(item);

  const addSpan = (data, obj) => {
    return data.map((_, index) => {
      return index > 0 ? <span key={index}>{obj[data[index]]}</span> : null;
    });
  };

  return (
    <div
      className="div__div-get"
      key={item.id}
      onClick={(e) => handleEditClick(e, item)}
    >
      <span>{index + 1}</span>
      {addSpan(objName, item)}
    </div>
  );
};
export default ReadItem;
