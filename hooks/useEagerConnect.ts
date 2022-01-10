import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAuth } from "./useAuth";
import { ConnectorNames } from "../utils/web3";
import { connectorKey, isServer } from "../constants";
import { useUser } from "../stores/useUser";

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, "BinanceChain", {
      get() {
        return this.bsc;
      },
      set(bsc) {
        this.bsc = bsc;

        resolve();
      },
    })
  );

export const useEagerConnect = () => {
  const [cookies] = useCookies();
  const { login, logout } = useAuth();
  const fetchUser = useUser((s) => s.fetchUser);
  const updateToken = useUser((s) => s.updateToken);

  useEffect(() => {
    if (!isServer) {
      if (!cookies.token) return;

      const connectorName = localStorage.getItem(
        connectorKey
      ) as ConnectorNames;

      const isConnectorBinanceChain = connectorName == ConnectorNames.Binance;
      const isBinanceChainDefined = Reflect.has(window, "BinanceChain");

      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorName));

        return;
      }

      if (!connectorName) return;

      login(connectorName)
        .then(() => {
          updateToken(cookies.token);
          return fetchUser();
        })
        .catch(() => {
          logout();
        });
    }
  }, [login, logout, fetchUser, updateToken, cookies]);
};
