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
let k = 0;
const WarehouseWork = () => {
  k++;
  const numberRef = useRef(null);
  const [checked, setChecked] = useState(false);
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
  const handleEditClick = (event, edit) => {
    event.preventDefault();
    let dateLocal = new Date();

    // let date = edit.dataStart.split("-");
    // dateLocal.setDate(date[2]);
    // // console.log(dateLocal.getDate());
    // dateLocal.setMonth(date[1] - 1);
    // // console.log(dateLocal.getMonth() + 1);
    // dateLocal.setFullYear(date[0]);
    // // console.log(dateLocal.getFullYear());
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
          {editValue.id === item.id ? (
            <EditItemWarehouseWork
              editValue={editValue}
              handleCancelClick={handleCancelClick}
              // handleEditFormChange={handleEditFormChange}
              // handleEditFormSubmit={handleEditFormSubmit}
              handleDeleteClick={handleDeleteClick}
              handleAddSubmit={handleAddSubmit}
              project={project}
              element={element}
              user={user}
              // handleEditSelect={handleEditSelect}
              // editSelectProjectById={editSelect.project}
              // editSelectElementById={editSelect.element}
              // editSelectUserById={editSelect.user}
              // editSelectDateById={editSelect.dataStart}
            />
          ) : (
            <ReadItemWarehouseWork
              item={warehouseWork}
              index={index}
              project={project}
              element={element}
              handleEditClick={handleEditClick}
            />
          )}
        </Fragment>
      );
    });
  };

  return (
    <div>
      <label htmlFor="">Nr</label>
      <label htmlFor="">projekt</label>
      <label htmlFor="">detal</label>

      <div className="div-getWarehouseWork">
        {handlGetWarehouseWork(warehouseWork)}
      </div>
    </div>
  );
};

export default WarehouseWork;
