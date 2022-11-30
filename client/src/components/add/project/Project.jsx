import React from "react";
import "./styleProject/project.css";
const Project = () => {
  const handleAddSubmit = async (e) => {};
  const handleChange = (e) => {};
  // const handleChangeSelect = (e) => {
  //   console.log("Fruit Selected!!");

  //   // setNameProdukt(e.target.value);
  // };
  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="name">project</label>
        <input
          id="name"
          name="projectName"
          type="text"
          value="name"
          onChange={handleChange}
        />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Project;
