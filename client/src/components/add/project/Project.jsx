import React, {
  useReducer,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";
import { apiProject } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import "./styleProject/project.css";

const Project = () => {
  const nameProjectRef = useRef(null);
  const code112Ref = useRef(null);
  const [project, setProject] = useState([]);
  const [addProject, setAddProject] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { nameProject: "", code112: "" }
  );
  const [editValue, setEditValue] = useState({
    editId: "",
    nameProject: "",
    code112: "",
  });
  const fetchGET = async () => {
    try {
      // setLoading(true);
      const res = await apiProject.get();
      console.log(res.data);
      setProject(res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      nameProject: addProject.nameProject,
      code112: 1,
    };
    apiProject
      .post("", newProject)
      .then((response) => {
        fetchGET();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddProject("");
    nameProjectRef.current.value = "";
    // code112Ref.current.value = "";
  };

  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = { ...addProject };
    newFormData[fieldName] = fieldValue;

    setAddProject(newFormData);
  };

  useEffect(() => {
    fetchGET();
  }, []);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editValue.id,
      nameProject: editValue.nameProject,
      code112: editValue.code112,
    };

    apiProject
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
      nameProject: edit.nameProject,
      code112: edit.code112,
    };
    setEditValue(formValues);
  };

  const handleCancelClick = () => {
    setEditValue("");
  };

  const handleDeleteClick = (idProject) => {
    if (window.confirm("Do you really deleting?")) {
      window.open("exit.html", "I hope you know what you're doing!");
      const newContacts = [...project];
      const index = project.findIndex((contact) => contact.id === idProject);

      newContacts.splice(index, 1);
      setProject(newContacts);

      apiProject.delete(`/${idProject}`);
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
          <label htmlFor="name">project</label>
          <input
            id="name"
            name="nameProject"
            type="text"
            placeholder="project"
            onChange={handleChange}
            ref={nameProjectRef}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <div className="div-get">{handlGetElement(project)}</div>
    </div>
  );
};

export default Project;
