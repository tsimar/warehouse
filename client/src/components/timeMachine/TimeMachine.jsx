import React, { useState, useEffect, Fragment } from "react";
import { apiWarehouseWork } from "../../url/URL";
import { NameOfIdProject } from "../nameOfId/NameOfIdProject";
import { NameOfIdModule } from "../nameOfId/NameOfIdModule";
import { NameOfIdElement } from "../nameOfId/NameOfIdElement";

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

  const getTime = (index, data, count) => {
    // getProjectModuleElement(data);
    return data[count[index]].map((item, countItems) => {
      return (
        <Fragment key={index}>
          <span>{item.dataFinish}</span>
          <span>
            <NameOfIdProject id={item.idProject} />
          </span>
          <span>
            <NameOfIdModule id={item.idModule} />
          </span>
          <span>
            <NameOfIdElement id={item.idElement} />
          </span>
          {item.heidenhain === "obróbka" ? (
            <>
              <span>{item.heidenhainTime} min</span>
            </>
          ) : (
            <span>0 min</span>
          )}
          {item.lathe === "obróbka" ? (
            <span> {item.latheTime} min</span>
          ) : (
            <span>0 min</span>
          )}
          {item.bacaFanuc === "obróbka" ? (
            <span> {item.fanucTime} min</span>
          ) : (
            <span>0 min</span>
          )}
          {item.millingMachineSmall === "obróbka" ? (
            <span> {item.smallTime} min</span>
          ) : (
            <span>0 min</span>
          )}
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

  return (
    <>
      <div>
        <span> date</span>
        <span> project</span>
        <span> module</span>
        <span> Frezarka 4m</span>
        <span> tokarka</span>
        <span> Baca</span>
        <span> mała frezarka</span>
      </div>
      <div key={1}>{handleShow(timeData)}</div>
    </>
  );
};
export default TimeMachine;
