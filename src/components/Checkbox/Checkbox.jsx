import React from "react";

import InputLabel from "../InputLabel/InputLabel";

/**
 * General component which renders a checkbox
 */
const Checkbox = (props) => {
  const { inputConfig, fieldProps, className } = props;
  const elemName = inputConfig.name;

  return (
    <div className={className || inputConfig.className}>
      <div className="form-check">
        <input
          type="checkbox"
          id={inputConfig.id || elemName}
          name={elemName}
          value={fieldProps.values[elemName]}
          checked={fieldProps.values[elemName] || false}
          onChange={fieldProps.handleChange}
          onBlur={fieldProps.handleBlur}
          className="form-check-input"
          {...inputConfig.other}
        />
        <InputLabel
          labelFor={elemName}
          labelText={inputConfig.labelText}
          className="form-check-label"
        />
      </div>
    </div>
  );
};

export default Checkbox;
