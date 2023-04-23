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

  const getProjectModuleElement = (item) => {
    try {
      NameOfIdProject(item.idProject);
    } catch (error) {
      console.error(error);
    }
  };
  const getTime = (index, data, count) => {
    // getProjectModuleElement(data);
    return data[count[index]].map((item, countItems) => {
      return (
        <Fragment key={index}>
          <span>{item.dataFinish}</span>
          {/* <span>{getProjectModuleElement(item)}</span> */}
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
    let count = Object.keys(data);

    return Object.keys(data).map((_, index) => {
      return <div key={index}>{getTime(index, data, count)}</div>;
    });
  };

  return <div key={1}>{handleShow(timeData)}</div>;
};
export default TimeMachine;
