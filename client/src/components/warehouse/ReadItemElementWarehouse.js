import React from "react";

const ReadItemElementWarehouse = ({
  // idProject,
  warehouse,
  count,

  element,
  user,
  handleEditElementClick,
  // handleDeleteClick,
  showPdfFile,
}) => {
  const addUser = (warehouse, user) => {
    return user.map((item, index) => {
      return warehouse.idUser === item.id ? (
        <span key={index}>
          {item.nameUser} {item.lastName}
        </span>
      ) : null;
    });
  };

  const addElement = (itemsWarehouse, element) => {
    return element.map((item, index) => {
      return itemsWarehouse.idElement === item.id ? (
        <span key={index} onClick={() => showPdfFile(item)}>
          {item.nameElement}
        </span>
      ) : null;
    });
  };

  const handleChangeDate = (data) => {
    let date;
    let d;
    let m;
    let y;
    if (data === null) {
      date = new Date();
      d = date.getDate();
      m = date.getMonth() + 1;
      y = date.getFullYear();
    } else {
      date = data.split("-");
      d = date[2];
      m = date[1];
      y = date[0];
    }

    date = d + "-" + m + "-" + y;
    return <span>{date}</span>;
  };
  return (
    <div
      key={warehouse.id}
      onDoubleClick={(e) =>
        handleEditElementClick(e, warehouse, warehouse.idElement)
      }
      // onDrag={() => handleDeleteClick(warehouse.id)}
      draggable
    >
      <span>{count + 1}</span>
      {addElement(warehouse, element)}
      <span>{warehouse.number}</span>
      {handleChangeDate(warehouse.dataStart)}
      {addUser(warehouse, user)}
    </div>
  );
};
export default ReadItemElementWarehouse;
