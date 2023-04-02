import React, { useState, useEffect, useReducer, useRef } from "react";
import SelectPositionWork from "./SelectPositionWork";
import { apiWarehouseWork } from "../../url/URL";

// let p;
const ReadItemWarehouseWork = ({
  warehouseWork,
  count,
  element,
  handleEditClick,
  handleDeleteClick,
  showPdfFile,
}) => {
  const [nameFile, setNameFile] = useState("");

  const [nameClassShow, setNameClassShow] = useState("");
  const refId = useRef(0);
  const enableSaveRef = useRef("");
  const [machina, setMachina] = useState({
    id: "",
    bacaFanuc: "",
    lathe: "",
    heidenhain: "",
    millingMachineSmall: "",
  });
  const [machinaTime, setMachinaTime] = useState({
    fanucTime: "",
    smallTime: "",
    heidenhainTime: "",
    latheTime: "",
  });

  const [propsElement, setPropsElement] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      nameElement: "",
      urlPicture: "",
    }
  );

  const addElement = (data, element) => {
    element.map((item) =>
      data.idElement === item.id
        ? setPropsElement(item)
        : setNameFile(item.urlPicture)
    );
  };

  useEffect(() => {
    addElement(warehouseWork, element);
  }, [warehouseWork]);

  useEffect(() => {
    const data = {
      id: warehouseWork.id,
      bacaFanuc: warehouseWork.bacaFanuc,
      lathe: warehouseWork.lathe,
      heidenhain: warehouseWork.heidenhain,
      millingMachineSmall: warehouseWork.millingMachineSmall,
      fanucTime: warehouseWork.fanucTime,
      smallTime: warehouseWork.smallTime,
      heidenhainTime: warehouseWork.heidenhainTime,
      latheTime: warehouseWork.latheTime,
    };
    setMachina(data);
  }, [warehouseWork]);

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

  const handle = (e) => {
    setNameClassShow(e.target.name);
    const newFormData = { ...machina };
    newFormData[e.target.name] = e.target.value;
    refId.current = warehouseWork.id;
    setMachina(newFormData);
    enableSaveRef.current = "visibleSave";
  };

  const handleOnChange = (e) => {
    const newFormData = { ...machinaTime };
    newFormData[e.target.name] = e.target.value;
    refId.current = warehouseWork.id;
    setMachinaTime(newFormData);
  };

  const handleSaveWork = (e) => {
    e.preventDefault();
    console.log("e save", e);
    const newWarehouseWork = {
      id: refId.current,
      bacaFanuc: machina.bacaFanuc,
      lathe: machina.lathe,
      heidenhain: machina.heidenhain,
      millingMachineSmall: machina.millingMachineSmall,
      idProject: warehouseWork.idProject,
      idElement: warehouseWork.idElement,
      fanucTime: machinaTime.fanucTime,
      smallTime: machinaTime.smallTime,
      heidenhainTime: machinaTime.heidenhainTime,
      latheTime: machinaTime.latheTime,
    };
    apiWarehouseWork
      .put("/changeWorkMachine", newWarehouseWork)

      .catch((error) => {
        console.log(error);
      });

    enableSaveRef.current = "noneSave";
    setNameClassShow("none-time");
  };
  return (
    <div
      className="div__div-get"
      key={warehouseWork.id}
      onDoubleClick={(e) => handleEditClick(e, warehouseWork)}
      onDrag={() => handleDeleteClick(warehouseWork.id)}
      draggable
    >
      <span className="span--id">{count + 1}</span>

      <span className="span--element" onClick={() => showPdfFile(propsElement)}>
        {propsElement.nameElement}
      </span>
      <span className="span--number">{warehouseWork.number}</span>
      {handleChangeDate(warehouseWork.dataStart)}
      {handleChangeDate(warehouseWork.dataFinish)}
      <form onSubmit={handleSaveWork} className="worehouseWork__form--machine">
        <div className="div--button" key={2}>
          <SelectPositionWork
            handle={handle}
            name="lathe"
            status={warehouseWork.lathe}
          />
          <input
            className={`${
              nameClassShow === "lathe" ? "show-time" : "none-time"
            }`}
            placeholder="work time in minutes"
            type="number"
            pattern="[0-9]*"
            min="1"
            name="latheTime"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="div--button" key={3}>
          <SelectPositionWork
            handle={handle}
            name="bacaFanuc"
            status={warehouseWork.bacaFanuc}
          />
          <input
            className={`${
              nameClassShow === "bacaFanuc" ? "show-time" : "none-time"
            }`}
            name="fanucTime"
            placeholder="work time in minutes"
            type="number"
            pattern="[0-9]*"
            min="1"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="div--button" key={4}>
          <SelectPositionWork
            handle={handle}
            name="heidenhain"
            status={warehouseWork.heidenhain}
          />
          <input
            className={`${
              nameClassShow === "heidenhain" ? "show-time" : "none-time"
            }`}
            name="heidenhainTime"
            placeholder="work time in minutes"
            type="number"
            pattern="[0-9]*"
            min="1"
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="div--button" key={5}>
          <SelectPositionWork
            handle={handle}
            name="millingMachineSmall"
            status={warehouseWork.millingMachineSmall}
          />
          <input
            className={`${
              nameClassShow === "millingMachineSmall"
                ? "show-time"
                : "none-time"
            }`}
            name="smallTime"
            placeholder="work time in minutes"
            type="number"
            pattern="[0-9]*"
            min="1"
            required
            onChange={handleOnChange}
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
