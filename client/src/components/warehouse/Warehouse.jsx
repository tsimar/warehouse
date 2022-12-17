import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  Fragment,
} from "react";
import DatePicker from "react-date-picker";
import { apiProject, apiElement, apiUser, apiWarehouse } from "../../url/URL";

const Warehouse = () => {
  const numberRef = useRef(null);
  const [valueDate, OnChange] = useState(new Date());
  const [element, setElement] = useState([]);
  const [project, setProject] = useState([]);
  const [user, setUser] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [selectElement, setSelectElement] = useState("");
  const [selectProject, setSelectProject] = useState("");
  const [selectUser, setSelectUser] = useState("");
  const [addWarehouse, setAddWarehouse] = useReducer({
    idProject: "",
    idElement: "",
    number: "",
    date: "",
    idUser: "",
    warehouseName: "",
  });

  const [editValue, setEditValue] = useState({
    editId: "",
    idProject: "",
    idElement: "",
    number: "",
    date: "",
    idUser: "",
    warehouseName: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newWarehouse = {
      idProject: addWarehouse.idProject,
      idElement: addWarehouse.idElement,
      number: addWarehouse.number,
      date: addWarehouse.date,
      idUser: addWarehouse.idUser,
      warehouseName: addWarehouse.warehouseName,
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
    // lastNameRef.current.value = "";
    // loginRef.current.value = "";
    // passwordRef.current.value = "";
  };

  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;

    const fieldValue = e.target.value;

    const newFormData = { ...addWarehouse };
    newFormData[fieldName] = fieldValue;

    setAddWarehouse(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    // changeNamePositionById(editSelectPosition);
    const editedContact = {
      id: editValue.id,
      idProject: editValue.idProject,
      idElement: editValue.idElement,
      number: editValue.number,
      date: editValue.date,
      idUser: editValue.idUser,
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

    const formValues = {
      id: edit.id,
      idPosition: edit.idPosition,
      idElement: edit.idElement,
      number: edit.number,
      date: edit.date,
      idUser: edit.idUser,
      warehouseName: edit.warehouseName,
    };
    setEditValue(formValues);
    // changeIdByNamePosition(edit.idPosition);
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
  const fetchGetWarehouse = async () => {
    try {
      // setLoading(true);
      const res = await apiWarehouse.get();
      setAddWarehouse(res.data);

      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetElement();
    fetchGETProject();
    fetchGetUser();
    fetchGetWarehouse();
  }, []);

  return (
    <div>
      <form className="form--wrapper" onSubmit={handleAddSubmit}>
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
        <section>
          <label htmlFor="data">date</label>
          <DatePicker id="data" onChange={OnChange} value={valueDate} />
        </section>
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
      {/* <div className="div-getUser">{handlGetElement(user)}</div> */}
    </div>
  );
};

export default Warehouse;
