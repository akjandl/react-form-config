import React from "react";

const Field = (props) => {
  const { inputConfig, fieldProps } = props;

  const cfg =
    typeof inputConfig === "function"
      ? inputConfig(fieldProps.values)
      : inputConfig;
  const inputName = cfg.name;

  return (
    <cfg.component
      inputConfig={cfg}
      value={fieldProps.values[inputName]}
      validationError={fieldProps.errors[inputName]}
      touched={fieldProps.touched[inputName]}
      handleChange={fieldProps.handleChange}
      handleBlur={fieldProps.handleBlur}
    />
  );
};

export default Field;
