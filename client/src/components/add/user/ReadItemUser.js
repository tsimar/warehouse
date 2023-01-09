import React from "react";

const ReadItemUser = ({
  item,
  index,
  position,
  handleEditClick,
  handleDeleteClick,
}) => {
  const objName = Object.keys(item);

  const addSpan = (data, obj) => {
    return data.map((item, index) => {
      return (index > 0) & (5 > index) ? (
        <span key={index}>{obj[data[index]]}</span>
      ) : null;
    });
  };

  const addPosition = (user, position) => {
    return position.map((item, index) => {
      return user.idPosition === item.id ? (
        <span key={index}>{item.position}</span>
      ) : null;
    });
  };

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
      {addPosition(item, position)}
    </div>
  );
};
export default ReadItemUser;
