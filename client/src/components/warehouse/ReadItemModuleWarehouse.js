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
  handleEditModuleClick,
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
