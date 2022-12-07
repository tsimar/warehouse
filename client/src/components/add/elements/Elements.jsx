import React, { useEffect, useState, Fragment } from "react";
// import axios from "axios";
import "./styleElements/elements.css";
import { apiElement } from "../../../url/URL";
import { EditItem } from "./EditItem";
import ReadItem from "./ReadItem";

// let idIndex = "";

const Elements = () => {
  const [element, setElement] = useState([]);
  // const [idIndex, setIdIndex] = useState("0");
  const [addElement, setAddElement] = useState({
    nameElement: "",
    urlPicture: "",
  });
  const [editValue, setEditValue] = useState({
    editId: "",
    nameElement: "",
    urlPicture: "",
  });
  const fetchGET = async () => {
    try {
      // setLoading(true);
      const res = await apiElement.get();
      console.log(res.data);
      setElement(res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newElement = {
      nameElement: addElement.nameElement,
      urlPicture: addElement.urlPicture,
    };
    apiElement
      .post("", newElement)
      .then((response) => {
        fetchGET();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddElement("");
  };
  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = { ...addElement };
    newFormData[fieldName] = fieldValue;

    setAddElement(newFormData);
  };

  useEffect(() => {
    fetchGET();
  }, []);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editValue.id,
      nameElement: editValue.nameElement,
      urlPicture: editValue.urlPicture,
    };

    apiElement
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
      nameElement: edit.nameElement,
      urlPicture: edit.urlPicture,
    };
    setEditValue(formValues);
  };

  const handleCancelClick = () => {
    // setEditContactId(null);
  };

  const handleDeleteClick = (idElement) => {
    const newContacts = [...element];
    const index = element.findIndex((contact) => contact.id === idElement);

    newContacts.splice(index, 1);
    setElement(newContacts);

    apiElement.delete(`/${idElement}`);
  };

  const handlGetElement = (data) => {
    // e.preventDefault();
    return data.map((item) => {
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
            <ReadItem item={item} handleEditClick={handleEditClick} />
          )}
        </Fragment>
      );
    });
  };

  return (
    <div>
      <form className="form--wrapper" onSubmit={handleAddSubmit}>
        <div className="div__add--wrapper">
          <label htmlFor="element">element</label>
          <input
            id="element"
            name="element"
            type="text"
            placeholder="element"
            onChange={handleChange}
          />
        </div>
        <div className="div__add--wrapper">
          <label htmlFor="urlPicture">plik</label>
          <input
            id="urlPicture"
            name="urlPicture"
            type="text"
            // accept=".pdf"
            // onChange={(e) => setAddElement({ urlPicture: e.target.files })}
            onChange={handleChange}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <div className="div-get">{handlGetElement(element)}</div>
    </div>
  );
};

export default Elements;
