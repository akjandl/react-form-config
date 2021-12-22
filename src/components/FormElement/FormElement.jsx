import React from "react";

const FormElement = (props) => {
  const { inputConfig, fieldProps } = props;

  const cfg =
    typeof inputConfig === "function"
      ? inputConfig(fieldProps.values)
      : inputConfig;

  return (
    <cfg.component
      inputConfig={cfg}
      fieldProps={fieldProps}
    />
  );
};

export default FormElement;
