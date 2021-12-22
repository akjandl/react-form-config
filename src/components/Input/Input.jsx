import React from "react";

import InputLabel from "../InputLabel/InputLabel";

/**
 * General component which can render either a text or number input, with label,
 * depending on the configuration provided.
 */
const Input = (props) => {
  const { className, inputConfig, fieldProps } = props;

  const elemName = inputConfig.name;
  const validationError = fieldProps.errors[elemName];

  return (
    <div className={className || inputConfig.className}>
      <InputLabel
        labelFor={elemName}
        labelText={inputConfig.labelText}
        className="mt-2 mb-1 text-nowrap"
      />
      <input
        type={inputConfig.type}
        id={inputConfig.id || elemName}
        name={elemName}
        value={fieldProps.values[elemName]}
        onChange={fieldProps.handleChange}
        onBlur={fieldProps.handleBlur}
        className="form-control"
        {...inputConfig.other}
      />
      {validationError && fieldProps.touched[elemName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Input;
