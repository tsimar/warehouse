import React, { useState } from "react";
import "./styleUser/user.css";

const instrument = ["koło zębate", "mufta"];

const User = () => {
  const [nameProdukt, setNameProdukt] = useState("koło zębate");

  const handleAddSubmit = async (e) => {};
  const handleChange = (e) => {};
  const handleChangeSelect = (e) => {
    console.log("Fruit Selected!!");

    setNameProdukt(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="name_element">name</label>
        <input
          id="name_element"
          name="name_element"
          type="text"
          value="hjtg"
          onChange={handleChange}
        />
        <label htmlFor="name_element">ilość</label>
        <input
          id="number"
          name="number"
          type="number"
          value="1"
          onChange={handleChange}
        />
        <label htmlFor="data">data</label>
        <input
          id="data"
          name="data"
          type="data"
          value="20/11/22"
          onChange={handleChange}
        />
        <label htmlFor="position">stanowisko</label>
        <select value={nameProdukt} onChange={handleChangeSelect}>
          {instrument.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default User;
