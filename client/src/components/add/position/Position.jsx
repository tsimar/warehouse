import React, { useState } from "react";
// import "./stylePosition/position.css";

const instrument = [
  { id: 1, position: " koło zębate", permission: " mufta" },
  { id: 2, position: " koło ", permission: " mufta" },
  { id: 2, position: " zębate", permission: " mufta" },
];
const Position = () => {
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
        <label htmlFor="position">position</label>
        <input
          id="position"
          name="position"
          type="text"
          value="position"
          onChange={handleChange}
        />
        <label htmlFor="permission">permission</label>
        <input
          id="permission"
          name="permission"
          type="text"
          value="permission"
          onChange={handleChange}
        />
        <button type="submit">add</button>
      </form>
      <div>
        {instrument.map((item, index) => (
          <div key={index}>
            <label>{item.id}</label>
            <label>{item.position}</label>
            <label>{item.permission}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Position;
