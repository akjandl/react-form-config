import { FieldKit } from "../formUtils";
import { FieldInstructionAny } from "../../forms/fieldInstructions";

interface FieldBuilderProps {
  fieldName: string;
  fieldInstructionAny: FieldInstructionAny;
  fieldKit: FieldKit;
  className?: string;
}

const FieldBuilder: (props: FieldBuilderProps) => JSX.Element = (props) => {
  const { fieldName, fieldInstructionAny, fieldKit, className } = props;

  const fieldInstruction =
    typeof fieldInstructionAny === "function"
      ? fieldInstructionAny(fieldKit.values, fieldKit)
      : fieldInstructionAny;

  const Component = fieldInstruction.Component;

  return (
    <Component
      fieldName={fieldName}
      fieldConfig={fieldInstruction.config}
      fieldKit={fieldKit}
      className={className}
    />
  );
};

export default FieldBuilder;
