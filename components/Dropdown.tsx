import React, { useEffect } from "react";

interface Props {
  handler: (e) => void;
}

const Dropdown: React.FC<Props> = ({ handler, children }) => {
  useEffect(() => {
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [handler]);

  return <>{children}</>;
};

export default Dropdown;
