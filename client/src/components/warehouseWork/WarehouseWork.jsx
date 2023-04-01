import React, { useState, useEffect, Fragment } from "react";
// import DatePicker from "react-date-picker";
import { EditItemWarehouseWork } from "./EditItemWarehouseWork";
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
  const [nameLabelFile, setNameLabelFile] = useState("");
  // const [valueDateFinish, OnChangeFinish] = useState(new Date());
  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [module, setModule] = useState([]);

  const [warehouseWork, setWarehouseWork] = useState([]);

  // const [addWarehouseWork, setAddWarehouseWork] = useReducer({
  //   idProject: "",
  //   idModule: "",
  //   idElement: "",
  //   number: "",
  //   dateStart: "",
  //   dateFinish: "",
  //   bacaFanuc: "",
  //   lathe: "",
  //   heidenhain: "",
  //   millingMachineSmall: "",
  // });

  const [editValue, setEditValue] = useState({
    editId: "",

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

  // const handleChange = (e) => {
  //   e.preventDefault();

  //   const fieldName = e.target.name;

  //   const fieldValue = e.target.value;

  //   const newFormData = { ...addWarehouseWork };
  //   newFormData[fieldName] = fieldValue;

  //   setAddWarehouseWork(newFormData);
  // };

  const handleCancelClick = () => {
    setEditValue("");
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

  const getProject = (index, data, count) => {
    return data[count[index]].map((item, countItems) => {
      return (
        <Fragment key={item.id}>
          {editValue.id === item.id ? (
            <EditItemWarehouseWork />
          ) : (
            <ReadItemProjectWarehouseWork
              boleanProject={countItems <= 0}
              item={item}
              allWarehouse={data[index + 1]}
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
