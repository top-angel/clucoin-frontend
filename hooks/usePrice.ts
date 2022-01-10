import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

import { useContract } from "./useContract";
import { API_URI } from "../constants";
import { PriceData } from "../types";

export const useLivePrice = (currency: "usd" | "bnb" = "usd"): number => {
  const { library } = useWeb3React();
  const [price, setPrice] = useState<number>();

  const fetchPrice = useCallback(() => {
    axios
      .get<{ data: PriceData }>(API_URI + "/v1/data/price")
      .then((res) => res.data.data)
      .then((data) => data.pcs[currency])
      .then((price) => setPrice(parseFloat(price)));
  }, [currency]);

  useEffect(() => {
    if (!library) return;

    const listener = (b) => {
      fetchPrice();
    };
    library.on("block", listener);

    return () => {
      library.off("block", listener);
    };
  }, [library, fetchPrice]);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return price;
};
