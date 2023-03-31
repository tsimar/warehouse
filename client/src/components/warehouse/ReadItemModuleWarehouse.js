import React, { Fragment } from "react";
import ReadItemElementWarehouse from "./ReadItemElementWarehouse";

const ReadItemModuleWarehouse = ({
  idModule,
  warehouse,
  module,
  idProject,
  user,
  element,
  showPdfFile,
}) => {
  const addElement = (idModule, warehouse, idProject) => {
    let count = -1;
    return warehouse.map((items, index) => {
      if (items.idModule === idModule && items.idProject === idProject) {
        count++;
        return (
          <Fragment key={items.id}>
            <ReadItemElementWarehouse
              warehouse={items}
              element={element}
              user={user}
              showPdfFile={showPdfFile}
              count={count}
            />
          </Fragment>
        );
      }
    });
  };

  const addModule = (idModule, module) => {
    return module.map((item, index) => {
      return idModule === item.id ? (
        <span key={index}>{item.nameModule}</span>
      ) : null;
    });
  };

  return (
    <>
      {addModule(idModule, module)}
      <div className="eelem">{addElement(idModule, warehouse, idProject)}</div>
    </>
  );
};
export default ReadItemModuleWarehouse;
