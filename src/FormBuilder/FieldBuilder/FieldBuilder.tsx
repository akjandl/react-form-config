import { FieldInstructionAny, FieldKit } from "../index";
import { useFormBuilderContext } from "../FormBuilderContext";

interface FieldBuilderProps {
  fieldName: string;
  fieldInstructionAny: FieldInstructionAny;
  fieldKit?: FieldKit;
  className?: string;
}

const FieldBuilder: (props: FieldBuilderProps) => JSX.Element = (props) => {
  const { fieldName, fieldInstructionAny, className } = props;
  const formContext = useFormBuilderContext();
  const fieldKit = props.fieldKit ? props.fieldKit : formContext.fieldKit;

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
