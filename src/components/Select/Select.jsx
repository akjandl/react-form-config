import React from "react";

import InputLabel from "../InputLabel/InputLabel";

/**
 * General component which renders a labeled select input
 */
const Select = (props) => {
  const {
    inputConfig,
    value,
    validationError,
    touched,
    handleChange,
    handleBlur,
    className,
  } = props;
  const elemName = inputConfig.name;

  return (
    <div className={className || inputConfig.divClass}>
      <InputLabel
        labelFor={elemName}
        labelText={inputConfig.labelText}
        className="mt-2 mb-1 text-nowrap"
      />
      <select
        id={inputConfig.id || elemName}
        name={elemName}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-select"
        {...inputConfig.other}
      >
        {inputConfig.options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.displayValue}
          </option>
        ))}
      </select>
      {validationError && touched ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Select;
