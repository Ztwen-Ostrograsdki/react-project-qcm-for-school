import { useEffect, useState } from "react";
import http from "../apis/http";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  const [isLoading, setIsloading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get(url);
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, setData, isLoading, error };
};

export default useFetch;
