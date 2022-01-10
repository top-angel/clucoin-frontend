import React from "react";
import Spinner from "./Spinner";

interface Props {
  data: any;
  title: any;
  loading?: boolean;
}

const AnalyticCard = ({ loading, data, title }: Props) => {
  return (
    <div className="Analytic">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p className="AnalyticValue">{data}</p>
          <p className="AnalyticDescription">{title}</p>
        </>
      )}
    </div>
  );
};

export default AnalyticCard;
