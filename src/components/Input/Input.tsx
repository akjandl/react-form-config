import InputLabel from "../InputLabel/InputLabel";
import { FieldProps, FieldConfig } from "../../forms/fieldInstructions";

export interface InputConfig extends FieldConfig {
  labelText: string | JSX.Element;
  className: string;
  inputType: "text" | "number";
  placeholder?: string;
  other?: object;
}

/**
 * General component which can render either a text or number input, with label,
 * depending on the configuration provided.
 */
const Input = (props: FieldProps<InputConfig>) => {
  const { fieldName, className, fieldConfig, fieldKit } = props;

  const validationError = fieldKit.errors[fieldName];

  return (
    <div className={className || fieldConfig.className}>
      <InputLabel
        labelFor={fieldName}
        labelText={fieldConfig.labelText}
        className="mt-2 mb-1 text-nowrap"
      />
      <input
        type={fieldConfig.inputType}
        id={fieldConfig.id || fieldName}
        name={fieldName}
        value={fieldKit.values[fieldName]}
        onChange={fieldKit.handleChange}
        onBlur={fieldKit.handleBlur}
        className="form-control"
        placeholder={fieldConfig.placeholder}
        {...fieldConfig.other}
      />
      {validationError && fieldKit.touched[fieldName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Input;
