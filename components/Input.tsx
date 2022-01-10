import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = ({ error, className, ...props }: Props) => {
  return (
    <div className="input-field">
      <input
        {...props}
        className={`${className} input ${!!error ? "error" : ""}`}
      />
      <span className="error">{error && error}</span>
    </div>
  );
};

export default Input;
