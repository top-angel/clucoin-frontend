import React from "react";

const Remove = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 2L14 14M14 2L2 14" stroke="#676679" strokeWidth="3" />
    </svg>
  );
};

export default Remove;
