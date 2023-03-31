import React, { useState, useRef, Fragment } from "react";
import ReadItemModuleWarehouse from "./ReadItemModuleWarehouse";


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
  const [nameFile, setNameFile] = useState("");
  const [propsElement, setPropsElement] = useState([]);
  const warehouseRef = useRef(warehouse);
  const countModul = useRef(0);
  const addProject = (itemsWarehouse, project) => {
    return project.map((item, index) => {
      return itemsWarehouse.idProject === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
    });
  };

  const handleGetModule = (data, moduleData, checkModule, idProject) => {
    let count = 0;
    let sortData = []
      .concat(data)
      .sort((a, b) => (a.idModule < b.idModule ? -1 : 1));

    return sortData.map((items, key) => {
      if (items.idModule != checkModule) {
        checkModule = items.idModule;
        count = 0;
      }
      count++;

      if (count === 1) {
        return (
          <Fragment key={items.id}>
            <ReadItemModuleWarehouse
              idModule={checkModule}
              module={moduleData}
              warehouse={data}
              idProject={idProject}
              user={user}
              element={element}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              showPdfFile={showPdfFile}
            />
          </Fragment>
        );
      }
    });
  };

  return (
    <div
      className="div__div-get"
      key={warehouse.id}
      onDoubleClick={(e) => handleEditClick(e, warehouse)}
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
          <br />
        </>
      ) : null}
    </div>
  );
};
export default ReadItemProjectWarehouse;
