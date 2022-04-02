import { FieldKit } from "../../forms/formUtils";
import {
  FieldConfigAny,
} from "../../forms/inputConfigs";

export interface FormElementProps {
  fieldConfig: FieldConfigAny;
  fieldKit: FieldKit;
  className?: string;
}

const FormElement: (props: FormElementProps) => JSX.Element = (props) => {
  const { fieldConfig, fieldKit, className } = props;

  const fieldConfigObject =
    typeof fieldConfig === "function"
      ? fieldConfig(fieldKit.values)
      : fieldConfig;

  const Component = fieldConfigObject.Component;

  return (
    <Component
      fieldConfig={fieldConfigObject.config}
      fieldKit={fieldKit}
      className={className}
    />
  );
};

export default FormElement;
