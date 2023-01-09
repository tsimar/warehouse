import React, { useReducer, useState, useEffect, Fragment } from "react";
import { useRef } from "react";
import { apiPosition } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import "./stylePosition/position.css";

const Position = () => {
  const positionRef = useRef(null);
  const permissionRef = useRef(null);
  const [position, setPosition] = useState([]);
  const [addPosition, setAddPosition] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      position: "",
      permission: "",
    }
  );
  const [editValue, setEditValue] = useState({
    editId: "",
    position: "",
    permission: "",
  });
  const fetchGET = async () => {
    try {
      // setLoading(true);
      const res = await apiPosition.get();

      setPosition(res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newElement = {
      position: addPosition.position,
      permission: addPosition.permission,
    };
    apiPosition
      .post("", newElement)
      .then((response) => {
        fetchGET();
      })
      .catch((error) => {
        console.log(error);
      });

    setAddPosition("");
    positionRef.current.value = "";
    permissionRef.current.value = "";
  };
  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = { ...addPosition };
    newFormData[fieldName] = fieldValue;

    setAddPosition(newFormData);
  };

  useEffect(() => {
    fetchGET();
  }, []);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editValue.id,
      position: editValue.position,
      permission: editValue.permission,
    };

    apiPosition
      .put("", editedContact)
      .then((response) => {
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
      position: edit.position,
      permission: edit.permission,
    };
    setEditValue(formValues);
  };

  const handleCancelClick = () => {
    setEditValue("");
  };

  const handleDeleteClick = (idPosition) => {
    const newContacts = [...position];
    const index = position.findIndex((contact) => contact.id === idPosition);

    newContacts.splice(index, 1);
    setPosition(newContacts);

    apiPosition.delete(`/${idPosition}`);
  };

  const handlGetElement = (data) => {
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
          <label htmlFor="position">position</label>
          <input
            id="position"
            name="position"
            type="text"
            placeholder="position"
            onChange={handleChange}
            ref={positionRef}
          />
        </div>
        <div className="div__add--wrapper">
          <label htmlFor="permission">permission</label>
          <input
            id="permission"
            name="permission"
            type="text"
            placeholder="permission"
            onChange={handleChange}
            ref={permissionRef}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <div className="div-get">{handlGetElement(position)}</div>
    </div>
  );
};

export default Position;
