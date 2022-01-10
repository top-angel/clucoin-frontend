import { useMemo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import CLUAbi from "../utils/CLUAbi.json";
import { getContract } from "../utils/web3";

export function useContract(
  address: string | undefined,
  ABI: any,
  lib?: Web3Provider,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        lib || library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, lib, withSignerIfPossible, account]);
}

export const useCLUContract = (lib?: Web3Provider) => {
  return useContract("0x1162E2EfCE13f99Ed259fFc24d99108aAA0ce935", CLUAbi, lib);
};
