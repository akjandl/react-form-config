import React from "react";

import FormElement from "../FormElement/FormElement";
import { keyFromFieldConfig } from "../../forms/formUtils";
import { FieldKit } from "../../forms/formUtils";
import { FieldConfigBundle } from "../../forms/inputConfigs";

interface FormGroupProps {
  fieldConfigs: FieldConfigBundle;
  fieldKit: FieldKit;
}

const FormGroup = (props: FormGroupProps) => {
  const fieldConfigsArray = Object.values(props.fieldConfigs);
  const elements = fieldConfigsArray.map((inputConfig) => (
    <FormElement
      key={keyFromFieldConfig(inputConfig)}
      fieldConfig={inputConfig}
      fieldKit={props.fieldKit}
    />
  ));

  return <React.Fragment>{elements}</React.Fragment>;
};

export default FormGroup;
