import InputLabel from "../InputLabel/InputLabel";
import { FormComponentProps, FieldConfig } from "../../forms/fieldConfigs";

export interface SelectFieldConfig extends FieldConfig {
  labelText: string;
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
const Select = (props: FormComponentProps<SelectFieldConfig>) => {
  const { fieldConfig, fieldKit, className } = props;
  const elemName = fieldConfig.name;
  const validationError = fieldKit.errors[elemName];

  return (
    <div className={className || fieldConfig.className}>
      <InputLabel
        labelFor={elemName}
        labelText={fieldConfig.labelText}
        className="mt-2 mb-1 text-nowrap"
      />
      <select
        id={fieldConfig.id || elemName}
        name={elemName}
        value={fieldKit.values[elemName]}
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
      {validationError && fieldKit.touched[elemName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default Select;
