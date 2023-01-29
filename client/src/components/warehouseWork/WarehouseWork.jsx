import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  Fragment,
} from "react";
import DatePicker from "react-date-picker";
import { EditItemWarehouseWork } from "./EditItemWarehouseWork";
import ReadItemWarehouseWork from "./ReadItemWarehouseWork";
import {
  apiProject,
  apiElement,
  apiElementPDF,
  apiWarehouseWork,
} from "../../url/URL";
import "./styleWarehouseWork/warehouseWork.css";
import { motion } from "framer-motion";

const WarehouseWork = () => {
  const numberRef = useRef(null);

  const [nameLabelFile, setNameLabelFile] = useState("");
  const [valueDateStart, OnChangeStart] = useState(new Date());
  const [valueDateFinish, OnChangeFinish] = useState(new Date());
  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [warehouseWork, setWarehouseWork] = useState([]);
  const [selectElement, setSelectElement] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [checkedFanucBaca, setCheckedFanucBaca] = useState([]);
  const [checkedLathe, setCheckedLathe] = useState([]);
  const [checkedHeidenhain, setCheckedHeidenhain] = useState([]);
  const [checkedMillingMachineSmall, setCheckedMillingMachineSmall] = useState(
    []
  );
  const [addWarehouseWork, setAddWarehouseWork] = useReducer({
    idProject: "",
    idElement: "",
    number: "",
    dateStart: "",
    dateFinish: "",
    bacaFanuc: "",
    lathe: "",
    heidenhain: "",
    millingMachineSmall: "",
  });

  const [editValue, setEditValue] = useState({
    editId: "",
    idProject: "",
    idElement: "",
    number: "",
    dateStart: "",
    dateFinish: "",
    bacaFanuc: "",
    lathe: "",
    heidenhain: "",
    millingMachineSmall: "",
  });
  const handleButton = (e, index) => {
    const fieldName = e.target.name;
    let fieldValue = e.target.innerText;

    if (fieldValue === "false") {
      fieldValue = "true";
    } else {
      fieldValue = "false";
    }
    let newValue;

    switch (fieldName) {
      case "bacaFanuc":
        newValue = { ...checkedFanucBaca };
        newValue[index] = fieldValue;
        setCheckedFanucBaca(newValue);
        break;
      case "lathe":
        newValue = { ...checkedLathe };
        newValue[index] = fieldValue;
        setCheckedLathe(newValue);
        break;
      case "heidenhain":
        newValue = { ...checkedHeidenhain };
        newValue[index] = fieldValue;
        setCheckedHeidenhain(newValue);
        break;
      case "millingMachineSmall":
        newValue = { ...checkedMillingMachineSmall };
        newValue[index] = fieldValue;
        setCheckedMillingMachineSmall(newValue);
        break;

      default:
        break;
    }
  };
  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;

    const fieldValue = e.target.value;

    const newFormData = { ...addWarehouseWork };
    newFormData[fieldName] = fieldValue;

    setAddWarehouseWork(newFormData);
  };

  const handleCancelClick = () => {
    setEditValue("");
  };
  const handleDeleteClick = (idProps) => {
    const newContacts = [...user];
    const index = warehouseWork.findIndex((contact) => contact.id === idProps);
    newContacts.splice(index, 1);
    setAddWarehouseWork(newContacts);
    apiWarehouseWork.delete(`/${idProps}`);
  };
  const handleChangeSelectProject = (e, name) => {
    if (name === "project") {
      setSelectProject(e.target.value);
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
    fetchGetWarehouseWork();
  }, []);

  useEffect(() => {
    // const value = { ...warehouseWork };
    let bacaFanuc = { ...warehouseWork };
    let lathe = { ...warehouseWork };
    let heidenhain = { ...warehouseWork };
    let millingMachineSmall = { ...warehouseWork };
    warehouseWork.map((item, index) => {
      bacaFanuc[index] = item.bacaFanuc;
      setCheckedFanucBaca(bacaFanuc);
      lathe[index] = item.lathe;
      setCheckedLathe(lathe);
      heidenhain[index] = item.heidenhain;
      setCheckedHeidenhain(heidenhain);
      millingMachineSmall[index] = item.millingMachineSmall;
      setCheckedMillingMachineSmall(millingMachineSmall);
    });
  }, [warehouseWork]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newWarehouseWork = {
      nameUser: addWarehouseWork.nameUser,
      lastName: addWarehouseWork.lastName,
      login: addWarehouseWork.login,
      password: addWarehouseWork.password,
      idPosition: addWarehouseWork.password,
    };
    apiWarehouseWork
      .post("", newWarehouseWork)
      .then((response) => {
        fetchGetWarehouseWork();
      })
      .catch((error) => {
        console.log(error);
      });

    addWarehouseWork("");

    // numberRef.current.value = "";
    // lastNameRef.current.value = "";
    // loginRef.current.value = "";
    // passwordRef.current.value = "";
  };
  const handleEditClick = (event, edit) => {
    event.preventDefault();
    let dateLocal = new Date();

    const formValues = {
      id: edit.id,
      idProject: edit.idProject,
      idElement: edit.idElement,
      number: edit.number,
      dataStart: dateLocal,
      idUser: edit.idUser,
    };
    setEditValue(formValues);
    // changeIdByNameProject(edit.idProject);
    // changeIdByNameUser(edit.idUser);
    // changeIdByNameElement(edit.idElement);
  };

  const handlGetWarehouseWork = (data) => {
    return data.map((item, index) => {
      return (
        <Fragment key={item.id}>
          <ReadItemWarehouseWork
            item={item}
            index={index}
            project={project}
            element={element}
            handleEditClick={handleEditClick}
            handleButton={handleButton}
            checkedFanucBaca={checkedFanucBaca[index]}
            checkedLathe={checkedLathe[index]}
            checkedHeidenhain={checkedHeidenhain[index]}
            checkedMillingMachineSmall={checkedMillingMachineSmall[index]}
            handleDeleteClick={handleDeleteClick}
            showPdfFile={showPdfFile}
          />
        </Fragment>
      );
    });
  };

  return (
    <div>
      <div className="label_name">
        <label htmlFor="">Nr</label>
        <label htmlFor="">projekt</label>
        <label htmlFor="">detal</label>
        <label htmlFor="">ilość</label>
        <label htmlFor="">data początku</label>
        <label htmlFor="">data zakączenia</label>
        <label htmlFor="">tokarka</label>
        <label htmlFor="">fanuc frezarka</label>
        <label htmlFor="">headehaine</label>
        <label htmlFor="">baca frezarka</label>
      </div>
      <div className="div-getWarehouseWork">
        {handlGetWarehouseWork(warehouseWork)}
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
