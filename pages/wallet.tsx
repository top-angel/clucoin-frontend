import Head from "next/head";
import { NextPage } from "next";
import React, { useMemo } from "react";

import CluWallet from "../icons/CluWallet";
import CLUCard from "../components/CLUCard";
import { useUser } from "../stores/useUser";
import { useLivePrice } from "../hooks/usePrice";
import { WithAuth } from "../components/withAuth";
import { useLiveBalance } from "../hooks/useBalance";
import ReflectionsController from "../controllers/ReflectionsController";
import TransactionsController from "../controllers/TransactionsController";

const Wallet: NextPage = () => {
  const user = useUser((s) => s.user);
  const wallet = useMemo(() => user?.wallets[0], [user]);

  const price = useLivePrice();
  const balance = useLiveBalance(wallet?.address);

  return (
    <WithAuth>
      <Head>
        <title>CluCoin - Wallet</title>
      </Head>
      <div className="Container">
        <div className="WalletGrid">
          <div className="WalletsAndTransactions">
            <div className="WalletBox">
              <ul className="WalletList">
                {user?.wallets.map((wallet, i) => {
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        className="WalletBtn WalletSelected"
                      >
                        {wallet.nickname}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="WalletCoinsAmount">
                <p className="AmountOfCoins">
                  <CluWallet className="image" />
                  {(balance || 0)?.toLocaleString("en-US", {
                    maximumFractionDigits: 3,
                  })}
                </p>
                <p className="ReturnOnInvestment">
                  <span className="">
                    $
                    {(balance * (price || 0) || 0)?.toLocaleString("en-US", {
                      maximumFractionDigits: 3,
                    })}
                  </span>
                </p>
              </div>
            </div>
            <p className="TransactionsHistory">Transaction History</p>
            <div className="TransactionsLogs">
              <TransactionsController wallet={wallet} />
            </div>
          </div>
          <CLUCard />
        </div>
        <ReflectionsController
          balance={balance}
          wallet={wallet}
          price={price}
        />
      </div>
    </WithAuth>
  );
};

export default Wallet;
