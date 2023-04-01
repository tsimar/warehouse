import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  Fragment,
} from "react";
import ReadItemModuleWarehouse from "./ReadItemModuleWarehouseWork";
// import { apiWarehouseWork } from "../../url/URL";
// import { Form } from "react-bootstrap";

// let p;
const ReadItemWarehouseWork = ({
  item,
  index,
  project,
  module,
  element,
  handleEditClick,
  handleDeleteClick,
  showPdfFile,
  boleanProject,
  allWarehouse,
}) => {
  // const [nameFile, setNameFile] = useState("");
  // const [enableSave, setEnableSave] = useState("noneSave");
  const [timeMachina, setTimeMachina] = useState("");
  const refId = useRef(0);
  const enableSaveRef = useRef("");
  const [machina, setMachina] = useState({
    id: "",
    bacaFanuc: "",
    lathe: "",
    heidenhain: "",
    millingMachineSmall: "",
  });

  const [propsElement, setPropsElement] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      nameElement: "",
      urlPicture: "",
    }
  );

  // const addElement = (warehouse, element) => {
  //   element.map((item) =>
  //     warehouse.idElement === item.id
  //       ? setPropsElement(item)
  //       : setNameFile(item.urlPicture)
  //   );
  // };

  // useEffect(() => {
  //   addElement(item, element);
  // }, [item]);

  useEffect(() => {
    const data = {
      id: item.id,
      bacaFanuc: item.bacaFanuc,
      lathe: item.lathe,
      heidenhain: item.heidenhain,
      millingMachineSmall: item.millingMachineSmall,
    };
    setMachina(data);
  }, [item]);

  const addProject = (warehouseWork, project) => {
    return project.map((item, index) => {
      return warehouseWork.idProject === item.id ? (
        <span className="span--project" key={index}>
          {item.nameProject}
        </span>
      ) : null;
    });
  };

  const handleGetModule = (data, moduleData, checkModule, idProject) => {
    let count = 0;
    let sortData = []
      .concat(data)
      .sort((a, b) => (a.idModule < b.idModule ? -1 : 1));

    return sortData.map((items, key) => {
      if (items.idModule !== checkModule) {
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
              warehouseWork={data}
              idProject={idProject}
              // user={user}
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
      key={item.id}
      onDoubleClick={(e) => handleEditClick(e, item)}
      onDrag={() => handleDeleteClick(item.id)}
      draggable
    >
      {boleanProject ? (
        <>
          <span className="span--id">{index + 1}</span>
          {addProject(item, project)}
          <div key={item.id + 56}>
            {handleGetModule(
              allWarehouse,
              module,
              item.idModule,
              item.idProject
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
export default ReadItemWarehouseWork;
