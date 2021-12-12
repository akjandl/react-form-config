import React from "react";

import InputLabel from "../InputLabel/InputLabel";

/**
 * General component which renders a checkbox
 */
const Checkbox = (props) => {
  const { inputConfig, value, handleChange, handleBlur, className } = props;
  const elemName = inputConfig.name;

  return (
    <div className={className || inputConfig.divClass}>
      <div className="form-check">
        <input
          type="checkbox"
          id={inputConfig.id || elemName}
          name={elemName}
          value={value}
          checked={value || false}
          onChange={handleChange}
          onBlur={handleBlur}
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
