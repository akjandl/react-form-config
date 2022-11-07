import InputLabel from "../InputLabel/InputLabel";
import { FieldProps, FieldConfigBase } from "../../FormBuilder";

export interface SelectConfig extends FieldConfigBase {
  label: string;
  options: {
    value: string | number;
    displayValue: string;
    disabled?: boolean;
  }[];
  className?: string;
  other?: object;
}

/**
 * General component which renders a labeled select input
 */
const Select = (props: FieldProps<SelectConfig>) => {
  const { fieldName, fieldConfig, fieldKit, className } = props;
  const validationError = fieldKit.errors[fieldName];

  return (
    <div className={className || fieldConfig.className}>
      <InputLabel
        labelFor={fieldName}
        labelText={fieldConfig.label}
        className="mt-2 mb-1 text-nowrap"
      />
      <select
        id={fieldConfig.id || fieldName}
        name={fieldName}
        value={fieldKit.values[fieldName]}
        onChange={fieldKit.handleChange}
        onBlur={fieldKit.handleBlur}
        className="form-select"
        {...fieldConfig.other}
      >
        {fieldConfig.options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.displayValue}
          </option>
        ))}
      </select>
      {validationError && fieldKit.touched[fieldName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Select;
