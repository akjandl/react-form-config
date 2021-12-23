import React from "react";

import FormElement from "../FormElement/FormElement";
import { keyFromInputConfig } from "../../forms/formUtils";

const FormGroup = (props) => {
  const inputConfigsArray = Object.values(props.inputConfigs);
  return inputConfigsArray.map((inputConfig) => (
    <FormElement
      key={keyFromInputConfig(inputConfig)}
      inputConfig={inputConfig}
      fieldProps={props.fieldProps}
    />
  ));
};

export default FormGroup;
