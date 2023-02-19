import React, { useState, useEffect, useRef, Fragment } from "react";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";

import { EditItemWarehouse } from "./EditItemGoodElement";
import ReadItemGoodElement from "./ReadItemGoodElement";
import {
  apiProject,
  apiElementPDF,
  apiElement,
  apiWarehouseWork,
} from "../../url/URL";

export default function GoodElements() {
  const [warehouseWork, setWarehouseWork] = useState([]);
  const [nameLabelFile, setNameLabelFile] = useState("");

  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [editValue, setEditValue] = useState({
    editId: "",
    number: "",
    dataStart: "",
    idProject: "",
    idElement: "",
    idUser: "",
    warehouseName: "",
  });

  const handleEditSelect = (name, value) => {
    // const newFormData = { ...editSelect };
    // newFormData[name] = value;
    // setEditSelect(newFormData);
  };

  const handleEditClick = (event, edit) => {
    event.preventDefault();
    let dateLocal = new Date();

    let date = edit.dataStart.split("-");
    dateLocal.setDate(date[2]);
    dateLocal.setMonth(date[1] - 1);
    dateLocal.setFullYear(date[0]);

    // const formValues = {
    //   id: edit.id,
    //   idProject: edit.idProject,
    //   idElement: edit.idElement,
    //   number: edit.number,
    //   dataStart: dateLocal,
    //   idUser: edit.idUser,
    //   warehouseName: warehouseName,
    // };

    // setEditValue(formValues);
    // changeIdByNameProject(edit.idProject);
    // changeIdByNameUser(edit.idUser);
    // changeIdByNameElement(edit.idElement);
  };

  const handleDeleteClick = (idProps) => {
    if (window.confirm("Do you really deleting?")) {
      window.open("exit.html", "I hope you know what you're doing!");
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

  useEffect(() => {
    fetchGetElement();
    fetchGETProject();
  }, []);

  useEffect(() => {
    fetchGetWarehouseWork();
  }, []);

  const handlGetElement = (data) => {
    return data.map((item, index) => {
      return (
        <Fragment key={item.id}>
          {editValue.id === item.id ? (
            <EditItemWarehouse
              editValue={editValue}
              //   handleCancelClick={handleCancelClick}
              //   handleEditFormChange={handleEditFormChange}
              //   handleEditFormSubmit={handleEditFormSubmit}
              //   handleDeleteClick={handleDeleteClick}
              //   handleAddSubmit={handleAddSubmit}
              //   project={project}
              //   element={element}
              //   user={user}
              //   handleEditSelect={handleEditSelect}
              //   editSelectProjectById={editSelect.project}
              //   editSelectElementById={editSelect.element}
              //   editSelectUserById={editSelect.user}
              //   editSelectDateById={editSelect.dataStart}
            />
          ) : (
            <ReadItemGoodElement
              item={item}
              index={index}
              project={project}
              // user={user}
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

  const fetchGetWarehouseWork = async () => {
    try {
      // setLoading(true);
      const res = await apiWarehouseWork.get("/all");
      setWarehouseWork(res.data);
      console.log("goodElements", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="div-getGoodElement">{handlGetElement(warehouseWork)}</div>{" "}
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
    </>
  );
}
