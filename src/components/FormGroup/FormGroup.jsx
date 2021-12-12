import React from "react";

import FormElement from "../FormElement/FormElement";
import { keyFromInputConfig } from "../../forms/formUtils";

const FormGroup = (props) => {
  return props.inputConfigs.map((inputConfig) => (
    <FormElement
      key={keyFromInputConfig(inputConfig)}
      inputConfig={inputConfig}
      fieldProps={props.fieldProps}
    />
  ));
};

export default FormGroup;
