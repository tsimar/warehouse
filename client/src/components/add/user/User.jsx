import React, {
  useReducer,
  useState,
  useRef,
  useEffect,
  Fragment,
} from "react";
// import Call from "../../../Call";
import { apiUser, apiPosition } from "../../../url/URL";
import { EditItemUser } from "./EditItemUser";
import ReadItemUser from "./ReadItemUser";
import "./styleUser/user.css";

const User = () => {
  let editSelectPutPosition = "";

  const nameUserRef = useRef(null);
  const lastNameRef = useRef(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const [user, setUser] = useState([]);
  const [position, setPosition] = useState([]);
  const [selectPosition, setSelectPosition] = useState("");
  const [editSelectPosition, setEditSelectPosition] = useState("");

  const [addUser, setAddUser] = useReducer({
    nameUser: "",
    lastName: "",
    login: "",
    password: "",
    idPosition: "",
  });

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
      // setPositionName(res.data.position);
      console.log("position", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGET = async () => {
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

  useEffect(() => {
    fetchGET();
  }, [editValue.editId]);

  useEffect(() => {
    fetchGETPosition();
 
      // setPositionName(...position.position)

  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newElement = {
      nameUser: addUser.nameUser,
      lastName: addUser.lastName,
      login: addUser.login,
      password: addUser.password,
      idPosition: selectPosition,
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

    nameUserRef.current.value = "";
    lastNameRef.current.value = "";
    loginRef.current.value = "";
    passwordRef.current.value = "";
  };
  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;

    const fieldValue = e.target.value;

    const newFormData = { ...addUser };
    newFormData[fieldName] = fieldValue;

    setAddUser(newFormData);
  };

  const changeNamePositionById = (data) => {
    setEditSelectPosition("");
    for (let index = 0; index < position.length; index++) {
      if (position[index].position === data) {
        return (editSelectPutPosition = position[index].id);
      }
    }
  };

  const changeIdByNamePosition = (data) => {
    for (let index = 0; index < position.length; index++) {
      if (position[index].id === data) {
        return setEditSelectPosition(position[index].position);
      }
    }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    changeNamePositionById(editSelectPosition);
    const editedContact = {
      id: editValue.id,
      nameUser: editValue.nameUser,
      lastName: editValue.lastName,
      login: editValue.login,
      password: editValue.password,
      idPosition: editSelectPutPosition,
    };

    apiUser
      .put("", editedContact)
      .then((response) => {
        fetchGET();
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
      nameUser: edit.nameUser,
      lastName: edit.lastName,
      login: edit.login,
      password: edit.password,
      idPosition: edit.idPosition,
    };
    setEditValue(formValues);
    changeIdByNamePosition(edit.idPosition);
  };

  const handleCancelClick = () => {
    setEditValue("");
  };

  const handleDeleteClick = (idUser) => {
    const newContacts = [...user];
    const index = user.findIndex((contact) => contact.id === idUser);
    newContacts.splice(index, 1);
    setUser(newContacts);
    apiUser.delete(`/${idUser}`);
  };

  const handleChangeSelect = (e) => {
    setSelectPosition(e.target.name);
  };

  const handleEditSelect = (data) => {
    // e.preventDefault();
    setEditSelectPosition(data);
  };

  const handleGetComboBox = (data) => {
    return (
      <>
        <label htmlFor="position">stanowisko</label>
        <select value={selectPosition} onChange={handleChangeSelect}>
          {data.map((item, index) => (
            <option key={index} value={item.position}>
              {item.position}
            </option>
          ))}
        </select>
      </>
    );
  };

  const handlGetElement = (data) => {
    return data.map((item, index) => {
      return (
        <Fragment key={item.id}>
          {editValue.id === item.id ? (
            <EditItemUser
              editValue={editValue}
              handleCancelClick={handleCancelClick}
              handleEditFormChange={handleEditFormChange}
              handleEditFormSubmit={handleEditFormSubmit}
              handleDeleteClick={handleDeleteClick}
              handleAddSubmit={handleAddSubmit}
              position={position}
              handleEditSelect={handleEditSelect}
              editSelectPositionById={editSelectPosition}
            />
          ) : (
            <ReadItemUser
              item={item}
              index={index}
              position={position}
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
          <label htmlFor="name">imia</label>
          <input
            id="name"
            name="nameUser"
            type="text"
            placeholder="imia"
            ref={nameUserRef}
            onChange={handleChange}
          />
        </div>
        <div className="div__add--wrapper">
          <label htmlFor="last_name">nazwisko</label>
          <input
            id="last_name"
            name="lastName"
            type="text"
            placeholder="nazwisko"
            ref={lastNameRef}
            onChange={handleChange}
          />
        </div>
        <div className="div__add--wrapper">
          <label htmlFor="login">login</label>
          <input
            id="login"
            name="login"
            type="text"
            placeholder="login"
            ref={loginRef}
            onChange={handleChange}
          />
        </div>
        <div className="div__add--wrapper">
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="text"
            placeholder="hasło"
            onChange={handleChange}
            ref={passwordRef}
          />
        </div>
        <div className="div__add--wrapper">{handleGetComboBox(position)}</div>
        <button type="submit">add</button>
      </form>
      <div className="div-getUser">{handlGetElement(user)}</div>
   
    </div>
  );
};

export default User;
