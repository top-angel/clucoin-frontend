import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { AUTH_URI } from "../constants";
import { useWalletTransactions } from "../hooks/useTransaction";
import { useUser } from "../stores/useUser";
import { Wallet } from "../types";
import { snowflakeToDate, toUTC } from "../utils/date";
import Spinner from "./Spinner";

interface Props {
  price: number;
  limit: number;
  wallet: Wallet;
  balance: number;
}

const LongReflections = ({ balance, wallet, price, limit }: Props) => {
  const token = useUser((s) => s.token);
  const [transactions, txnLoading] = useWalletTransactions(wallet);

  const [error, setError] = useState();
  const [data, setData] =
    useState<{ timestamp: Date; reflections: number }[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      !token ||
      !wallet ||
      balance == null ||
      balance == undefined ||
      !transactions
    )
      return;

    setLoading(true);
    axios
      .get<{
        wallets: {
          address: string;
          balances: { balance: number; id: string }[];
        }[];
      }>(AUTH_URI + "/v1/users/@me/reflections", {
        headers: { Authorization: token },
        params: {
          limit,
        },
      })
      .then((res) => res.data.wallets)
      .then((d) => {
        const walletBalances: {
          address: string;
          balances: { balance: number; id: string }[];
        } = d.find((w) => w.address == wallet.address);

        if (!wallet) {
          return;
        }

        setData(
          walletBalances.balances.reverse().map((b, i, balances) => {
            const date = snowflakeToDate(b.id);
            const txns =
              i == 0
                ? []
                : transactions.filter((txn) => {
                    if (txn.type == "sell" || txn.type == "t_out") {
                      return false;
                    }

                    if (i == walletBalances.balances.length - 1) {
                      return (
                        snowflakeToDate(balances[i - 1].id).getTime() <
                          +txn.timestamp * 1000 && +txn.timestamp <= Date.now()
                      );
                    }

                    return (
                      snowflakeToDate(balances[i - 1].id).getTime() <
                        +txn.timestamp * 1000 &&
                      +txn.timestamp * 1000 <= date.getTime()
                    );
                  });

            const bought = !txns.length
              ? 0
              : txns.map((t) => t.value).reduce((a, b) => a + b);
            console.log(bought);

            return {
              reflections:
                i == balances.length - 1
                  ? balance - bought - b.balance
                  : balances[i + 1].balance - bought - b.balance,
              timestamp: date,
            };
          })
        );
      })
      .catch((e) => setError(e))
      .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, wallet, limit, transactions]);

  const total = useMemo(
    () =>
      data
        ? data?.reduce((a, b) => ({
            timestamp: new Date(),
            reflections: a.reflections + b.reflections,
          })).reflections
        : null,
    [data]
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Something unexpected happened</p>;
  }

  return (
    <>
      <div className="CluEarned">
        <p className="ValueEarned">
          +{total?.toLocaleString("en-US")} CLU
          <span className="ValueText">
            ${(total * price).toLocaleString("en-US", { maximumFractionDigits:9 })}
          </span>
        </p>
      </div>
      <ResponsiveContainer height="50%" width="100%">
        <LineChart
          data={data.map((reflection) => ({
            ...reflection,
            timestamp: reflection.timestamp.toISOString().substr(11, 8),
          }))}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <Tooltip />
          <XAxis dataKey="timestamp" />
          <Line
            type="monotone"
            dataKey="reflections"
            stroke="#EF008E"
            strokeWidth="4px"
            dot={{
              stroke: "#EC008C",
              fill: "#EC008C",
              strokeWidth: 5,
              r: 2,
              strokeDasharray: "",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LongReflections;
