import React, { useState, useEffect } from "react";
import { apiProject } from "../../url/URL";

export const NameOfIdProject = async (id) => {
  const [project, setProject] = useState([]);
  const [nameProject, setNameProject] = useState("");

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
  const addProject = (id, project) => {
    return project.map((item) => {
      return id === item.id ? console.log("sdfsdf") : null;
    });
  };
  addProject(id, project);
  return "{ nameProject }";
};
