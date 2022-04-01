import { FieldKit } from "../../forms/formUtils";
import {
  FieldConfigAny,
  FIELD_TYPE_TO_COMPONENT,
  FieldConfigObject,
} from "../../forms/inputConfigs";

export interface FormElementProps<FC extends FieldConfigAny> {
  fieldConfig: FC;
  fieldKit: FieldKit;
  className?: string;
}

const FormElement: <FC extends FieldConfigAny>(
  props: FormElementProps<FC>
) => JSX.Element = (props) => {
  const { fieldConfig, fieldKit, className } = props;

  const cfg: FieldConfigObject =
    typeof fieldConfig === "function"
      ? fieldConfig(fieldKit.values)
      : fieldConfig;

  const Component = FIELD_TYPE_TO_COMPONENT[cfg.type] as any;  // TODO: figure out how to type this accurately

  return (
    <Component fieldConfig={cfg} fieldKit={fieldKit} className={className} />
  );
};

export default FormElement;
