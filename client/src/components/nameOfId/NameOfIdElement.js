import React, { useState, useEffect } from "react";
import { apiElement } from "../../url/URL";

export const NameOfIdElement = ({ id }) => {
  const [element, setElement] = useState([]);

  const fetchGETElement = async () => {
    try {
      const res = await apiElement.get();
      setElement(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGETElement();
  }, []);

  const addElement = (id) => {
    return element.map((item, index) => {
      return id === item.id ? (
        <span key={index}>{item.nameElement}</span>
      ) : null;
    });
  };

  return <>{addElement(id)}</>;
};
