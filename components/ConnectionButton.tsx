import React from "react";
import Remove from "../icons/Remove";
import Refresh from "../icons/Refresh";

interface Props {
  username: string;
  connected: boolean;
  onClick: () => void;
  onReloadClick: () => void;
  onRemoveClick: () => void;
}

const ConnectionButton = ({
  connected,
  username,
  onClick,
  onReloadClick,
  onRemoveClick,
}: Props) => {
  return (
    <div className="connection-button">
      <div
        className="button"
        onClick={() => {
          !connected && onClick();
        }}
      >
        {connected ? username : "Connect"}
      </div>
      {connected ? (
        <>
          <Refresh onClick={onReloadClick} />
          <Remove onClick={onRemoveClick} />
        </>
      ) : null}
    </div>
  );
};

export default ConnectionButton;
