import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styleElements/elements.css";
import { URL } from "../../../url/URL";

const apiElement = axios.create({ baseURL: `${URL}/element` });

const Elements = () => {
  const [element, setElement] = useState([]);
  const [addElement, setAddElement] = useState({
    element: "",
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
    const newElement = {
      element: addElement.element,
      urlPicture: addElement.urlPicture,
    };
    apiElement
      .post("/", newElement)
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
  };

  useEffect(() => {
    fetchGET();
  }, []);

  const handlGetElement = (data) => {
    return data.map((item, index) => {
      return (
        <div className="div-get" key={index}>
          <span>{item.id}</span>
          <span>{item.element}</span>
          <span>{item.urlPicture}</span>
        </div>
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="element">element</label>
        <input
          id="element"
          name="element"
          type="text"
          value="element"
          onChange={handleChange}
        />

        <button type="submit">add</button>
      </form>
      <div className="div-get">{handlGetElement(element)}</div>
    </div>
  );
};

export default Elements;
