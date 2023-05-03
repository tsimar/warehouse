import React, { useState, useEffect } from "react";
import { apiModuleOfProject } from "../../url/URL";

export const NameOfIdModule = ({ id }) => {
  const [module, setModule] = useState([]);

  const fetchGETModule = async () => {
    try {
      const res = await apiModuleOfProject.get();
      setModule(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGETModule();
  }, []);

  const addModule = (id) => {
    return module.map((item, index) => {
      return id === item.id ? <span key={index}>{item.nameModule}</span> : null;
    });
  };

  return <>{addModule(id)}</>;
};
