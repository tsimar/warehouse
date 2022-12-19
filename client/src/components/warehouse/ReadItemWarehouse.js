import React from "react";

const ReadItemWarehouse = ({
  item,
  index,
  project,
  element,
  user,
  handleEditClick,
}) => {
  const objName = Object.keys(item);

  const addUser = (warehouse, user) => {
    return user.map((item, index) => {
      return warehouse.idUser === item.id ? (
        <span key={index}>
          {item.nameUser} {item.lastName}
        </span>
      ) : null;
    });
  };
  const addElement = (warehouse, element) => {
    return element.map((item, index) => {
      return warehouse.idElement === item.id ? (
        <span key={index}>{item.nameElement}</span>
      ) : null;
    });
  };
  const addProject = (warehouse, project) => {
    return project.map((item, index) => {
      return warehouse.idProject === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
    });
  };

  return (
    <div
      className="div__div-get"
      key={item.id}
      onClick={(e) => handleEditClick(e, item)}
    >
      <span>{index + 1}</span>
      {addElement(item, element)}
      <span>{item.number}</span>

      {addProject(item, project)}
      <span>{item.dataStart}</span>
      {addUser(item, user)}
    </div>
  );
};
export default ReadItemWarehouse;
