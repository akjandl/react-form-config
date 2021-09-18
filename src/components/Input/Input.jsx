import React from "react";

import InputLabel from "../InputLabel/InputLabel";

// TODO: update to handle `select` input dynamically
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
      {validationError && touched ? (
        <div style={{color: "red"}}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default input;

// {elemConf.component !== "select"
//   ? null
//   : elemConf.options.map((opt) => (
//       <option
//         value={opt.value}
//         key={opt.value}
//         selected={opt.selected || undefined}
//         disabled={opt.disabled || undefined}
//       >
//         {opt.displayValue}
//       </option>
//     ))}
