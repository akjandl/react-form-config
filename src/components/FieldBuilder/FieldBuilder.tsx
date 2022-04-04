import { FieldKit } from "../../forms/formUtils";
import { FieldInstructionAny } from "../../forms/fieldInstructions";

interface FieldBuilderProps {
  fieldInstructionAny: FieldInstructionAny;
  fieldKit: FieldKit;
  className?: string;
}

const FieldBuilder: (props: FieldBuilderProps) => JSX.Element = (props) => {
  const { fieldInstructionAny, fieldKit, className } = props;

  const fieldInstruction =
    typeof fieldInstructionAny === "function"
      ? fieldInstructionAny(fieldKit.values, fieldKit)
      : fieldInstructionAny;

  const Component = fieldInstruction.Component;

  return (
    <Component
      fieldConfig={fieldInstruction.config}
      fieldKit={fieldKit}
      className={className}
    />
  );
};

export default FieldBuilder;
