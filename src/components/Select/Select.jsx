import React from "react";

import InputLabel from "../InputLabel/InputLabel";

/**
 * General component which renders a labeled select input
 */
const Select = (props) => {
  const { inputConfig, fieldProps, className } = props;
  const elemName = inputConfig.name;
  const validationError = fieldProps.errors[elemName];

  return (
    <div className={className || inputConfig.className}>
      <InputLabel
        labelFor={elemName}
        labelText={inputConfig.labelText}
        className="mt-2 mb-1 text-nowrap"
      />
      <select
        id={inputConfig.id || elemName}
        name={elemName}
        value={fieldProps.values[elemName]}
        onChange={fieldProps.handleChange}
        onBlur={fieldProps.handleBlur}
        className="form-select"
        {...inputConfig.other}
      >
        {inputConfig.options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.displayValue}
          </option>
        ))}
      </select>
      {validationError && fieldProps.touched[elemName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Select;
