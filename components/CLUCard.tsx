import React from "react";
import CluWallet from "../icons/CluWallet";

const CLUCard = () => {
  return (
    <div className="CluCard">
      <div className="Card">
        <div className="CardHeader">
          <div className="EmptyBox"></div>
          <div className="CluLogo">
            <CluWallet />
            <span className="CluName">CLU</span>
          </div>
        </div>
        <div className="CardBody">
          <p>1234</p>
          <p>5678</p>
          <p>9101</p>
          <p>2345</p>
        </div>
        <div className="CardFooter">
          <div className="CirclesCard"></div>
        </div>
      </div>
      <p className="ComingSoon">Coming Soon</p>
    </div>
  );
};

export default CLUCard;
