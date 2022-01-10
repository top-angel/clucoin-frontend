import { useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectorNames, injected } from "../utils/web3";
import { useAuth } from "./useAuth";

export const useWeb3Listener = () => {
  const { logout, login } = useAuth();
  const { library, activate, error } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const { ethereum } = window as any;

    if (ethereum && ethereum.on && !error) {
      const handleConnect = () => {
        login(ConnectorNames.Injected);
      };

      const handleChainChanged = (chainId: string | number) => {
        login(ConnectorNames.Injected);
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          login(ConnectorNames.Injected);
        } else {
          logout();
        }
      };

      const handleNetworkChanged = (networkId: string | number) => {
        login(ConnectorNames.Injected);
      };

      const handleDisconnect = () => {
        logout();
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleNetworkChanged);
      ethereum.on("disconnect", handleDisconnect);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("chainChanged", handleNetworkChanged);
          ethereum.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [library, activate, logout, login, error]);
};
