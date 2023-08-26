import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// /**custom hook */
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({
          ...prev,
          isloading: true,
        }));
        const { username } = !query ? await getUsername() : "";
        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({
            ...prev,
            isloading: false,
          }));
        }
        setData((prev) => ({
          ...prev,
          isloading: false,
        }));
        setData((prev) => ({
          ...prev,
          apiData: data,
          status: status,
        }));
        // console.log(data);
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isloading: false,
          serverError: error,
        }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
