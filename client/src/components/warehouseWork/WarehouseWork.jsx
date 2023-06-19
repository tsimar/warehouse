import React, { useState, useEffect, Fragment, useRef } from "react";
// import DatePicker from "react-date-picker";
import { EditItemProjectWarehouseWork } from "./EditItemProjectWarehouseWork";
import ReadItemProjectWarehouseWork from "./ReadItemProjectWarehouseWork";

import {
  apiProject,
  apiElement,
  apiElementPDF,
  apiWarehouseWork,
  apiModuleOfProject,
} from "../../url/URL";
import "./styleWarehouseWork/warehouseWork.css";
import { motion } from "framer-motion";

const WarehouseWork = () => {
  let editSelectPutProject = "";
  let editSelectPutUser = "";
  let editSelectPutElement = "";
  let editSelectPutModule = "";
  const [nameLabelFile, setNameLabelFile] = useState("");
  // const [valueDateFinish, OnChangeFinish] = useState(new Date());
  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [module, setModule] = useState([]);
  const numberRef = useRef(null);

  // const [valueDate, OnChange] = useState(new Date());
  const [warehouseWork, setWarehouseWork] = useState([]);
  const [selectElement, setSelectElement] = useState("");

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
  const [addWarehouseWork, setAddWarehouseWork] = useState({
    number: "",
    dataStart: "",
    idProject: "",
    idModule: "",
    idElement: "",

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

    dateFinish: "",
  });

  const editEditFinishDateDB = (e, date) => {
    e.preventDefault();
    const editedContact = {
      id: editValue.id,

      dataFinish: date,
    };

    apiWarehouseWork
      .put("", editedContact)
      .then((response) => {
        fetchGetWarehouseWork();
        handleCancelClick();
      })
      .catch((error) => {
        console.log(error);
      });
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
  const handleCancelClick = () => {
    setEditValue("");
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    changeNameProjectById(selectProject);
    changeNameModuleById(selectModule);
    changeNameElementById(selectElement);
    // changeNameUserById(selectUser);
    // wareName = location.pathname.split("/");

    // wareName = wareName[1];
    let name = "in";
    const newWarehouse = {
      number: addWarehouseWork.number,
      // dataStart: valueDate,
      idProject: editSelectPutProject,
      idModule: editSelectPutModule,
      idElement: editSelectPutElement,
      idUser: editSelectPutUser,
      warehouseName: name,
    };

    await apiWarehouseWork
      .post("", newWarehouse)
      .then((response) => {
        fetchGetWarehouseWork();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddWarehouseWork("");

    numberRef.current.value = "";
  };
  const handleDeleteClick = (idProps) => {
    if (window.confirm("Do you really deleting?")) {
      const newContacts = [...warehouseWork];
      const index = warehouseWork.findIndex(
        (contact) => contact.id === idProps
      );
      newContacts.splice(index, 1);
      setWarehouseWork(newContacts);
      apiWarehouseWork.delete(`/${idProps}`);
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

  const fetchGetWarehouseWork = async () => {
    try {
      // setLoading(true);
      const res = await apiWarehouseWork.get();
      setWarehouseWork(res.data);
      console.log("wareOut", res.data);

      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
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

    apiWarehouseWork
      .put("/editProject", editedContact)
      .then((response) => {
        fetchGetWarehouseWork();
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetElement();
    fetchGETProject();
    fetchGETModule();
    fetchGetWarehouseWork();
  }, []);

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

      dateFinish: dateLocal,
    };

    setEditValue(formValues);
  };
  const handleEditSelect = (name, value) => {
    const newFormData = { ...editSelect };
    newFormData[name] = value;

    setEditSelect(newFormData);
  };
  const getProject = (index, data, count) => {
    return data[count[index]].map((item, countItems) => {
      return (
        <Fragment key={countItems}>
          {editValue.id === item.id ? (
            <EditItemProjectWarehouseWork
              project={project}
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
            <ReadItemProjectWarehouseWork
              boleanProject={countItems <= 0}
              item={item}
              allWarehouse={data[count[index]]}
              index={index}
              project={project}
              module={module}
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
    console.log("data work module", data);
    let count = Object.keys(data);
    return Object.keys(data).map((_, index) => {
      return getProject(index, data, count);
    });

    // return data.map((item, index) => {
    //   return (
    //     <Fragment key={item.id}>
    //       {editValue.id === item.id ? (
    //         <EditItemWarehouseWork
    //           editValue={editValue}
    //           handleCancelClick={handleCancelClick}
    //           handleDeleteClick={handleDeleteClick}
    //           editEditFinishDateDB={editEditFinishDateDB}
    //         />
    //       ) : (
    //         <ReadItemProjectWarehouseWork
    //           item={item}
    //           index={index}
    //           project={project}
    //           module={module}
    //           element={element}
    //           handleEditClick={handleEditClick}
    //           showPdfFile={showPdfFile}
    //         />
    //       )}
    //     </Fragment>
    //   );
    // });
  };

  return (
    <div className="body--warehouseWork">
      <div className="label_name">
        <label className="span--id">Nr</label>
        <label className="span--project">projekt</label>
        <label className="span--project">module</label>
        <label className="span--element">detal</label>
        <label className="span--number">ilość</label>
        <label className="span--date">początku</label>
        <label className="span--date">zakączenia</label>
        <label className="div--button">tokarka</label>
        <label className="div--button">fanuc frezarka</label>
        <label className="div--button">headehaine</label>
        <label className="div--button">baca frezarka</label>
      </div>

      <div className="div-getWarehouseWork">
        {handlGetProject(warehouseWork)}
      </div>

      <section className="conteiner--warehouse">
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

export default WarehouseWork;
