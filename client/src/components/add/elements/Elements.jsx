import React, { useReducer, useState, useEffect, Fragment } from "react";
import "./styleElements/elements.css";
import { apiElement } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import { useRef } from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import { PdfJs } from "@react-pdf-viewer/core";

// Core viewer
import { PdfJs, Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

//default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Elements = () => {
  let pdfBlobOutput;
  //creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  //pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);
  //pdf file error state
  const [pdfError, setPdfError] = useState("");

  const allowedFiles = ["application/pdf"];
  //pdf file-------------------------------------------

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  //----------------------------------------
  const elementRef = useRef(null);
  const urlPictureRef = useRef(null);
  const [element, setElement] = useState([]);
  const [addElement, setAddElement] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { nameElement: "", urlPicture: "" }
  );
  const [editValue, setEditValue] = useState({
    editId: "",
    nameElement: "",
    urlPicture: [],
  });

  const fetchGET = async () => {
    try {
      // setLoading(true);
      const res = await apiElement.get("/TapScanner 20-12-2022-20꞉55.pdf");
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
      // handleFileCopy(link.download);
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchGET = async () => {
  //   try {
  //     // setLoading(true);
  //     const res = await apiElement.get();
  //     console.log(res.data);
  //     setElement(res.data);
  //     // setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("fileName", addElement.urlPictureFileName);

    const newElement = {
      nameElement: addElement.nameElement,
      urlPicture: addElement.urlPicture,
    };

    apiElement
      .post(``, newElement)
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

    setFile(e.target.files[0]);
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
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </Fragment>
      );
    });
  };

  const handleFileCopy = (value) => {
    let selectedFile = value;

    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (e) => {
        setPdfError("");
        setPdfFile(e.target.result);
      };
    } else {
      console.log("please select a PDF");
    }
  };
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);

          const newFormData = { ...addElement };
          newFormData["urlPicture"] = selectedFile.name;
          setAddElement(newFormData);
          setFile(selectedFile);
        };
      } else {
        setPdfFile(null);
        setPdfError("Not a valid pdf: Please select only PDF");
      }
    } else {
      console.log("please select a PDF");
    }
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
            onChange={handleFile}
            ref={urlPictureRef}
          />
        </div>
        <button type="submit">
          <Icon icon={plus} size={20} />
        </button>
      </form>
      <div className="div-get">{handlGetElement(element)}</div>
      <div className="container">
        {/*Upload PDF */}
        <form>
          <label>
            <h5>Upload pdf</h5>
          </label>
          <input type="file" className="form-control" onChange={handleFile} />
          {pdfError && <span className="text-danger">{pdfError}</span>}
        </form>

        {/* View PDF*/}
        <h5>View PDF</h5>
        <div className="viewer">
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}
          {!pdfFile && <>no file is selected yet</>}
        </div>
        <div>{file}</div>
      </div>
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
