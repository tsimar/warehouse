// import matchers from "@testing-library/jest-dom/matchers";
import React from "react";

const ReadItem = ({
  item,
  index,
  handleEditClick,
  handleDeleteClick,
  showPdfFile,
  disabled,
}) => {
  const objName = Object.keys(item);

  const addSpan = (data, obj) => {
    return data.map((_, index) => {
      return index > 0 ? <span key={index}>{obj[data[index]]}</span> : null;
    });
  };
  const handleShowOnClick = () => {
    return (
      <div
        className="div__div-get"
        key={item.id}
        onDoubleClick={(e) => handleEditClick(e, item)}
        onDrag={() => handleDeleteClick(item.id)}
        draggable
        onClick={() => showPdfFile(item.urlPicture)}
      >
        <span>{index + 1}</span>
        {addSpan(objName, item)}
      </div>
    );
  };

  const handleNotShowOnClick = () => {
    return (
      <div
        className="div__div-get"
        key={item.id}
        onDoubleClick={(e) => handleEditClick(e, item)}
        onDrag={() => handleDeleteClick(item.id)}
        draggable
      >
        <span>{index + 1}</span>
        {addSpan(objName, item)}
        <span className="bandCode">{item.code112}</span>
      </div>
    );
  };
  const handleSelectShowPage = (item) => {
    return disabled ? handleNotShowOnClick(item) : handleShowOnClick(item);
  };

  return <>{handleSelectShowPage(item)}</>;
};
export default ReadItem;
