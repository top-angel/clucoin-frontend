import React from "react";
import Spinner from "./Spinner";

import classNames from "classnames";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<Props> = ({
  disabled,
  children,
  loading,
  className,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      {...props}
      className={classNames("button", className)}
    >
      {loading && <Spinner />}
      {!loading && children}
    </button>
  );
};

export default Button;
