import React from "react";

const inputRegex = /^[0-9]*[.,]?[0-9]*$/;

const NumericInput = ({
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  onChange?: (value: string) => void;
}) => {
  const handleChange = (v) => {
    if (v == "" || inputRegex.test(v)) {
      onChange && onChange(v);
    }
  };

  return (
    <input
      {...props}
      onChange={(event) => {
        handleChange(event.target.value.replace(/,/g, "."));
      }}
      placeholder={props.placeholder ?? "0.0"}
      minLength={1}
      maxLength={76}
      pattern="^[0-9]*[.,]?[0-9]*$"
      spellCheck={"false"}
    ></input>
  );
};

export default NumericInput;
