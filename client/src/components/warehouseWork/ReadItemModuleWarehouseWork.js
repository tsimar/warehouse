import React, { Fragment } from "react";
import ReadItemElementWarehouseWork from "./ReadItemElementWarehouseWork";

// let p;
const ReadItemWarehouseWork = ({
  warehouseWork,
  index,
  idProject,
  module,
  idModule,
  element,
  handleEditClick,
  handleDeleteClick,
  showPdfFile,
}) => {
  const addElement = (idModule, warehouseWork, idProject) => {
    let count = -1;
    return warehouseWork.map((items, index) => {
      if (items.idModule === idModule && items.idProject === idProject) {
        count++;
        return (
          <Fragment key={items.id}>
            <ReadItemElementWarehouseWork
              warehouseWork={items}
              element={element}
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
      <div className="eelem">
        {addElement(idModule, warehouseWork, idProject)}
      </div>
    </>
  );
};
export default ReadItemWarehouseWork;
