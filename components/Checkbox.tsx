import React, { useCallback, useState } from "react";

interface Props {
  title?: string;
  value?: boolean;
  onChange?: (v: boolean) => void;
}

const Checkbox = (props: Props) => {
  const [value, setValue] = useState<boolean>(props.value);

  const handleClick = useCallback(() => {
    setValue(!value);
    props.onChange && props.onChange(!value);
  }, [value, props]);

  return (
    <div onClick={handleClick} className={`checkbox${value ? " active" : ""}`}>
      <input />
      <svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5 18C14.7467 18 19 13.9706 19 9C19 4.02944 14.7467 0 9.5 0C4.25329 0 0 4.02944 0 9C0 13.9706 4.25329 18 9.5 18Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default Checkbox;
