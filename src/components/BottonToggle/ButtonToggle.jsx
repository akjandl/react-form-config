import React from "react";

import InputLabel from "../InputLabel/InputLabel";

const ButtonToggle = (props) => {
  const { inputConfig, fieldProps, className } = props;

  const { buttonConfigs } = inputConfig;
  const elemName = inputConfig.name;
  const validationError = fieldProps.errors[elemName];

  const clickHandler = (name, value) => {
    fieldProps.setFieldValue(name, value);
  };

  return (
    <div className={className || inputConfig.className}>
      <div className="row">
        <InputLabel
          labelFor={elemName}
          labelText={inputConfig.labelText}
          className="mt-2 mb-1 text-nowrap"
        />
        <div className="col-12">
          <div className="row" onBlur={fieldProps.handleBlur(elemName)}>
            {buttonConfigs.map((btnConfig) => {
              return (
                <div
                  key={`${elemName}${btnConfig.text}${btnConfig.value}`}
                  className={btnConfig.divClassName}
                >
                  <button
                    type={btnConfig.buttonType || "button"}
                    onClick={() => clickHandler(elemName, btnConfig.value)}
                    className={`btn ${
                      btnConfig.value === fieldProps.values[elemName]
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                  >
                    {btnConfig.text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {validationError && fieldProps.touched[elemName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default ButtonToggle;
