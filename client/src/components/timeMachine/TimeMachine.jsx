import React, { useState, useEffect } from "react";
import { apiWarehouseWork } from "../../url/URL";

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

  const handleShow = (data) => {
    // e.preventDefault();
    let count = Object.keys(data);
    console.log(data);
    console.log(data[count[0]]);
    return data[count[0]].map((item, index) => {
      return (
        <>
          <span key={index}>{item.dataFinish}</span>
        </>
      );
    });
  };
  return <div>{handleShow(timeData)}</div>;
};
export default TimeMachine;
