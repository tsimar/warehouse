import { Fragment, useState } from "react";
import ReadItemModuleWarehouse from "./ReadItemModuleWarehouse";
import { EditItemModuleWarehouse } from "./EditItemModuleWarehouse";

const ReadItemProjectWarehouse = ({
  boleanProject,
  allWarehouse,
  warehouse,
  project,
  module,
  count,
  handleEditClick,
  handleDeleteClick,
  user,
  element,
  showPdfFile,
}) => {
  let editSelectPutModule = "";
  const [editValue, setEditValue] = useState({
    editId: "",

    idProject: "",
    idModule: "",
    oldIdModule: "",
  });

  const [editSelect, setEditSelect] = useState({
    project: "",
    module: "",
    element: "",
    user: "",
    dataStart: "",
  });
  // const [nameFile, setNameFile] = useState("");
  // const [propsElement, setPropsElement] = useState([]);
  // console.log("allWarehouse line 19: ", allWarehouse);
  const addProject = (itemsWarehouse, project) => {
    return project.map((item, index) => {
      return itemsWarehouse.idProject === item.id ? (
        <span key={index} onDoubleClick={(e) => handleEditClick(e, warehouse)}>
          {item.nameProject}
        </span>
      ) : null;
    });
  };

  const changeIdByNameModule = (data) => {
    for (let index = 0; index < module.length; index++) {
      if (module[index].id === data) {
        return (editSelect.module = module[index].nameModule);
      } else {
        editSelect.module = module[0].nameModule;
      }
    }
  };
  const handleCancelClick = () => {
    setEditValue("");
  };
  const handleEditModuleClick = (event, idModule, idProject) => {
    event.preventDefault();
    const formValues = {
      idProject: idProject,
      idModule: idModule,
      oldIdModule: idModule,
    };

    setEditValue(formValues);

    changeIdByNameModule(idModule);
  };

  const handleGetModule = (data, moduleData, checkModule, idProject) => {
    let count = 0;
    let sortData = []
      .concat(data)
      .sort((a, b) => (a.idModule < b.idModule ? -1 : 1));

    if (data !== undefined) {
      return sortData.map((items, key) => {
        if (items.idModule !== checkModule) {
          checkModule = items.idModule;
          count = 0;
        }
        count++;

        if (count === 1) {
          return (
            <Fragment key={items.id}>
              {editValue.idModule === items.idModule ? (
                <EditItemModuleWarehouse
                  editValue={editValue}
                  module={moduleData}
                  idModule={checkModule}
                  handleCancelClick={handleCancelClick}
                  // handleEditModuleClick={handleEditModuleClick}
                  // let editSelectPutModule = {let editSelectPutModule = "";}
                />
              ) : (
                <ReadItemModuleWarehouse
                  idModule={checkModule}
                  module={moduleData}
                  warehouse={data}
                  idProject={idProject}
                  user={user}
                  element={element}
                  handleEditModuleClick={handleEditModuleClick}
                  handleDeleteClick={handleDeleteClick}
                  showPdfFile={showPdfFile}
                />
              )}
            </Fragment>
          );
        }
      });
    }
  };

  return (
    <div
      className="div__div-get"
      key={warehouse.id}
      onDrag={() => handleDeleteClick(warehouse.id)}
      draggable
    >
      {boleanProject ? (
        <>
          <span>{count + 1}</span>
          {/* <span>{(countModul.current += 1)}</span> */}
          {addProject(warehouse, project)}
          <div key={warehouse.id + 56}>
            {handleGetModule(
              allWarehouse,
              module,
              warehouse.idModule,
              warehouse.idProject
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
export default ReadItemProjectWarehouse;
