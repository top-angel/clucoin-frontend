import { Contract, ethers } from "ethers";
import { BscConnector } from "@binance-chain/bsc-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import { connectorKey } from "../constants";
import Binance from "../icons/Binance";
import MetaMask from "../icons/MetaMask";
import WalletConnect from "../icons/WalletConnect";

export const injected = new InjectedConnector({ supportedChainIds: [56] });

export const walletConnect = new WalletConnectConnector({
  chainId: 56,
  qrcode: true,
  pollingInterval: 12000,
  supportedChainIds: [56],
  infuraId: "bcf7551e13b74e47b8178aee8b4798f9",
  bridge: "https://pancakeswap.bridge.walletconnect.org/",
  clientMeta: {
    name: "CluCoin",
    description: "a coin",
    url: "http://127.0.0.1:3000",
    icons: [
      "https://cdn.discordapp.com/avatars/601173582516584602/51256ab5abc232f62c5f0f03b2286fe8.png?size=256",
    ],
  },
  rpc: { 56: "https://bsc-dataseed.binance.org/" },
});

export const bsc = new BscConnector({
  supportedChainIds: [56],
});

export enum ConnectorNames {
  Binance = "Binance",
  Injected = "MetaMask",
  WalletConnect = "WalletConnect",
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Binance]: bsc,
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletConnect,
};

export const connectorImages: {
  [connectorName in ConnectorNames]: JSX.Element;
} = {
  [ConnectorNames.Binance]: <Binance />,
  [ConnectorNames.Injected]: <MetaMask />,
  [ConnectorNames.WalletConnect]: <WalletConnect />,
};

export const connectorChecks: {
  [connectorName in ConnectorNames]: () => boolean;
} = {
  [ConnectorNames.Binance]: () => Reflect.has(window, "BinanceChain"),
  [ConnectorNames.Injected]: () => Reflect.has(window, "ethereum"),
  [ConnectorNames.WalletConnect]: () => true,
};

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  ABI: any,
  library?: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address == AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    library ?? (getProviderOrSigner(library, account) as any)
  );
}

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const signMessage = (
  provider: any,
  account: string,
  message: string
): Promise<string> => {
  const connector = localStorage.getItem(connectorKey);
  if ((window as any).BinanceChain && connector == "Binance") {
    return (window as any).BinanceChain.bnbSign(account, message).then(
      (res) => res.signature
    );
  }

  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
    return provider.provider?.wc.signPersonalMessage([wcMessage, account]);
  }

  return provider.getSigner(account).signMessage(message);
};
