import React, { useState } from "react";
import classNames from "classnames";

import { Wallet } from "../types";
import LongReflections from "../components/LongReflections";
import ShortReflections from "../components/ShortReflections";

interface Props {
  price: number;
  wallet: Wallet;
  balance: number;
}

const ReflectionsController = ({ wallet, price, balance }: Props) => {
  const [duration, setDuration] = useState(0);

  return (
    <div className={`Graph`}>
      <div className="GraphHeader">
        <p className="GraphHeading">Live Reflections</p>
        <div className="GraphSelectDate">
          <button
            onClick={() => setDuration(0)}
            className={classNames("GraphDate", duration == 0 && "Selected")}
          >
            5 Min
          </button>
          <button
            onClick={() => setDuration(24)}
            className={classNames("GraphDate", duration == 24 && "Selected")}
          >
            24 hour
          </button>
        </div>
      </div>
      {duration >= 24 ? (
        <LongReflections
          balance={balance}
          price={price}
          wallet={wallet}
          limit={duration}
        />
      ) : (
        <ShortReflections balance={balance} price={price} wallet={wallet} />
      )}
    </div>
  );
};

export default ReflectionsController;
