import React from "react";
import "./styleElements/elements.css";

const Elements = () => {
  const handleAddSubmit = async (e) => {};
  const handleChange = (e) => {};
  // const handleChangeSelect = (e) => {
  //   console.log("Fruit Selected!!");

  //   // setNameProdukt(e.target.value);
  // };
  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="element">element</label>
        <input
          id="element"
          name="element"
          type="text"
          value="element"
          onChange={handleChange}
        />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Elements;
