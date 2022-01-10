import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BigNumber, Contract, ethers } from "ethers";
import { API_URI } from "../constants";
import { Transaction, Wallet } from "../types";

export const useTransactions = (
  address?: string
): [Transaction[] | undefined, boolean, Error] => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[] | undefined>();

  useEffect(() => {
    if (!address) return;

    setLoading(true);
    axios
      .get<{ data: (Transaction & { value: string })[] }>(
        `${API_URI}/v1/txn/historical`,
        {
          params: {
            address,
          },
        }
      )
      .then((res) => res.data.data)
      .then((transactions) =>
        transactions.map((txn) => ({
          ...txn,
          value: +ethers.utils.formatEther(BigNumber.from(txn.value)) * 10 ** 9,
        }))
      )
      .then((transactions) => setTransactions(transactions))
      .catch((e) => {
        setError(e);
      })
      .then(() => setLoading(false));
  }, [address]);

  return useMemo(
    () => [transactions, loading, error],
    [transactions, loading, error]
  );
};

export const useWalletTransactions = (wallet?: Wallet) => {
  return useTransactions(wallet?.address);
};
