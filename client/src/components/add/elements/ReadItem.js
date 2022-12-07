import React from "react";

const ReadItem = ({ item, handleEditClick }) => {
  return (
    <div
      className="div__div-get"
      key={item.id}
      onClick={(e) => handleEditClick(e, item)}
    >
      <span>{item.id}</span>
      <span>{item.nameElement}</span>
      <span>{item.urlPicture}</span>
    </div>
  );
};
export default ReadItem;
