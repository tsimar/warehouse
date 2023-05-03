import React, { useState, useEffect } from "react";
import { apiProject } from "../../url/URL";

export const NameOfIdProject = ({ id }) => {
  const [project, setProject] = useState([]);

  const fetchGETProject = async () => {
    try {
      const res = await apiProject.get();
      setProject(res.data);
      console.log("project", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGETProject();
  }, []);

  const addProject = (id) => {
    // e.preventDefault();
    return project.map((item, index) => {
      return id === item.id ? (
        <span key={index}>{item.nameProject}</span>
      ) : null;
    });
  };

  return <>{addProject(id)}</>;
};
