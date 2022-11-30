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
        <label htmlFor="position">imia</label>
        <input
          id="position"
          name="position"
          type="text"
          value="position"
          onChange={handleChange}
        />
        <label htmlFor="permissions">nazwisko</label>
        <input
          id="permissions"
          name="permissions"
          type="text"
          value="permission"
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
          type="password"
          value="password"
          onChange={handleChange}
        />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Elements;
