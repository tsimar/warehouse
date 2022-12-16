import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  Fragment,
} from "react";
import DatePicker from "react-date-picker";
import { apiProject, apiElement, apiOutGoodElement } from "../../url/URL";

const WarehouseMashin = () => {
  const [valueDate, OnChange] = useState(new Date());
  const [warehouseMashin, setWarehouseMashin] = useState([]);
  const [addWarehouseMashin, setAddWarehouseMashin] = useReducer({
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
  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;

    const fieldValue = e.target.value;

    const newFormData = { ...addWarehouseMashin };
    newFormData[fieldName] = fieldValue;

    setAddWarehouseMashin(newFormData);
  };
  const fetchGetWarehouseMashin = async () => {
    try {
      // setLoading(true);
      const res = await apiOutGoodElement.get();
      setWarehouseMashin(res.data);
      console.log("wareOut", res.data);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGetWarehouseMashin();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newWarehouseOut = {
      nameUser: addWarehouseMashin.nameUser,
      lastName: addWarehouseMashin.lastName,
      login: addWarehouseMashin.login,
      password: addWarehouseMashin.password,
      idPosition: addWarehouseMashin.password,
    };
    apiOutGoodElement
      .post("", newWarehouseOut)
      .then((response) => {
        fetchGetWarehouseMashin();
      })
      .catch((error) => {
        console.log(error);
      });

    addWarehouseMashin("");

    // numberRef.current.value = "";
    // lastNameRef.current.value = "";
    // loginRef.current.value = "";
    // passwordRef.current.value = "";
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
            // ref={nameUserRef}
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
            // ref={lastNameRef}
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
            // ref={loginRef}
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
            // ref={passwordRef}
          />
        </div>
        {/* <div className="div__add--wrapper">{handleGetComboBox(position)}</div> */}
        <button type="submit">add</button>
      </form>
      {/* <div className="div-getUser">{handlGetElement(user)}</div> */}
    </div>
  );
};

export default WarehouseMashin;
