import React, { Fragment } from "react";
import ReadItemElementWarehouseWork from "./ReadItemElementWarehouseWork";

// let p;
const ReadItemModuleWarehouseWork = ({
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
  console.log("warehouseWork", warehouseWork);

  const addElement = (idModule, warehouseWork, idProject) => {
    let count = -1;
    return warehouseWork.map((items, index) => {
      if (items.idModule === idModule && items.idProject === idProject) {
        console.log("items", items);
        count++;
        return (
          <Fragment key={index}>
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
      ) : (
        ""
      );
    });
  };

  return (
    <Fragment key={warehouseWork.id + 2}>
      {addModule(idModule, module)}
      <div className="elem">
        {addElement(idModule, warehouseWork, idProject)}
      </div>
    </Fragment>
  );
};
export default ReadItemModuleWarehouseWork;
