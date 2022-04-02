import InputLabel from "../InputLabel/InputLabel";
import { FormElementProps } from "../FormElement/FormElement";
import { FieldConfigObject, INPUT } from "../../forms/inputConfigs";

export interface InputFieldConfig extends FieldConfigObject {
  type: typeof INPUT;
  labelText: string;
  className: string;
  inputType: "text" | "number";
  other?: object;
}

/**
 * General component which can render either a text or number input, with label,
 * depending on the configuration provided.
 */
const Input = (props: FormElementProps<InputFieldConfig>) => {
  const { className, fieldConfig, fieldKit } = props;

  const elemName = fieldConfig.name;
  const validationError = fieldKit.errors[elemName];

  return (
    <div className={className || fieldConfig.className}>
      <InputLabel
        labelFor={elemName}
        labelText={fieldConfig.labelText}
        className="mt-2 mb-1 text-nowrap"
      />
      <input
        type={fieldConfig.inputType}
        id={fieldConfig.id || elemName}
        name={elemName}
        value={fieldKit.values[elemName]}
        onChange={fieldKit.handleChange}
        onBlur={fieldKit.handleBlur}
        className="form-control"
        {...fieldConfig.other}
      />
      {validationError && fieldKit.touched[elemName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Input;
