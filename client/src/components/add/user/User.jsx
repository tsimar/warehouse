import React, { useReducer, useState, useEffect, Fragment } from "react";
import { apiUser, apiPosition } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import "./styleUser/user.css";

const User = () => {
  const [user, setUser] = useState([]);
  const [position, setPosition] = useState([]);
  const [addUser, setAddUser] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { nameUser: "", lastName: "", login: "", password: "", idPosition: "" }
  );
  const [editValue, setEditValue] = useState({
    editId: "",
    nameUser: "",
    lastName: "",
    login: "",
    password: "",
    idPosition: "",
  });
  const fetchGETPosition = async () => {
    try {
      // setLoading(true);
      const res = await apiPosition.get();
      setPosition(res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGET = async () => {
    try {
      // setLoading(true);
      const res = await apiUser.get();
      setPosition(res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGET();
    fetchGETPosition();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newElement = {
      nameUser: addUser.nameUser,
      lastName: addUser.lastName,
      login: addUser.login,
      password: addUser.password,
      idPosition: addUser.idPosition,
    };
    apiUser
      .post("", newElement)
      .then((response) => {
        fetchGET();
      })
      .catch((error) => {
        console.log(error);
      });

    setAddUser("");
  };
  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = { ...addUser };
    newFormData[fieldName] = fieldValue;

    setAddUser(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editValue.id,
      nameUser: editValue.nameUser,
      lastName: editValue.lastName,
      login: editValue.login,
      password: editValue.password,
      idPosition: editValue.idPosition,
    };

    apiUser
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
      nameUser: edit.nameUser,
      lastName: edit.lastName,
      login: edit.login,
      password: edit.password,
      idPosition: edit.idPosition,
    };
    setEditValue(formValues);
  };

  const handleCancelClick = () => {
    setEditValue.id(null);
  };

  const handleDeleteClick = (idUser) => {
    const newContacts = [...position];
    const index = user.findIndex((contact) => contact.id === idUser);

    newContacts.splice(index, 1);
    setUser(newContacts);

    apiUser.delete(`/${idUser}`);
  };
  const handleChangeSelect = (e) => {
    console.log("Fruit Selected!!");

    setPosition(e.target.value);
  };
  // const handlGetElement = (data) => {
  //   return data.map((item, index) => {
  //     return (
  //       <Fragment key={item.id}>
  //         {editValue.id === item.id ? (
  //           <EditItem
  //             editValue={editValue}
  //             handleCancelClick={handleCancelClick}
  //             handleEditFormChange={handleEditFormChange}
  //             handleEditFormSubmit={handleEditFormSubmit}
  //             handleDeleteClick={handleDeleteClick}
  //             handleAddSubmit={handleAddSubmit}
  //           />
  //         ) : (
  //           <ReadItem
  //             item={item}
  //             index={index}
  //             handleEditClick={handleEditClick}
  //           />
  //         )}
  //       </Fragment>
  //     );
  //   });
  // };

  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="name">imia</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
        />
        <label htmlFor="last_name">nazwisko</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          placeholder="last_name"
          onChange={handleChange}
        />
        <label htmlFor="login">login</label>
        <input
          id="login"
          name="login"
          type="text"
          placeholder="login"
          onChange={handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="text"
          placeholder="password"
          onChange={handleChange}
        />
        <label htmlFor="position">stanowisko</label>
        <select value={position.position} onChange={handleChangeSelect}>
          {position.map((item, index) => (
            <option key={index} value={item.position}>
              {item.position}
            </option>
          ))}
        </select>

        <button type="submit">add</button>
      </form>
      {/* <div className="div-get">{handlGetElement(user)}</div> */}
    </div>
  );
};

export default User;
