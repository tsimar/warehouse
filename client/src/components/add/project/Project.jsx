import React, { useReducer, useState, useEffect, Fragment } from "react";
import { apiProject } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import "./styleProject/project.css";

const Project = () => {
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
      code112: addProject.code112,
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
    // setEditContactId(null);
  };

  const handleDeleteClick = (idProject) => {
    const newContacts = [...project];
    const index = project.findIndex((contact) => contact.id === idProject);

    newContacts.splice(index, 1);
    setProject(newContacts);

    apiProject.delete(`/${idProject}`);
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
            name="nammeProject"
            type="text"
            placeholder="project"
            onChange={handleChange}
          />
        </div>
        <div className="div__add--wrapper">
          <label htmlFor="code">code 112</label>
          <input
            id="code"
            name="code112"
            type="text"
            placeholder="code 112"
            onChange={handleChange}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <div className="div-get">{handlGetElement(project)}</div>
    </div>
  );
};

export default Project;
