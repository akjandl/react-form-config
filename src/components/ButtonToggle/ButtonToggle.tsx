import InputLabel from "../InputLabel/InputLabel";
import { FieldProps, FieldConfig } from "../../forms/fieldConfigs";

export interface ButtonToggleFieldConfig extends FieldConfig {
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

const ButtonToggle: (
  props: FieldProps<ButtonToggleFieldConfig>
) => JSX.Element = (props) => {
  const { fieldConfig, fieldKit, className } = props;

  const { buttonConfigs } = fieldConfig;
  const elemName = fieldConfig.name;
  const validationError = fieldKit.errors[elemName];

  const clickHandler = (name: string, value: any) => {
    fieldKit.setFieldValue(name, value);
  };

  return (
    <div className={className || fieldConfig.className}>
      <div className="row">
        <InputLabel
          labelFor={elemName}
          labelText={fieldConfig.labelText}
          className="mt-2 mb-1 text-nowrap"
        />
        <div className="col-12">
          <div className="row" onBlur={fieldKit.handleBlur(elemName)}>
            {buttonConfigs.map((btnConfig: ButtonConfig) => {
              return (
                <div
                  key={`${elemName}${btnConfig.text}${btnConfig.value}`}
                  className={btnConfig.divClassName}
                >
                  <button
                    type={btnConfig.buttonType || "button"}
                    onClick={() => clickHandler(elemName, btnConfig.value)}
                    className={`btn ${
                      btnConfig.value === fieldKit.values[elemName]
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
      {validationError && fieldKit.touched[elemName] ? (
        <div style={{ color: "red" }}>{validationError}</div>
      ) : null}
    </div>
  );
};

export default ButtonToggle;
