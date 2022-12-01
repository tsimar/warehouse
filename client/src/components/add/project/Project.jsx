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
          value="project"
          onChange={handleChange}
        />
        <label htmlFor="code">code 112</label>
        <input
          id="code"
          name="code"
          type="text"
          value="code 112"
          onChange={handleChange}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Project;
