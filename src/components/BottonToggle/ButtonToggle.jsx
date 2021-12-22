import React from "react";

import InputLabel from "../InputLabel/InputLabel";

const ButtonToggle = (props) => {
  const { inputConfig, fieldProps, className } = props;

  const { buttonConfigs } = inputConfig;
  const elemName = inputConfig.name;

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
        {buttonConfigs.map((btnConfig) => {
          return (
            <div
              key={btnConfig.name}
              className={btnConfig.divClassName}
              onBlur={() => fieldProps.handleBlur(inputConfig.name)}
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
  );
};

export default ButtonToggle;
