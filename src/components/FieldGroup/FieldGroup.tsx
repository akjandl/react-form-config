import React from "react";

import FieldBuilder from "../FieldBuilder/FieldBuilder";
import { keyFromFieldConfig } from "../../forms/formUtils";
import { FieldKit } from "../../forms/formUtils";
import { FieldInstructionBundle } from "../../forms/fieldInstructions";

interface FieldGroupProps {
  fieldInstructionBundle: FieldInstructionBundle;
  fieldKit: FieldKit;
}

const FieldGroup = (props: FieldGroupProps) => {
  const fieldInstructionArray = Object.values(props.fieldInstructionBundle);
  const elements = fieldInstructionArray.map((inputConfig) => (
    <FieldBuilder
      key={keyFromFieldConfig(inputConfig)}
      fieldInstructionAny={inputConfig}
      fieldKit={props.fieldKit}
    />
  ));

  return <React.Fragment>{elements}</React.Fragment>;
};

export default FieldGroup;
