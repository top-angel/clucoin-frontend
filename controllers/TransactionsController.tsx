import React from "react";

import { Wallet } from "../types";
import Spinner from "../components/Spinner";
import Transaction from "../components/Transaction";
import { useWalletTransactions } from "../hooks/useTransaction";

interface Props {
  wallet: Wallet;
}

const TransactionsController = ({ wallet }: Props) => {
  const [transactions, loading] = useWalletTransactions(wallet);

  if (loading) {
    return (
      <div className="spin">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {transactions
        ?.sort((a, b) => +b.timestamp - +a.timestamp)
        .map((txn) => (
          <Transaction
            walletName={wallet?.nickname}
            key={txn.txn_id}
            txn={txn}
          />
        ))}
    </>
  );
};

export default TransactionsController;
