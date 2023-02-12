import React, { useState, useEffect, useRef, Fragment } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";

import { EditItemWarehouse } from "./EditItemWarehouse";
import ReadItemWarehouse from "./ReadItemWarehouse";
import "./styleWarehouse/warehouse.css";
import {
  apiProject,
  apiElementPDF,
  apiElement,
  apiUser,
  apiWarehouse,
} from "../../url/URL";
import { GetUseFetch } from "../../url/GetUseFetch";

let wareName;

const Warehouse = () => {
  let editSelectPutProject = "";
  let editSelectPutUser = "";
  let editSelectPutElement = "";
  const location = useLocation();
  const [warehouseName, setWarehouseName] = useState("in");
  const numberRef = useRef(null);

  const [valueDate, OnChange] = useState(new Date());

  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [selectElement, setSelectElement] = useState("");
  const [nameLabelFile, setNameLabelFile] = useState("");
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

    const newWarehouse = {
      number: addWarehouse.number,
      dataStart: valueDate,
      idProject: editSelectPutProject,
      idElement: editSelectPutElement,
      idUser: editSelectPutUser,
      warehouseName: warehouseName,
    };
    console.log(newWarehouse);
    await apiWarehouse
      .post("", newWarehouse)
      .then((response) => {
        fetchGetWarehouse();
        console.log(response);
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
    let data;
    changeNameProjectById(editSelect.project);
    changeNameUserById(editSelect.user);
    changeNameElementById(editSelect.element);
    if (editSelect.dataStart === "") {
      data = editValue.dataStart;
    } else {
      data = editSelect.dataStart;
    }
    const editedContact = {
      id: editValue.id,
      idProject: editSelectPutProject,
      idElement: editSelectPutElement,
      number: editValue.number,
      dataStart: data,
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
    if (window.confirm("Do you really deleting?")) {
      window.open("exit.html", "I hope you know what you're doing!");
      const newContacts = [...warehouse];
      const index = warehouse.findIndex((contact) => contact.id === idProps);
      newContacts.splice(index, 1);
      setWarehouse(newContacts);
      apiWarehouse.delete(`/${idProps}`);
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

  const showPdfFile = async (nameFile) => {
    try {
      let url = "";
      if (nameFile.urlPicture.length > 0) {
        const res = await apiElementPDF.get(`/${nameFile.urlPicture}`);

        setNameLabelFile(nameFile.nameElement);
        url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );
      }
      const iframe = document.querySelector("iframe");
      if (iframe?.src) {
        iframe.src = url;
      } else {
        iframe.src = null;
        setNameLabelFile("");
      }
    } catch (error) {
      console.error(error);
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
    // forech(item i arr)
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
              showPdfFile={showPdfFile}
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
            min="1"
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
      <section className="conteiner--warehouse">
        <div className="div-getWorhouse">{handlGetElement(warehouse)}</div>
        <motion.div drag className="conteiner-showPdfFile-warehouse">
          <label htmlFor="iframe">część: {nameLabelFile}</label>
          <iframe
            id="iframe"
            title="myFrame"
            className="iframeWorehouse"
            src=""
            width="100%"
            height="90%"
          ></iframe>
        </motion.div>
      </section>
    </div>
  );
};

export default Warehouse;
