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

interface IFormElement<FC extends FieldConfigAny> {
  (props: FormElementProps<FC>): JSX.Element;
}

const FormElement: IFormElement<FieldConfigAny> = (props) => {
  const { fieldConfig, fieldKit, className } = props;

  const cfg: FieldConfigObject =
    typeof fieldConfig === "function"
      ? fieldConfig(fieldKit.values)
      : fieldConfig;

  const Component = FIELD_TYPE_TO_COMPONENT[
    cfg.type
  ] as IFormElement<FieldConfigObject>;

  return (
    <Component fieldConfig={cfg} fieldKit={fieldKit} className={className} />
  );
};

export default FormElement;
