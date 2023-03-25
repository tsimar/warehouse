import React, {
  useReducer,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";
import DeleteApI from "../../../delete/DeleteApI";
import { apiModuleOfProject } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import "./moduleOfProject.css";

const ModuleOfProject = () => {
  const nameProjectRef = useRef(null);
  const code112Ref = useRef(null);
  const [moduleOfProject, setModuleOfProject] = useState([]);
  const [addModuleOfProject, setAddModuleOfProject] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { nameModule: "", idProject: "" }
  );
  const [editValue, setEditValue] = useState({
    editId: "",
    nameModule: "",
    idProject: "",
  });
  const fetchGET = async () => {
    try {
      // setLoading(true);
      const res = await apiModuleOfProject.get();
      console.log(res.data);
      setModuleOfProject(res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newModule = {
      nameModule: addModuleOfProject.nameModule,
    };
    apiModuleOfProject
      .post("", newModule)
      .then((response) => {
        fetchGET();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddModuleOfProject("");
    nameProjectRef.current.value = "";
    // code112Ref.current.value = "";
  };

  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = { ...addModuleOfProject };
    newFormData[fieldName] = fieldValue;

    setAddModuleOfProject(newFormData);
  };

  useEffect(() => {
    fetchGET();
  }, []);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editValue.id,
      nameModule: editValue.nameModule,
      idProject: editValue.idProject,
    };

    apiModuleOfProject
      .put("", editedContact)
      .then((response) => {
        console.log(response);
        fetchGET();
      })
      .catch((error) => {
        console.log(error);
      });
    handleCancelClick();
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
      nameModule: edit.nameModule,
    };
    setEditValue(formValues);
  };

  const handleCancelClick = () => {
    setEditValue("");
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Do you really deleting?")) {
      window.open("exit.html", "I hope you know what you're doing!");
      const newContacts = [...moduleOfProject];
      const index = moduleOfProject.findIndex((contact) => contact.id === id);

      newContacts.splice(index, 1);
      setModuleOfProject(newContacts);

      apiModuleOfProject.delete(`/${id}`);
    }
  };

  const handlGetElement = (data) => {
    // e.preventDefault();
    return data.map((item, index) => {
      return (
        <Fragment key={item.id}>
          {editValue.id === item.id ? (
            <EditItem
              editValue={editValue}
              handleCancelClick={handleCancelClick}
              handleEditFormChange={handleEditFormChange}
              handleEditFormSubmit={handleEditFormSubmit}
              handleDeleteClick={handleDeleteClick}
              handleAddSubmit={handleAddSubmit}
            />
          ) : (
            <ReadItem
              item={item}
              index={index}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              disabled={true}
            />
          )}
        </Fragment>
      );
    });
  };
  return (
    <div>
      <form className="form--wrapper" onSubmit={handleAddSubmit}>
        <div className="div__add--wrapper">
          <label htmlFor="name">module </label>
          <input
            id="name"
            name="nameModule"
            type="text"
            placeholder="module"
            onChange={handleChange}
            ref={nameProjectRef}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <div className="div-get">{handlGetElement(moduleOfProject)}</div>
    </div>
  );
};

export default ModuleOfProject;
