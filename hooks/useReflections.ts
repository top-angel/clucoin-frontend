import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

import { Reflection, Wallet } from "../types";
import { useCLUContract } from "./useContract";
import useInterval from "./useInterval";

export const useReflections = (
  address?: string,
  reload?: boolean
): [Reflection[], boolean] => {
  const contract = useCLUContract();
  const [data, setData] = useState<Reflection[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getReflections = useCallback<
    (blockNumber: number, lastBal: number) => Promise<Reflection[]>
  >(
    async (blockNumber, balance) => {
      let lastBal = balance;
      const reflections = [];

      for (let i = blockNumber; i > blockNumber - 60; i -= 10) {
        try {
          const balance = await contract.balanceOf(address, { blockTag: i });
          const block = await contract.provider.getBlock(i);

          reflections.push({
            timestamp: block.timestamp * 1000,
            balance: +ethers.utils.formatEther(balance) * 10 ** 9,
            reflection:
              +ethers.utils.formatEther(`${lastBal - balance}`) * 10 ** 9,
          });
          lastBal = balance;
        } catch {
          // pass
        }
      }

      return reflections;
    },
    [contract, address]
  );

  const updateReflections = useCallback(() => {
    if (!contract || !address) return;

    contract
      .balanceOf(address)
      .then((balance) => {
        return contract.provider.getBlockNumber().then((block) => {
          return getReflections(block, balance).then((reflections) => {
            setData(reflections);
          });
        });
      })
      .then(() => setIsLoading(false));
  }, [contract, address, getReflections]);

  useEffect(() => {
    updateReflections();
  }, [updateReflections]);

  useInterval(() => {
    if (reload) {
      updateReflections();
    }
  }, 10 * 1000);

  return [data, isLoading];
};

export const useWalletReflections = (wallet?: Wallet, reload?: boolean) => {
  return useReflections(wallet?.address, reload);
};
