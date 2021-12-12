import React from "react";

import InputLabel from "../InputLabel/InputLabel";

/**
 * General component which can render either a text or number input, with label,
 * depending on the configuration provided.
 */
const Input = (props) => {
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
      <input
        type={inputConfig.type}
        id={inputConfig.id || elemName}
        name={elemName}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="form-control"
        {...inputConfig.other}
      />
      {validationError && touched ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Input;
