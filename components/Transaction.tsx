import React, { useMemo } from "react";
import { Transaction } from "../types";

type Props = {
  txn: Transaction;
  walletName: string;
};

const TransactionComponent = ({ txn, walletName }: Props) => {
  const date = useMemo(() => new Date(+txn.timestamp * 1000), [txn]);
  const type = useMemo(() => {
    if (txn.type == "buy") {
      return "Buy";
    } else if (txn.type == "sell") {
      return "Sell";
    } else if (txn.type == "t_in") {
      return "Transfer In";
    } else if (txn.type == "t_out") {
      return "Transfer Out";
    } else {
      return "Unknown";
    }
  }, [txn]);

  return (
    <div className="TransactionLog">
      <div className="TransactionsDate">
        <p className="Date">{date.toDateString()}</p>
      </div>
      <div className="Transaction">
        <div className="Actions">
          <p className="ActionName">{type}</p>
          <p className="CoinName">CLU</p>
        </div>
        <div className="ActionsResults">
          <p
            className={
              txn.type == "buy" || txn.type == "t_in"
                ? "ActionValue Plus"
                : "ActionValue Minus"
            }
          >
            <strong>
              {type === "Buy" || type == "Transfer In" ? "+" : "-"}
              {(+txn.value?.toFixed(2))?.toLocaleString("en-US")}
            </strong>
          </p>
          <a
            href={`https://bscscan.com/tx/${txn.txn_id}`}
            rel="noreferrer"
            target="_blank"
            className="link"
          >
            View transaction
          </a>
        </div>
      </div>
    </div>
  );
};

export default TransactionComponent;
