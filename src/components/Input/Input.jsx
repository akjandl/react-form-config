import React from "react";

import InputLabel from "../InputLabel/InputLabel";

/**
 * General component which can render several types of inputs
 * depending on the configuration provided. Possible inputs types
 * include [text, number, select].
 */
const input = (props) => {
  const {
    inputConfig,
    value,
    validationError,
    touched,
    handleChange,
    handleBlur,
  } = props;
  const elemName = inputConfig.name;

  return (
    <div className={inputConfig.divClass}>
      <InputLabel
        labelFor={elemName}
        labelText={inputConfig.labelText}
        className="mt-2 mb-1 text-nowrap"
      />
      {inputConfig.type !== "select" ? (
        <input
          type={inputConfig.type}
          id={elemName}
          name={elemName}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-control"
          {...inputConfig.other}
        />
      ) : (
        <select
          id={inputConfig.id}
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
      )}
      {validationError && touched ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default input;
