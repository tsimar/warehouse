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
import { apiProject, apiElement, apiWarehouseWork } from "../../url/URL";

const WarehouseWork = () => {
  const numberRef = useRef(null);
  const [valueDateStart, OnChangeStart] = useState(new Date());
  const [valueDateFinish, OnChangeFinish] = useState(new Date());
  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [warehouseWork, setWarehouseWork] = useState([]);
  const [selectElement, setSelectElement] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [addWarehouseWork, setAddWarehouseWork] = useReducer({
    idProject: "",
    idElement: "",
    number: "",
    dateStart: "",
    dateFinish: "",
    bacaFanuc: "",
    lathe: "",
    heidenhain: "",
    millingMachine: "",
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
    millingMachine: "",
  });
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

  useEffect(() => {
    fetchGetElement();
    fetchGETProject();
    fetchGetWarehouseWork();
  }, []);

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

  return (
    <div>
      <form className="form--wrapper" onSubmit={handleAddSubmit}>
        <section>
          <label htmlFor="project">project</label>
          <select value={selectProject} onChange={setSelectProject}>
            {project.map((item, index) => (
              <option key={index} value={item.nameProject}>
                {item.nameProject}
              </option>
            ))}
          </select>
        </section>
        <section>
          <label htmlFor="element">element</label>
          <select value={selectElement} onChange={setSelectElement}>
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
        <section>
          <label htmlFor="dataStart">rozpoczęcie</label>
          <DatePicker
            id="dataStart"
            onChange={OnChangeStart}
            value={valueDateStart}
          />
        </section>
        <section>
          <label htmlFor="dataFinish">wykonanie</label>
          <DatePicker
            id="dataFinish"
            onChange={OnChangeFinish}
            value={valueDateFinish}
          />
        </section>
        <section>
          <label htmlFor="number">ferzarka BACA</label>
          <input
            id="number"
            name="number"
            type="boolean"
            placeholder="ilość"
            ref={numberRef}
            onChange={handleChange}
          />
        </section>
        <button type="submit">add</button>
      </form>
      {/* <div className="div-getUser">{handlGetWarehouseWork(user)}</div> */}
    </div>
  );
};

export default WarehouseWork;
