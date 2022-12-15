import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  Fragment,
} from "react";
import ReadItemWarehouseOut from "./ReadItemWareHouseOut";
import { EditItemWarehouseOut } from "./EditItemWareHouseOut";
import DatePicker from "react-date-picker";
import {
  apiProject,
  apiElement,
  apiUser,
  apiWarehouseOut,
} from "../../url/URL";

import "./styleWareHouseOut/warehouse.css";

const WarehouseOut = () => {
  const numberRef = useRef(null);
  const [valueDate, OnChange] = useState(new Date());
  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [warehouseOut, setWarehouseOut] = useState([]);
  const [selectElement, setSelectElement] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [addWarehouseOut, setAddWarehouseOut] = useReducer({
    nameUser: "",
    lastName: "",
    login: "",
    password: "",
    idPosition: "",
  });

  const [editValue, setEditValue] = useState({
    editId: "",
    nameUser: "",
    lastName: "",
    login: "",
    password: "",
    idPosition: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newWarehouseOut = {
      nameUser: addWarehouseOut.nameUser,
      lastName: addWarehouseOut.lastName,
      login: addWarehouseOut.login,
      password: addWarehouseOut.password,
      idPosition: addWarehouseOut.password,
    };
    apiWarehouseOut
      .post("", newWarehouseOut)
      .then((response) => {
        fetchGetWarehouseOut();
      })
      .catch((error) => {
        console.log(error);
      });

    setAddWarehouseOut("");

    numberRef.current.value = "";
    // lastNameRef.current.value = "";
    // loginRef.current.value = "";
    // passwordRef.current.value = "";
  };

  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;

    const fieldValue = e.target.value;

    const newFormData = { ...addWarehouseOut };
    newFormData[fieldName] = fieldValue;

    setAddWarehouseOut(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    // changeNamePositionById(editSelectPosition);
    const editedContact = {
      id: editValue.id,
      nameUser: editValue.nameUser,
      lastName: editValue.lastName,
      login: editValue.login,
      password: editValue.password,
      idPosition: editValue.password,
    };

    apiWarehouseOut
      .put("", editedContact)
      .then((response) => {
        fetchGetWarehouseOut();
        handleCancelClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.name;

    const fieldValue = event.target.value;

    const newFormData = { ...editValue };
    newFormData[fieldName] = fieldValue;

    setEditValue(newFormData);
  };

  const handleEditClick = (event, edit) => {
    event.preventDefault();

    const formValues = {
      id: edit.id,
      nameUser: edit.nameUser,
      lastName: edit.lastName,
      login: edit.login,
      password: edit.password,
      idPosition: edit.idPosition,
    };
    setEditValue(formValues);
    // changeIdByNamePosition(edit.idPosition);
  };

  const handleCancelClick = () => {
    setEditValue("");
  };

  const handleDeleteClick = (idUser) => {
    const newContacts = [...user];
    const index = user.findIndex((contact) => contact.id === idUser);
    newContacts.splice(index, 1);
    setUser(newContacts);
    apiUser.delete(`/${idUser}`);
  };

  const handleChangeSelectProject = (e, name) => {
    if (name === "project") {
      setSelectProject(e.target.value);
    } else if (name === "user") {
      setSelectUser(e.target.value);
    } else if (name === "element") {
      setSelectElement(e.target.value);
    }
  };
  const fetchGETProject = async () => {
    try {
      // setLoading(true);
      const res = await apiProject.get();
      setProject(res.data);
      console.log("project", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGetElement = async () => {
    try {
      // setLoading(true);
      const res = await apiElement.get();
      setElement(res.data);
      console.log("element", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGetUser = async () => {
    try {
      // setLoading(true);
      const res = await apiUser.get();
      setUser(res.data);
      console.log("user", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchGetWarehouseOut = async () => {
    try {
      // setLoading(true);
      const res = await apiWarehouseOut.get();
      setWarehouseOut(res.data);
      console.log("wareOut", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetElement();
    fetchGETProject();
    fetchGetUser();
    fetchGetWarehouseOut();
  }, []);

  const handlGetWarehouseOut = (data) => {
    // e.preventDefault();
    return data.map((item, index) => {
      return (
        <Fragment key={item.id}>
          {editValue.id === item.id ? (
            <EditItemWarehouseOut
              editValue={editValue}
              handleCancelClick={handleCancelClick}
              handleEditFormChange={handleEditFormChange}
              handleEditFormSubmit={handleEditFormSubmit}
              handleDeleteClick={handleDeleteClick}
              handleAddSubmit={handleAddSubmit}
            />
          ) : (
            <ReadItemWarehouseOut
              item={item}
              index={index}
              handleEditClick={handleEditClick}
            />
          )}
        </Fragment>
      );
    });
  };

  return (
    <div className="wropper--div">
      <form className="form--add" onSubmit={handleAddSubmit}>
        <section>
          <label htmlFor="project">project</label>
          <select
            value={selectProject}
            onChange={(e) => handleChangeSelectProject(e, "project")}
          >
            {project.map((item, index) => (
              <option key={index} value={item.nameProject}>
                {item.nameProject}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="element">element</label>
          <select
            value={selectElement}
            onChange={(e) => handleChangeSelectProject(e, "element")}
          >
            {element.map((item, index) => (
              <option key={index} value={item.nameElement}>
                {item.nameElement}
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
            placeholder="ilość"
            ref={numberRef}
            onChange={handleChange}
          />
        </section>
        <DatePicker onChange={OnChange} value={valueDate} />
        <section>
          <label htmlFor="user">imia</label>
          <select
            value={selectUser}
            onChange={(e) => handleChangeSelectProject(e, "user")}
          >
            {user.map((item, index) => (
              <option key={index} value={item.nameUser}>
                {item.nameUser} {item.lastName}
              </option>
            ))}
          </select>
        </section>
        <button type="submit">add</button>
      </form>
      <div className="div-get">{handlGetWarehouseOut(warehouseOut)}</div>
    </div>
  );
};

export default WarehouseOut;
