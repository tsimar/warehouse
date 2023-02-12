import { useEffect, useState } from "react";
import { apiProject } from "./URL";

export const GetUseFetch = async () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const res = apiProject.get();
    setData(res.data);

    return () => {
      controller.abort();
    };
  }, []);
  return { data };
};
