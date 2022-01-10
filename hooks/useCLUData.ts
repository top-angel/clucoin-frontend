import { useEffect, useState } from "react";
import axios from "axios";
import { API_URI } from "../constants";
import { CluData } from "../types";

export const useCLUData = (): [CluData, boolean] => {
  const [data, setData] = useState<CluData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get<{ data: CluData }>(API_URI + "/v1/data/")
      .then((res) => res.data.data)
      .then((data) => setData(data))
      .catch(() => {
        console.log("Something unexpected happened");
      })
      .then(() => setIsLoading(false));
  }, []);

  return [data, isLoading];
};
