import { useState, useRef, useCallback, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Token, ChainId, Pair, Fetcher, TokenAmount } from "@pancakeswap/sdk";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import tokens from "../utils/tokens";

export const useToken = (id?: string) => {
  const { library } = useWeb3React();
  const [data, setData] = useState<Token>();

  useEffect(() => {
    if (!id) return;

    const token = tokens[id];

    Fetcher.fetchTokenData(
      ChainId.MAINNET,
      ethers.utils.getAddress(token.address["56"]),
      library,
      token.symbol,
      id
    ).then((t) => {
      setData(t);
    });
  }, [id, library]);

  return data;
};

export const usePair = (
  token1?: Token,
  token2?: Token
): [Pair, (amount: string) => TokenAmount] => {
  const [data, setData] = useState<Pair | undefined>();
  const { library } = useWeb3React<Web3Provider>();

  const mainPair = useRef<Pair | undefined>();

  useEffect(() => {
    if (!token1 || !token2 || !library) return undefined;
    if (token1.equals(token2)) return undefined;

    Fetcher.fetchPairData(token1, token2, library).then((p) => {
      setData(p);
      mainPair.current = p;
    });
  }, [library, token1, token2]);

  const getAmountsOut = useCallback(
    (amount: string) => {
      if (!data) return undefined;

      const [out, pair] = data.getOutputAmount(new TokenAmount(token1, amount));
      setData(pair);
      return out;
    },
    [token1, data]
  );

  return [data, getAmountsOut];
};
