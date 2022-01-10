import React from "react";

import { Wallet } from "../types";
import { useWalletReflections } from "../hooks/useReflections";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import Spinner from "./Spinner";

interface Props {
  price: number;
  wallet: Wallet;
  balance: number;
}

const ShortReflections = ({ wallet, balance, price }: Props) => {
  const [reflections, loading] = useWalletReflections(wallet, true);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="CluEarned">
        <p className="ValueEarned">
          +
          {(+(balance - reflections[reflections.length - 1].balance).toFixed(
            2
          ))?.toLocaleString("en-US")}{" "}
          CLU
          <span className="ValueText">
            $
            {parseFloat(
              (
                (balance - reflections[reflections.length - 1].balance) *
                price
              ).toFixed(2)
            )?.toLocaleString("en-US")}
          </span>
        </p>
      </div>
      <ResponsiveContainer height="50%" width="100%">
        <LineChart
          data={reflections
            .map((reflection) => ({
              ...reflection,
              timestamp: new Date(reflection.timestamp)
                .toISOString()
                .substr(11, 8),
            }))
            .reverse()}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <Tooltip />
          <XAxis dataKey="timestamp" />
          <Line
            type="monotone"
            dataKey="reflection"
            stroke="#EF008E"
            strokeWidth="4px"
            dot={{
              stroke: "#EC008C",
              fill: "#EC008C",
              strokeWidth: 8,
              r: 2,
              strokeDasharray: "",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ShortReflections;
