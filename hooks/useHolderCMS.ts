import { useEffect, useState } from "react";
import axios from "axios";
import { CLUPANEL_API_URL } from "../constants";
import { Holder } from "../types";

export const useHolderCMS = (): [Holder, boolean] => {
  const [data, setData] = useState<Holder>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Holder>(CLUPANEL_API_URL + "/holders/1/")
      .then((res) => res.data)
      .then((data) => setData(data))
      .catch(() => {
        console.log("Something unexpected happened");
      })
      .then(() => setIsLoading(false));
  }, []);

  return [data, isLoading];
};
