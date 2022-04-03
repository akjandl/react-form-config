import React from "react";

import FormElement from "../FormElement/FormElement";
import { keyFromFieldConfig } from "../../forms/formUtils";
import { FieldKit } from "../../forms/formUtils";
import { FieldInstructionBundle } from "../../forms/fieldConfigs";

interface FormGroupProps {
  fieldInstructionBundle: FieldInstructionBundle;
  fieldKit: FieldKit;
}

const FormGroup = (props: FormGroupProps) => {
  const fieldInstructionArray = Object.values(props.fieldInstructionBundle);
  const elements = fieldInstructionArray.map((inputConfig) => (
    <FormElement
      key={keyFromFieldConfig(inputConfig)}
      fieldInstructionAny={inputConfig}
      fieldKit={props.fieldKit}
    />
  ));

  return <React.Fragment>{elements}</React.Fragment>;
};

export default FormGroup;
