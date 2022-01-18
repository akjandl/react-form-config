import { FieldConfigBase, CHECKBOX } from "../../forms/inputConfigs";
import { FormElementProps } from "../FormElement/FormElement";
import InputLabel from "../InputLabel/InputLabel";

export interface CheckboxFieldConfig extends FieldConfigBase {
  type: typeof CHECKBOX;
  labelText: string;
  other?: object;
  className?: string;
}

/**
 * General component which renders a checkbox
 */
const Checkbox = (props: FormElementProps<CheckboxFieldConfig>) => {
  const { fieldConfig, fieldKit, className } = props;
  const elemName = fieldConfig.name;

  return (
    <div className={className || fieldConfig.className}>
      <div className="form-check">
        <input
          type="checkbox"
          id={fieldConfig.id || elemName}
          name={elemName}
          value={fieldKit.values[elemName]}
          checked={fieldKit.values[elemName] || false}
          onChange={fieldKit.handleChange}
          onBlur={fieldKit.handleBlur}
          className="form-check-input"
          {...fieldConfig.other}
        />
        <InputLabel
          labelFor={elemName}
          labelText={fieldConfig.labelText}
          className="form-check-label"
        />
      </div>
    </div>
  );
};

export default Checkbox;
