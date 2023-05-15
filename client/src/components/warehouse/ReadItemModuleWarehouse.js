import React, { Fragment, useState } from "react";
import ReadItemElementWarehouse from "./ReadItemElementWarehouse";
import { EditItemElementWarehouse } from "./EditItemElementWarehouse";

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
    return warehouse.map((items, index) => {
      if (items.idModule === idModule && items.idProject === idProject) {
        count++;
        return (
          <Fragment key={items.id}>
            {editValueElement.idElement === items.idElement ? (
              <EditItemElementWarehouse
                editValueElement={editValueElement}
                // module={moduleData}
                // idModule={checkModule}
                element={element}
                handleCancelClick={handleCancelClick}
                // handleEditModuleClick={handleEditModuleClick}
                // let editSelectPutModule = {let editSelectPutModule = "";}
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
    console.log(warehouse[0].idProject);
    return module.map((item, index) => {
      return idModule === item.id ? (
        <span
          key={index}
          onDoubleClick={(e) =>
            handleEditModuleClick(e, idModule, warehouse[0].idProject)
          }
        >
          {item.nameModule}
        </span>
      ) : null;
    });
  };

  return (
    <Fragment key={warehouse.id}>
      {addModule(idModule, module)}
      <div className="elem">{addElement(idModule, warehouse, idProject)}</div>
    </Fragment>
  );
};
export default ReadItemModuleWarehouse;
