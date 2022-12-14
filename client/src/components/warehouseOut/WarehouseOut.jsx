// import axios from "axios";
import React, { useState } from "react";
// import { FilePicker } from "react-file-picker";

import "./styleWareHouseOut/warehouse.css";

const instrument = ["koło zębate", "mufta"];

const WarehouseOut = () => {
  const [nameProdukt, setNameProdukt] = useState("koło zębate");

  const handleAddSubmit = async (e) => {};
  const handleChange = (e) => {};
  const handleChangeSelect = (e) => {
    console.log("Fruit Selected!!");

    setNameProdukt(e.target.value);
  };

  // const onClikHadle = () => {
  //   <FilePicker
  //     extensions={["md"]}
  //     // onChange={FileObject => (/* do something with File object */)}
  //     // onError={errMsg => (/* do something with err msg string */)}
  //   >
  //     <button> Click to upload markdown</button>
  //   </FilePicker>;
  // };

  return (
    <div className="wropper--div">
      <form className="form--add" onSubmit={handleAddSubmit}>
        <section>
          <label htmlFor="project">project</label>
          <select value={nameProdukt} onChange={handleChangeSelect}>
            {instrument.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="element">element</label>
          <select value={nameProdukt} onChange={handleChangeSelect}>
            {instrument.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="number">ilość</label>
          <input
            id="number"
            name="number"
            type="number"
            value="1"
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="data">data</label>
          <input
            id="data"
            name="data"
            type="data"
            value="12/01/2022"
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="nameUser">imia</label>
          <select value={nameProdukt} onChange={handleChangeSelect}>
            {instrument.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>
        <button type="submit">add</button>
        <input type="file" />
      </form>
    </div>
  );
};

export default WarehouseOut;
