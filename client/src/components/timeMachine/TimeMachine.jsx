import React, { useState, useEffect, Fragment } from "react";
import { apiWarehouseWork } from "../../url/URL";
import { NameOfIdProject } from "../nameOfId/NameOfIdProject";

const TimeMachine = () => {
  const [timeData, setTimeData] = useState([]);

  const fetchGetTimeMachine = async () => {
    try {
      // setLoading(true);
      const res = await apiWarehouseWork.get("/timeMachine");
      setTimeData(res.data);
      console.log("setTimeData", res.data);

      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetTimeMachine();
  }, []);

  const LLL = (id) => {
    return "sss";
  };

  const getProjectModuleElement = (item) => {
    console.log(item);
    // return <span>{NameOfIdProject(item.idProject)} </span>;
    try {
      NameOfIdProject(item.idProject);
    } catch (error) {
      console.error(error);
    }
  };
  const getTime = (index, data, count) => {
    return data[count[index]].map((item, countItems) => {
      return (
        <Fragment key={index}>
          <span>{item.dataFinish}</span>
          {getProjectModuleElement(item)}
          {item.heidenhain === "obróbka" ? (
            <span>{item.heidenhainTime}</span>
          ) : null}
          {item.lathe === "obróbka" ? <span>{item.latheTime}</span> : null}
          {item.bacaFanuc === "obróbka" ? <span>{item.fanucTime}</span> : null}
          {item.millingMachineSmall === "obróbka" ? (
            <span>{item.smallTime}</span>
          ) : null}
        </Fragment>
      );
    });
  };

  const handleShow = (data) => {
    // e.preventDefault();
    let count = Object.keys(data);

    return Object.keys(data).map((_, index) => {
      return getTime(index, data, count);
    });
  };

  return <div key={1}>{handleShow(timeData)}</div>;
};
export default TimeMachine;
