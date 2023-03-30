import React, { useState, useEffect, useReducer, useRef } from "react";
import SelectPositionWork from "./SelectPositionWork";
import { apiWarehouseWork } from "../../url/URL";
import { Form } from "react-bootstrap";

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
}) => {
  console.log("item:", item);
  const [nameFile, setNameFile] = useState("");
  const [enableSave, setEnableSave] = useState("noneSave");
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
  const addModule = (warehouseWork, module) => {
    console.log(module[0].name);
    return module.map((item, index) => {
      return warehouseWork.idModule === item.id ? (
        <span className="span--module" key={index}>
          {item.nameModule}
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
  // const handleEditSubmit = (e) => {
  //   // e.preventDefault();
  //   console.log(e);
  // };

  const handle = (e) => {
    console.log(e.target.value);
    console.log("fanuc status", e.target.name);
    console.log("id-work", item.id);

    setTimeMachina(e.target.name);

    const newFormData = { ...machina };
    newFormData[e.target.name] = e.target.value;
    refId.current = item.id;
    setMachina(newFormData);
    enableSaveRef.current = "visibleSave";
  };

  const handleSaveWork = (e) => {
    e.preventDefault();
    // if (
    //   machina.timeFanuc > 0 ||
    //   machina.timeSmall > 0 ||
    //   machina.timeLathe > 0 ||
    //   machina.timeHeidenhain > 0
    // ) {
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
    // setEnableSave("noneSave");
    enableSaveRef.current = "noneSave";
    setTimeMachina("none-time");
    // }
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
      {addModule(item, module)}
      <span className="span--element" onClick={() => showPdfFile(propsElement)}>
        {propsElement.nameElement}
      </span>
      <span className="span--number">{item.number}</span>
      {handleChangeDate(item.dataStart)}
      {handleChangeDate(item.dataFinish)}
      <form onSubmit={handleSaveWork} className="worehouseWork__form--machine">
        <div className="div--button" key={2}>
          <SelectPositionWork
            handle={handle}
            name="lathe"
            status={item.lathe}
          />
          <input
            className={`${timeMachina === "lathe" ? "show-time" : "none-time"}`}
            placeholder="work time in minutes"
            type="number"
            pattern="[0-9]*"
            min="1"
            required
          />
        </div>
        <div className="div--button" key={3}>
          <SelectPositionWork
            handle={handle}
            name="bacaFanuc"
            status={item.bacaFanuc}
          />
          <input
            className={`${
              timeMachina === "bacaFanuc" ? "show-time" : "none-time"
            }`}
            placeholder="time"
            type="number"
            pattern="[0-9]*"
            min="1"
            required
          />
        </div>
        <div className="div--button" key={4}>
          <SelectPositionWork
            handle={handle}
            name="heidenhain"
            status={item.heidenhain}
          />
          <input
            className={`${
              timeMachina === "heidenhain" ? "show-time" : "none-time"
            }`}
            placeholder="time"
            type="number"
            pattern="[0-9]*"
            min="1"
            required
          />
        </div>
        <div className="div--button" key={5}>
          <SelectPositionWork
            handle={handle}
            name="millingMachineSmall"
            status={item.millingMachineSmall}
          />
          <input
            className={`${
              timeMachina === "millingMachineSmall" ? "show-time" : "none-time"
            }`}
            placeholder="time"
            type="number"
            pattern="[0-9]*"
            min="1"
            required
          />
        </div>

        <button className={enableSaveRef.current} type="submit">
          save
        </button>
      </form>
    </div>
  );
};
export default ReadItemWarehouseWork;
