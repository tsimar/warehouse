import React, { useState, useEffect, useReducer, useRef } from "react";
import SelectPositionWork from "./SelectPositionWork";
import { apiWarehouseWork } from "../../url/URL";

// let p;
const ReadItemWarehouseWork = ({
  item,
  index,
  project,
  element,
  handleEditClick,
  handleDeleteClick,
  showPdfFile,
}) => {
  const [nameFile, setNameFile] = useState("");
  const [enableSave, setEnableSave] = useState("noneSave");
  const refId = useRef(0);

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
  console.log("dataStart", item.dataStart);
  const addElement = (warehouse, element) => {
    element.map((item) =>
      warehouse.idElement === item.id
        ? setPropsElement(item)
        : setNameFile(item.urlPicture)
    );
  };

  useEffect(() => {
    addElement(item, element);
  }, [item]);

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
  const handleChangeDate = (data) => {
    let date;
    let d;
    let m;
    let y;
    if (data === null) {
      date = new Date();
      d = date.getDate();
      m = date.getMonth() + 1;
      y = date.getFullYear();
    } else {
      date = data.split("-");
      d = date[2];
      m = date[1];
      y = date[0];
    }

    date = d + "-" + m + "-" + y;
    return <span className="span--date">{date}</span>;
  };
  const handleEditSubmit = (e) => {
    // e.preventDefault();
    console.log(e);
  };
  const handle = (e) => {
    console.log(e.target.value);
    console.log("fanuc status", item.bacaFanuc);
    console.log("id-work", item.id);
    const newFormData = { ...machina };
    newFormData[e.target.name] = e.target.value;
    refId.current = item.id;
    setMachina(newFormData);
    setEnableSave("visibleSave");
  };

  const handleSaveWork = (e) => {
    e.preventDefault();
    const newWarehouseWork = {
      id: refId.current,
      bacaFanuc: machina.bacaFanuc,
      lathe: machina.lathe,
      heidenhain: machina.heidenhain,
      millingMachineSmall: machina.millingMachineSmall,
      idProject: item.idProject,
      idElement: item.idElement,
    };
    apiWarehouseWork
      .put("/changeWorkMachine", newWarehouseWork)

      .catch((error) => {
        console.log(error);
      });
    setEnableSave("noneSave");
  };
  return (
    <div
      className="div__div-get"
      key={item.id}
      onDoubleClick={(e) => handleEditClick(e, item)}
      onDrag={() => handleDeleteClick(item.id)}
      draggable
    >
      <span className="span--id">{index + 1}</span>
      {addProject(item, project)}
      <span className="span--element" onClick={() => showPdfFile(propsElement)}>
        {propsElement.nameElement}
      </span>
      <span className="span--number">{item.number}</span>
      {handleChangeDate(item.dataStart)}
      {handleChangeDate(item.dataFinish)}
      <div className="div--button" key={2}>
        <SelectPositionWork handle={handle} name="lathe" status={item.lathe} />
      </div>
      <div className="div--button" key={3}>
        <SelectPositionWork
          handle={handle}
          name="bacaFanuc"
          status={item.bacaFanuc}
        />
      </div>
      <div className="div--button" key={4}>
        <SelectPositionWork
          handle={handle}
          name="heidenhain"
          status={item.heidenhain}
        />
      </div>
      <div className="div--button" key={5}>
        <SelectPositionWork
          handle={handle}
          name="millingMachineSmall"
          status={item.millingMachineSmall}
        />
      </div>
      <button className={enableSave} onClick={(e) => handleSaveWork(e)}>
        save
      </button>
    </div>
  );
};
export default ReadItemWarehouseWork;
