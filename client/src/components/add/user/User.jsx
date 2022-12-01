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
        <label htmlFor="name">imia</label>
        <input
          id="name"
          name="name"
          type="text"
          value="name"
          onChange={handleChange}
        />
        <label htmlFor="last_name">nazwisko</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value="last_name"
          onChange={handleChange}
        />
        <label htmlFor="login">login</label>
        <input
          id="login"
          name="login"
          type="text"
          value="login"
          onChange={handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="text"
          value="password"
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
