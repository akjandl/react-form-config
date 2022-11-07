import React from "react";

import FieldBuilder from "../FieldBuilder/FieldBuilder";
import { FieldKit } from "../formUtils";
import { FieldInstructionBundle } from "../../forms/fieldInstructions";

interface FieldGroupProps {
  fieldInstructionBundle: FieldInstructionBundle;
  fieldKit: FieldKit;
}

const FieldGroup = (props: FieldGroupProps) => {
  const fieldNames = Object.keys(props.fieldInstructionBundle);
  const elements = fieldNames.map((fieldName) => {
    const inputConfig = props.fieldInstructionBundle[fieldName];
    return (
      <FieldBuilder
        key={fieldName}
        fieldName={fieldName}
        fieldInstructionAny={inputConfig}
        fieldKit={props.fieldKit}
      />
    );
  });

  return <React.Fragment>{elements}</React.Fragment>;
};

export default FieldGroup;
