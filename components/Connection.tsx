import React from "react";
import { WithAuth } from "./withAuth";
import ConnectionButton from "./ConnectionButton";

interface Props {
  title: string;
  username: string;
  connected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  onReloadClick: () => void;
  onRemoveClick: () => void;
}

const Connection = ({ title, icon, ...props }: Props) => {
  return (
    <WithAuth>
      <div className="connection">
        <span>{title}</span>
        {icon}
      </div>
      <ConnectionButton {...props} />
    </WithAuth>
  );
};

export default Connection;
