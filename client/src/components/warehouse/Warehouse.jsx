import React, { useState, useEffect, useRef, Fragment } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";

import { EditItemWarehouse } from "./EditItemWarehouse";
import ReadItemWarehouse from "./ReadItemWarehouse";
import "./styleWarehouse/warehouse.css";
import { apiProject, apiElement, apiUser, apiWarehouse } from "../../url/URL";

let wareName;

const Warehouse = () => {
  let editSelectPutProject = "";
  let editSelectPutUser = "";
  let editSelectPutElement = "";
  const location = useLocation();
  const [warehouseName, setWarehouseName] = useState("in");
  const numberRef = useRef(null);
  const [valueDate, OnChange] = useState(new Date());
  // const [valueDate, OnChange] = useState({
  //   value: new Date(),
  //   format: "MM-DD-YYYY",
  //   // onChange: (date) => console.log(date.format()),
  // });
  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [selectElement, setSelectElement] = useState("");

  const [selectProject, setSelectProject] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [editSelect, setEditSelect] = useState({
    project: "",
    element: "",
    user: "",
    dataStart: "",
  });
  const [addWarehouse, setAddWarehouse] = useState({
    number: "",
    dataStart: "",
    idProject: "",
    idElement: "",
    idUser: "",
    warehouseName: "",
  });

  const [editValue, setEditValue] = useState({
    editId: "",
    number: "",
    dataStart: "",
    idProject: "",
    idElement: "",
    idUser: "",
    warehouseName: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    changeNameProjectById(selectProject);
    changeNameElementById(selectElement);
    changeNameUserById(selectUser);
    let d =
      valueDate.getFullYear() +
      "-" +
      (valueDate.getMonth() + 1) +
      "-" +
      valueDate.getDate();
    console.log(d);
    const newWarehouse = {
      idProject: editSelectPutProject,
      idElement: editSelectPutElement,
      number: addWarehouse.number,
      dataStart: d,
      idUser: editSelectPutUser,
      warehouseName: warehouseName,
    };
    apiWarehouse
      .post("", newWarehouse)
      .then((response) => {
        fetchGetWarehouse();
      })
      .catch((error) => {
        console.log(error);
      });

    setAddWarehouse("");

    numberRef.current.value = "";
  };

  const changeNameProjectById = (data) => {
    editSelect.project = "";
    for (let index = 0; index < project.length; index++) {
      if (project[index].nameProject === data) {
        return (editSelectPutProject = project[index].id);
      } else {
        editSelectPutProject = project[0].id;
      }
    }
  };
  const changeNameUserById = (data) => {
    editSelect.user = "";
    for (let index = 0; index < user.length; index++) {
      if (user[index].nameUser === data) {
        return (editSelectPutUser = user[index].id);
      } else {
        editSelectPutUser = user[0].id;
      }
    }
  };
  const changeNameElementById = (data) => {
    editSelect.element = "";
    for (let index = 0; index < element.length; index++) {
      if (element[index].nameElement === data) {
        return (editSelectPutElement = element[index].id);
      } else {
        editSelectPutElement = element[0].id;
      }
    }
  };

  const changeIdByNameProject = (data) => {
    for (let index = 0; index < project.length; index++) {
      if (project[index].id === data) {
        return (editSelect.project = project[index].nameProject);
      } else {
        editSelect.project = project[0].nameProject;
      }
    }
  };
  const changeIdByNameUser = (data) => {
    for (let index = 0; index < project.length; index++) {
      if (project[index].id === data) {
        return (editSelect.user = user[index].nameUser);
      } else {
        editSelect.user = user[0].nameUser;
      }
    }
  };
  const changeIdByNameElement = (data) => {
    for (let index = 0; index < element.length; index++) {
      if (element[index].id === data) {
        return (editSelect.element = element[index].nameElement);
      } else {
        editSelect.element = element[0].nameelement;
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSelectUser(user[0].nameUser);
    setSelectProject(project[0].nameProject);
    setSelectElement(element[0].nameElement);

    const fieldName = e.target.name;

    const fieldValue = e.target.value;

    const newFormData = { ...addWarehouse };
    newFormData[fieldName] = fieldValue;

    setAddWarehouse(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    changeNameProjectById(editSelect.project);
    changeNameUserById(editSelect.user);
    changeNameElementById(editSelect.element);
    const editedContact = {
      id: editValue.id,
      idProject: editSelectPutProject,
      idElement: editSelectPutElement,
      number: editValue.number,
      dataStart: editSelect.dataStart,
      idUser: editSelectPutUser,
      warehouseName: editValue.warehouseName,
    };

    apiWarehouse
      .put("", editedContact)
      .then((response) => {
        fetchGetWarehouse();
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
    let dateLocal = new Date();

    let date = edit.dataStart.split("-");
    dateLocal.setDate(date[2]);
    // console.log(dateLocal.getDate());
    dateLocal.setMonth(date[1] - 1);
    // console.log(dateLocal.getMonth() + 1);
    dateLocal.setFullYear(date[0]);
    // console.log(dateLocal.getFullYear());
    const formValues = {
      id: edit.id,
      idProject: edit.idProject,
      idElement: edit.idElement,
      number: edit.number,
      dataStart: dateLocal,
      idUser: edit.idUser,
      warehouseName: warehouseName,
    };
    setEditValue(formValues);
    changeIdByNameProject(edit.idProject);
    changeIdByNameUser(edit.idUser);
    changeIdByNameElement(edit.idElement);
  };
  const handleCancelClick = () => {
    setEditValue("");
  };

  const handleDeleteClick = (idProps) => {
    const newContacts = [...warehouse];
    const index = warehouse.findIndex((contact) => contact.id === idProps);
    newContacts.splice(index, 1);
    setWarehouse(newContacts);
    apiWarehouse.delete(`/${idProps}`);
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

  const selectNameWarehouse = (wareName) => {
    let name;
    if (wareName === "") {
      name = "in";
    } else {
      name = "out";
    }
    setWarehouseName(name);
    return name;
  };

  const fetchGetWarehouse = async () => {
    wareName = location.pathname.split("/");

    wareName = wareName[1];
    let name = selectNameWarehouse(wareName);
    try {
      // setLoading(true);
      const res = await apiWarehouse.get(`/${name}`);
      setWarehouse(res.data);
      console.log("warehouse", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetElement();
    fetchGETProject();
    fetchGetUser();
  }, []);

  useEffect(() => {
    fetchGetWarehouse();
  }, [location]);

  const handleEditSelect = (name, value) => {
    const newFormData = { ...editSelect };
    newFormData[name] = value;

    setEditSelect(newFormData);
  };

  const handlGetElement = (data) => {
    return data.map((item, index) => {
      return (
        <Fragment key={item.id}>
          {editValue.id === item.id ? (
            <EditItemWarehouse
              editValue={editValue}
              handleCancelClick={handleCancelClick}
              handleEditFormChange={handleEditFormChange}
              handleEditFormSubmit={handleEditFormSubmit}
              handleDeleteClick={handleDeleteClick}
              handleAddSubmit={handleAddSubmit}
              project={project}
              element={element}
              user={user}
              handleEditSelect={handleEditSelect}
              editSelectProjectById={editSelect.project}
              editSelectElementById={editSelect.element}
              editSelectUserById={editSelect.user}
              editSelectDateById={editSelect.dataStart}
            />
          ) : (
            <ReadItemWarehouse
              item={item}
              index={index}
              project={project}
              user={user}
              element={element}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </Fragment>
      );
    });
  };

  return (
    <div className="warehous--body">
      <form className="form--wrapper" onSubmit={handleAddSubmit}>
        <section>
          <label htmlFor="project">project</label>
          <select
            value={selectProject}
            onChange={(e) => setSelectProject(e.target.value)}
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
            onChange={(e) => setSelectElement(e.target.value)}
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
            pattern="[0-9]*"
            required
            ref={numberRef}
            onChange={handleChange}
          />
        </section>
        <section>
          <label htmlFor="data">date</label>
          <DatePicker
            dateFormat="dd-MM-yyyy"
            id="data"
            onChange={OnChange}
            value={valueDate}
          />
        </section>
        <section>
          <label htmlFor="user">imia</label>
          <select
            value={selectUser}
            onChange={(e) => setSelectUser(e.target.value)}
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
      <div className="div-getWorhouse">{handlGetElement(warehouse)}</div>
    </div>
  );
};

export default Warehouse;
