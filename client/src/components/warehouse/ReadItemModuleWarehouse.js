import React, { Fragment, useState } from "react";
import ReadItemElementWarehouse from "./ReadItemElementWarehouse";
import { EditItemElementWarehouse } from "./EditItemElementWarehouse";
import { apiWarehouse } from "../../url/URL";
const ReadItemModuleWarehouse = ({
  idModule,
  warehouse,
  module,
  idProject,
  project,
  user,
  element,
  showPdfFile,
  handleEditModuleClick,
}) => {
  const [dataWarehouse, setDataWarehouse] = useState(warehouse);

  const [editValueElement, setEditValueElement] = useState({
    editId: "",

    idProject: "",
    idModule: "",
    oldIdElement: "",
    idElement: "",
  });
  const [editSelect, setEditSelect] = useState({
    project: "",
    module: "",
    element: "",
    user: "",
    dataStart: "",
  });
  const handleCancelClick = () => {
    setEditValueElement("");
  };

  const handleEditElementClick = (event, edit, idElement) => {
    event.preventDefault();
    console.log("edidt id=", edit);
    console.log(idElement);
    let dateLocal = new Date();

    let date = edit.dataStart.split("-");
    dateLocal.setDate(date[2]);
    dateLocal.setMonth(date[1] - 1);
    dateLocal.setFullYear(date[0]);

    const formValues = {
      id: edit.id,
      idProject: edit.idProject,
      idModule: edit.idModule,
      idElement: edit.idElement,
      number: edit.number,
      dataStart: dateLocal,
      idUser: edit.idUser,
      oldIdElement: edit.idElement,
      // warehouseName: warehouseName,
    };

    setEditValueElement(formValues);
    // changeIdByNameProject(edit.idProject);
    // changeIdByNameModule(edit.idModule);
    changeIdByNameUser(edit.idUser);
    changeIdByNameElement(edit.idElement);
  };

  const changeIdByNameUser = (data) => {
    for (let index = 0; index < project.length; index++) {
      if (project[index].id === data) {
        return (editSelect.user = user[index].nameUser);
      } else {
        editSelect.user = user[0].nameUser;
      }
    }
  };
  const handleDeleteClick = (idProps) => {
    if (window.confirm("Do you really deleting?")) {
      // window.open("exit.html", "I hope you know what you're doing!");
      const newContacts = [...dataWarehouse];
      const index = dataWarehouse.findIndex(
        (contact) => contact.id === idProps
      );
      newContacts.splice(index, 1);
      setDataWarehouse(newContacts);
      apiWarehouse.delete(`/${idProps}`);
    }
  };
  const changeIdByNameElement = (data) => {
    for (let index = 0; index < element.length; index++) {
      if (element[index].id === data) {
        return (editSelect.element = element[index].nameElement);
      } else {
        editSelect.element = element[0].nameelement;
      }
    }
  };
  const addElement = (idModule, warehouse, idProject) => {
    let count = -1;
    return dataWarehouse.map((items, index) => {
      if (items.idModule === idModule && items.idProject === idProject) {
        count++;
        return (
          <Fragment key={items.id}>
            {editValueElement.idElement === items.idElement &&
            editValueElement.id === items.id ? (
              <EditItemElementWarehouse
                editValueElement={editValueElement}
                element={element}
                handleCancelClick={handleCancelClick}
                handleDeleteClick={handleDeleteClick}
              />
            ) : (
              <ReadItemElementWarehouse
                warehouse={items}
                element={element}
                user={user}
                showPdfFile={showPdfFile}
                handleEditElementClick={handleEditElementClick}
                count={count}
              />
            )}
          </Fragment>
        );
      }
    });
  };

  const addModule = (idModule, module) => {
    console.log(dataWarehouse[0].idProject);
    return module.map((item, index) => {
      return idModule === item.id ? (
        <span
          key={index}
          onDoubleClick={(e) =>
            handleEditModuleClick(e, idModule, dataWarehouse[0].idProject)
          }
        >
          {item.nameModule}
        </span>
      ) : null;
    });
  };

  return (
    <Fragment key={dataWarehouse.id}>
      {addModule(idModule, module)}
      <div className="elem">
        {addElement(idModule, dataWarehouse, idProject)}
      </div>
    </Fragment>
  );
};
export default ReadItemModuleWarehouse;
