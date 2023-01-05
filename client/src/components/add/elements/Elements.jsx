import React, {
  ChangeEvent,
  useReducer,
  useState,
  useEffect,
  Fragment,
} from "react";
import "./styleElements/elements.css";
import { apiElement } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import { useRef } from "react";

const Elements = () => {
  console.log(apiElement);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const elementRef = useRef(null);
  const urlPictureRef = useRef(null);
  const [element, setElement] = useState([]);
  const [addElement, setAddElement] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { nameElement: "", urlPicture: null }
  );
  const [editValue, setEditValue] = useState({
    editId: "",
    nameElement: "",
    urlPicture: [],
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
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("fileName", addElement.urlPictureFileName);

    const newElement = {
      nameElement: addElement.nameElement,
      urlPicture: formData,
    };
    apiElement
      .post("/upload", formData)
      .then((response) => {
        response.json();
        fetchGET();
        console.log(response);
      })
      .then((result) => {
        console.log("success:", result);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddElement("");
    elementRef.current.value = "";
    urlPictureRef.current.value = "";
  };
  const handleChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newFormData = { ...addElement };
    newFormData[fieldName] = fieldValue;

    setAddElement(newFormData);
  };

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    // const fieldName = e.target.name;
    const fieldValue = e.target.files[0];
    const fieldValueFileName = e.target.files[0].name;

    const newFormData = { ...addElement };
    newFormData["urlPicture"] = fieldValue;
    // newFormData["urlPictureFileName"] = fieldValueFileName;

    setFile(e.target.files[0]);
    // setAddElement(newFormData);
    // setFileName(e.target.files[0].name);

    // 🚩 do the file upload here normally...
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
      nameElement: edit.nameElement,
      urlPicture: edit.urlPicture,
    };
    setEditValue(formValues);
  };

  const handleCancelClick = () => {
    setEditValue("");
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
          <label htmlFor="element">element</label>
          <input
            id="element"
            name="nameElement"
            type="text"
            placeholder="element"
            onChange={handleChange}
            ref={elementRef}
          />
        </div>
        <div className="div__add--wrapper">
          <label htmlFor="urlPicture">plik</label>
          <input
            id="urlPicture"
            name="urlPicture"
            type="file"
            placeholder="URL"
            accept=".pdf"
            // onChange={(e) => setAddElement({ urlPicture: e.target.files })}
            onChange={handleFileChange}
            ref={urlPictureRef}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <div className="div-get">{handlGetElement(element)}</div>
       <img src={element.urlPicture} />
    </div>
  );
};

export default Elements;

// import React, { useState } from "react";
//
// function App() {
//     const [file, setFile] = useState();
//     function handleChange(e) {
//         console.log(e.target.files);
//         setFile(URL.createObjectURL(e.target.files[0]));
//     }
//
//     return (
//         <div className="App">
//             <h2>Add Image:</h2>
//             <input type="file" onChange={handleChange} />
//             <img src={file} />
//
//         </div>
//
//     );
// }
//
// export default App;
