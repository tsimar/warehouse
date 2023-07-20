import React, { useState, useEffect, useRef, Fragment } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";



import { EditItemProjectWarehouse } from "./EditItemProjectWarehouse";
import ReadItemProjectWarehouse from "./ReadItemProjectWarehouse";
import "./styleWarehouse/warehouse.css";
import {
  apiProject,
  apiElementPDF,
  apiElement,
  apiUser,
  apiWarehouse,
  apiModuleOfProject,
} from "../../url/URL";

import { useSelector, useDispatch } from "react-redux";

import {
  addProject,
  getProjectList,
} from "../../redux/slice/connectAPI/projectAPI";
import {
  addWarehouse,
  getWarehouseList,
} from "../../redux/slice/connectAPI/warehouseAPI";

let wareName;

const Warehouse = () => {
  let editSelectPutProject = "";
  let editSelectPutUser = "";
  let editSelectPutElement = "";
  let editSelectPutModule = "";
  const location = useLocation();
  const stProject = useSelector((state) => state.storeProject);
  const stWarehouse = useSelector((state) => state.storeWarehouse);
  const dispatch = useDispatch();
  const [warehouseName, setWarehouseName] = useState("in");
  const numberRef = useRef(null);

  const [valueDate, OnChange] = useState(new Date());

  const [element, setElement] = useState([]);
  const [project, setProject] = useState(stProject.postProject);
  const [module, setModule] = useState([]);
  const [user, setUser] = useState([]);
  const [warehouse, setWarehouse] = useState(stWarehouse.postWarehouse);
  const [selectElement, setSelectElement] = useState("");
  const [nameLabelFile, setNameLabelFile] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [selectModule, setSelectModule] = useState("");

  const [editSelect, setEditSelect] = useState({
    project: "",
    module: "",
    element: "",
    user: "",
    dataStart: "",
  });
  const [changeWarehouse, setAddWarehouse] = useState({
    number: "",
    dataStart: "",
    idProject: "",
    idModule: "",
    idElement: "",
    idUser: "",
    warehouseName: "",
  });

  const [editValue, setEditValue] = useState({
    editId: "",
    number: "",
    dataStart: "",
    idProject: "",
    idModule: "",
    idElement: "",
    idUser: "",
    warehouseName: "",
  });

  useEffect(() => {
    dispatch(getProjectList());
    dispatch(getWarehouseList("in"));
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    changeNameProjectById(selectProject);
    changeNameModuleById(selectModule);
    changeNameElementById(selectElement);
    changeNameUserById(selectUser);
    wareName = location.pathname.split("/");

    wareName = wareName[1];
    let name = "in";
    const newValues = {
      number: changeWarehouse.number,
      dataStart: valueDate,
      idProject: editSelectPutProject,
      idModule: editSelectPutModule,
      idElement: editSelectPutElement,
      idUser: editSelectPutUser,
      warehouseName: name,
    };

    console.log(warehouse);
    dispatch(addWarehouse(newValues));
    // // const { name1, value } = newValues;
    // // setWarehouse((prev) => ({ ...prev, [name1]: value }));
    dispatch(getWarehouseList("in"));
    setAddWarehouse("");

    numberRef.current.value = "";
  };

  const changeNameProjectById = (data) => {
    editSelect.project = "";
    for (let index = 0; index < stProject.postProject.length; index++) {
      if (stProject.postProject[index].nameProject === data) {
        return (editSelectPutProject = stProject.postProject[index].id);
      } else {
        editSelectPutProject = stProject.postProject[0].id;
      }
    }
  };
  const changeNameModuleById = (data) => {
    editSelect.module = "";
    for (let index = 0; index < module.length; index++) {
      if (module[index].nameModule === data) {
        return (editSelectPutModule = module[index].id);
      } else {
        editSelectPutModule = module[0].id;
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
    for (let index = 0; index < stProject.postProject.length; index++) {
      if (stProject.postProject[index].id === data) {
        return (editSelect.project = stProject.postProject[index].nameProject);
      } else {
        editSelect.project = stProject.postProject[0].nameProject;
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
    setSelectProject(stProject.postProject[0].nameProject);
    setSelectProject(module[0].nameModule);
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

    const editedContact = {
      id: editValue.editId,
      idProject: editSelectPutProject,
      idElement: editSelectPutElement,
      warehouseName: editValue.warehouseName,
    };

    apiWarehouse
      .put("/editProject", editedContact)
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
    dateLocal.setMonth(date[1] - 1);
    dateLocal.setFullYear(date[0]);

    const formValues = {
      id: edit.id,
      idProject: edit.idProject,
      idModule: edit.idModule,
      idElement: edit.idElement,
      number: edit.number,
      dataStart: dateLocal,
      idUser: edit.idUser,
      warehouseName: warehouseName,
    };

    setEditValue(formValues);
    changeIdByNameProject(edit.idProject);
    // changeIdByNameModule(edit.idModule);
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
  const fetchGETModule = async () => {
    try {
      // setLoading(true);
      const res = await apiModuleOfProject.get();
      setModule(res.data);
      console.log("module", res.data);
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

  const fetchGetWarehouse = async () => {
    let name = "in";
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
    // fetchGETProject();
    fetchGetUser();
    fetchGETModule();
  }, []);

  useEffect(() => {
    fetchGetWarehouse();
  }, [location]);

  const handleEditSelect = (name, value) => {
    const newFormData = { ...editSelect };
    newFormData[name] = value;

    setEditSelect(newFormData);
  };

  const getProject = (index, data, count) => {
    return data[count[index]].map((item, countItems) => {
      return (
        <Fragment key={item.id}>
          {editValue.id === item.id ? (
            <EditItemProjectWarehouse
              project={stProject.postProject}
              editValue={editValue}
              handleAddSubmit={handleAddSubmit}
              handleEditFormSubmit={handleEditFormSubmit}
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              handleDeleteClick={handleDeleteClick}
              editSelectProjectById={editSelect.project}
              handleEditSelect={handleEditSelect}
            />
          ) : (
            <ReadItemProjectWarehouse
              boleanProject={countItems <= 0}
              warehouse={item}
              allWarehouse={data[count[index]]}
              count={index}
              project={stProject.postProject}
              module={module}
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
  const handlGetProject = (data) => {
    console.log("data-425", data);
    let count = Object.keys(data);
    return Object.keys(data).map((_, index) => {
      return getProject(index, data, count);
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
            {stProject.postProject.map((item, index) => (
              <option key={index} value={item.nameProject}>
                {item.nameProject}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="module">module</label>
          <select
            value={selectModule}
            onChange={(e) => setSelectModule(e.target.value)}
          >
            {module.map((item, index) => (
              <option key={index} value={item.nameModule}>
                {item.nameModule}
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
        <div className="div-getWorhouse">{handlGetProject(warehouse)}</div>
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
      <div>
        {stWarehouse.isSuccess.length > 0 && (
          <p>{stWarehouse.isSuccess.success}</p>
        )}
        {project.map((item, number) => (
          <h2 key={number}>{item.nameProject}hello</h2>
        ))}
      </div>
    </div>
  );
};

export default Warehouse;

// const handlGetProject = (data) => {
//   var count = Object.keys(data);
//   for (let index = 0; index < count.length; index++) {
//     console.log(data[count[index]]);
//     return data[count[index]].map((item, index) => {
//       return (
//         <Fragment key={index}>
//           {editValue.id === item.id ? (
//             <EditItemWarehouse
//               editValue={editValue}
//               handleCancelClick={handleCancelClick}
//               handleEditFormChange={handleEditFormChange}
//               handleEditFormSubmit={handleEditFormSubmit}
//               handleDeleteClick={handleDeleteClick}
//               handleAddSubmit={handleAddSubmit}
//               project={project}
//               module={module}
//               element={element}
//               user={user}
//               handleEditSelect={handleEditSelect}
//               editSelectProjectById={editSelect.project}
//               editSelectModuleById={editSelect.module}
//               editSelectElementById={editSelect.element}
//               editSelectUserById={editSelect.user}
//               editSelectDateById={editSelect.dataStart}
//             />
//           ) : (
//             <ReadItemWarehouse
//               idProject={item.idProject}
//               warehouse={item}
//               count={index}
//               project={project}
//               module={module}
//               user={user}
//               element={element}
//               handleEditClick={handleEditClick}
//               handleDeleteClick={handleDeleteClick}
//               showPdfFile={showPdfFile}
//             />
//           )}
//         </Fragment>
//       );
//     });
//   }
// };
