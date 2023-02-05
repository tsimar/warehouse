import React, {
  useReducer,
  useState,
  useEffect,
  useRef,
  Fragment,
} from "react";
import "./styleElements/elements.css";
import { apiElement } from "../../../url/URL";
import { apiElementPDF } from "../../../url/URL";
import { EditItem } from "../EditItem";
import ReadItem from "../ReadItem";
import { motion } from "framer-motion";
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
  const [nameLabelFile, setNameLabelFile] = useState("");
  const [addElement, setAddElement] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { nameElement: "", urlPicture: "" }
  );
  const [editValue, setEditValue] = useState({
    editId: "",
    nameElement: "",
    urlPicture: [],
  });

  const ref = useRef(null);
  const refLeft = useRef(null);
  const refRight = useRef(null);
  const refTop = useRef(null);
  const refBottom = useRef(null);

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

  const showPdfFile = async (file) => {
    // e.preventDefault();
    try {
      // setLoading(true);

      const res = await apiElementPDF.get(`/${file}`);
      setNameLabelFile(file);
      // res.blob();
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      const iframe = document.querySelector("iframe");
      if (iframe?.src) {
        iframe.src = url;
      } else {
        iframe.src = null;
        setNameLabelFile("");
      }
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
      urlPicture: addElement.urlPicture,
    };

    apiElement
      .post(``, newElement)
      .then((response) => {
        // response.json();
        fetchGET();
        // console.log(response);
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
        // response.json();
        fetchGET();
        // console.log(response);
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

  // const handleFileChange = (e) => {
  //   if (!e.target.files) {
  //     return;
  //   }

  //   // const fieldName = e.target.name;
  //   const fieldValue = e.target.files[0];
  //   const fieldValueFileName = e.target.files[0].name;

  //   const newFormData = { ...addElement };
  //   newFormData["urlPicture"] = fieldValue;

  //   setFile(e.target.files[0]);
  // };

  useEffect(() => {
    fetchGET();
  }, []);

  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);

    let x = 0;
    let y = 0;

    resizeableEle.style.top = "50px";
    resizeableEle.style.left = "50px";

    //Right resize
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.right = null;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    //Left resize
    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpLeftResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event) => {
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      resizeableEle.style.left = null;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    //Top resize
    const onMouseMoveTopResize = (event) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };
    //Bottom resize
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      resizeableEle.style.bottom = null;

      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };
    //Add mouse down event listener
    const resizeRight = refRight.current;
    resizeRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizeTop = refTop.current;
    resizeTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizeBottom = refBottom.current;
    resizeBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizeLeft = refLeft.current;
    resizeLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      resizeRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizeTop.removeEventListener("mousedown", onMouseDownTopResize);
      resizeBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      resizeLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
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
    if (window.confirm("Do you really deleting?")) {
      // window.open("exit.html", "I hope you know what you're doing!");
      const newContacts = [...element];
      const index = element.findIndex((contact) => contact.id === idElement);

      newContacts.splice(index, 1);
      setElement(newContacts);

      apiElement.delete(`/${idElement}`);
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
              showPdfFile={showPdfFile}
              disabled={false}
            />
          )}
        </Fragment>
      );
    });
  };

  // const handleFileCopy = (value) => {
  //   let selectedFile = value;

  //   if (selectedFile) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(selectedFile);
  //     reader.onloadend = (e) => {
  //       setPdfError("");
  //       setPdfFile(e.target.result);
  //     };
  //   } else {
  //     console.log("please select a PDF");
  //   }
  // };
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
    <div className="container-element">
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
            onChange={handleFile}
            ref={urlPictureRef}
          />
        </div>
        <button type="submit">
          <Icon icon={plus} size={20} />
        </button>
      </form>
      <section className="container-getANDshowPdf">
        <div className="div-get">{handlGetElement(element)}</div>
        <motion.div drag className="conteiner-showPdfFile-element">
          <label htmlFor="iframe">część: {nameLabelFile}</label>
          <div className="conteiner-showPdfFile container">
            <div ref={ref} className="resizeable">
              <div ref={refLeft} className="resizer resizer-l"></div>
              <div ref={refTop} className="resizer resizer-t"></div>
              <div ref={refRight} className="resizer resizer-r"></div>
              <div ref={refBottom} className="resizer resizer-b"></div>

              <iframe
                title="elemntPDF"
                className="iframe"
                src=""
                width="100%"
                height="90%"
              ></iframe>
            </div>
          </div>{" "}
        </motion.div>
      </section>
    </div>
  );
};

export default Elements;
