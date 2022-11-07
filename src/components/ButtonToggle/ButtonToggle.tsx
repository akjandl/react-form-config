import InputLabel from "../InputLabel/InputLabel";
import { FieldProps, FieldConfig } from "../../forms/fieldInstructions";

export interface ButtonToggleConfig extends FieldConfig {
  labelText: string;
  buttonConfigs: ButtonConfig[];
  className?: string;
}

interface ButtonConfig {
  divClassName: string;
  value: any;
  text: string;
  buttonType?: "button" | "submit";
}

const ButtonToggle: (props: FieldProps<ButtonToggleConfig>) => JSX.Element = (
  props
) => {
  const { fieldName, fieldConfig, fieldKit, className } = props;

  const { buttonConfigs } = fieldConfig;
  const validationError = fieldKit.errors[fieldName];

  const clickHandler = (name: string, value: any) => {
    fieldKit.setFieldValue(name, value);
  };

  return (
    <div className={className || fieldConfig.className}>
      <div className="row">
        <InputLabel
          labelFor={fieldName}
          labelText={fieldConfig.labelText}
          className="mt-2 mb-1 text-nowrap"
        />
        <div className="col-12">
          <div className="row" onBlur={fieldKit.handleBlur(fieldName)}>
            {buttonConfigs.map((btnConfig: ButtonConfig) => {
              return (
                <div
                  key={`${fieldName}${btnConfig.text}${btnConfig.value}`}
                  className={btnConfig.divClassName}
                >
                  <button
                    type={btnConfig.buttonType || "button"}
                    onClick={() => clickHandler(fieldName, btnConfig.value)}
                    className={`btn ${
                      btnConfig.value === fieldKit.values[fieldName]
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                  >
                    {btnConfig.text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {validationError && fieldKit.touched[fieldName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default ButtonToggle;
