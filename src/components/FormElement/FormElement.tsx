import { FieldKit } from "../../forms/formUtils";
import {
  FieldConfigAny,
  FIELD_TYPE_TO_COMPONENT,
  FieldConfigBase,
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

  const cfg: FieldConfigBase =
    typeof fieldConfig === "function"
      ? fieldConfig(fieldKit.values)
      : fieldConfig;

  const Component = FIELD_TYPE_TO_COMPONENT[cfg.type];

  return (
    <Component inputConfig={cfg} fieldProps={fieldKit} className={className} />
  );
};

export default FormElement;
