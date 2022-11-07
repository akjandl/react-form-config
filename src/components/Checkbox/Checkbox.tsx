import { FieldConfigBase, FieldProps } from "../../FormBuilder";
import InputLabel from "../InputLabel/InputLabel";

export interface CheckboxConfig extends FieldConfigBase {
  label: string | JSX.Element;
  other?: object;
  className?: string;
}

/**
 * General component which renders a checkbox
 */
const Checkbox = (props: FieldProps<CheckboxConfig>) => {
  const { fieldName, fieldConfig, fieldKit, className } = props;

  return (
    <div className={className || fieldConfig.className}>
      <div className="form-check">
        <input
          type="checkbox"
          id={fieldConfig.id || fieldName}
          name={fieldName}
          value={fieldKit.values[fieldName]}
          checked={fieldKit.values[fieldName] || false}
          onChange={fieldKit.handleChange}
          onBlur={fieldKit.handleBlur}
          className="form-check-input"
          {...fieldConfig.other}
        />
        <InputLabel
          labelFor={fieldName}
          labelText={fieldConfig.label}
          className="form-check-label"
        />
      </div>
    </div>
  );
};

export default Checkbox;
