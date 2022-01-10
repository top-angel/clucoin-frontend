import { useCallback } from "react";
import { useUser } from "../stores/useUser";
import { connectorKey } from "../constants";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  connectorChecks,
  ConnectorNames,
  connectorsByName,
  signMessage,
} from "../utils/web3";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { UserRejectedRequestError as UserRejectedRequestErrorBSC } from "@binance-chain/bsc-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWC,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";

export const useAuth = () => {
  const [, , removeCookie] = useCookies();
  const signOut = useUser((s) => s.removeToken);
  const { activate, deactivate, library, account } = useWeb3React();

  const logout = useCallback(() => {
    deactivate();
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName[ConnectorNames.WalletConnect].close();
      connectorsByName[ConnectorNames.WalletConnect].walletConnectProvider =
        null;
    }
    signOut();
    localStorage.removeItem(connectorKey);
    removeCookie("token", { path: "/" });
  }, [deactivate, signOut, removeCookie]);

  const login = useCallback(
    (connectorName: ConnectorNames, doSign?) => {
      const connector = connectorsByName[connectorName];
      if (connector) {
        if (!connectorChecks[connectorName]()) {
          toast.error("Provider unavailable");
          return;
        }

        const errorCallback = (e) => {
          if (e instanceof UnsupportedChainIdError) {
            if (connectorName == ConnectorNames.Injected) {
              const provider = (window as any).ethereum;

              if (provider) {
                provider
                  .request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: "0x38",
                        chainName: "Binance Smart Chain",
                        nativeCurrency: {
                          name: "BNB",
                          symbol: "BNB",
                          decimals: 18,
                        },
                        rpcUrls: ["https://bsc-dataseed.binance.org/"],
                        blockExplorerUrls: ["https://bscscan.com"],
                      },
                    ],
                  })
                  .then(() => {
                    activate(connector, null, true)
                      .then(() => {
                        localStorage.setItem(connectorKey, connectorName);
                        if(doSign) doSign();
                      })
                      .catch(errorCallback);
                  })
                  .catch((e) => {
                    if (e instanceof UserRejectedRequestErrorInjected) {
                      toast.error("Please switch your chain id");
                    }
                  });
              } else {
                toast.error("Please switch your chain id");
                logout();
              }
            } else {
              toast.error("Please switch your chain id");
              logout();
            }
          } else if (
            e instanceof UserRejectedRequestErrorWC ||
            e instanceof UserRejectedRequestErrorBSC ||
            e instanceof UserRejectedRequestErrorInjected
          ) {
            if (connector instanceof WalletConnectConnector) {
              connector.walletConnectProvider = null;
            }
            toast.error("Please authorize your account");
          } else {
            console.log(e);
          }
          throw e;
        };

        return activate(connector, null, true)
          .then(() => {
            localStorage.setItem(connectorKey, connectorName);
            if(doSign) doSign();
          })
          .catch(errorCallback);
      } else {
        console.log("Invalid Connector name");
      }
    },
    [activate, logout]
  );

  const sign = useCallback(
    (message) => {
      return signMessage(library, account, message);
    },
    [library, account]
  );

  return { login, logout, sign, account, library };
};
