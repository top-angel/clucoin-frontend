import React from "react";
import Select from "react-select";
import tokens from "../utils/tokens";

export default function SearchDropdown(props) {
  const selectDropDownStyle = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "white" : "black",
      padding: 20,
    }),
    input: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: "30px",
      border: "2px solid #EF008E",
      background: "rgba(239, 0, 142, 0.1)",
      minHeight: "60px",
      cursor: "pointer",
      color: "#ffffff",
      padding: "15px 20px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <div className={`search-dropdown`}>
      <Select
        defaultValue={props.propDefaultValue}
        onChange={props.propOnChange}
        styles={selectDropDownStyle}
        value={props.value}
        options={Object.keys(tokens).map((t) => ({ label: t, value: t }))}
        placeholder={props.propPlaceholder}
      />
    </div>
  );
}
