import { useState, useEffect, useCallback, useMemo } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { BigNumberish } from "@ethersproject/bignumber";
import { Web3Provider } from "@ethersproject/providers";

import { Wallet } from "../types";
import { useCLUContract } from "./useContract";

export const useCLUBalance = (address?: string): number | undefined => {
  const contract = useCLUContract();
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    if (!contract || !address) return;

    contract.balanceOf(address).then((balance) => {
      setBalance(+ethers.utils.formatEther(balance) * 10 ** 9);
    });
  }, [contract, address]);

  return balance;
};

export const useWalletBalance = (wallet?: Wallet): number | undefined => {
  return useCLUBalance(wallet?.address);
};

export const useLiveBalance = (address: string) => {
  const { library } = useWeb3React<Web3Provider>();
  const contract = useCLUContract(library);

  const [balance, setBalance] = useState<number | undefined>();

  const fetchBalance = useCallback(
    (address: string) => {
      if (!contract) return;

      contract
        .balanceOf(address)
        .then((balance: BigNumberish) => {
          setBalance(+ethers.utils.formatEther(balance) * 10 ** 9);
        })
        .catch(() => console.error("Failed to fetch balance"));
    },
    [contract]
  );

  useEffect(() => {
    if (!library || !address) return;

    const listener = () => {
      fetchBalance(address);
    };

    library.on("block", listener);
    return () => {
      library.off("block", listener);
    };
  }, [library, address, fetchBalance]);

  useEffect(() => {
    fetchBalance(address);
  }, [fetchBalance, address]);

  return useMemo(() => balance, [balance]);
};
