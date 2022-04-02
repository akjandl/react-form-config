import * as yup from "yup";

import ButtonToggle, {
  ButtonToggleFieldConfig,
} from "../../components/ButtonToggle/ButtonToggle";
import Checkbox, {
  CheckboxFieldConfig,
} from "../../components/Checkbox/Checkbox";
import Input, { InputFieldConfig } from "../../components/Input/Input";
import Select, { SelectFieldConfig } from "../../components/Select/Select";
import { FormValues, FieldKit } from "../formUtils";

export interface FieldConfigObject<FC extends FieldConfig> {
  Component: (props: FormComponentProps<FC>) => JSX.Element;
  config: FC;
}

export interface FormComponentProps<FC extends FieldConfig> {
  fieldConfig: FC;
  fieldKit: FieldKit;
  className?: string;
}

export type FieldConfigFunc<FC extends FieldConfig> = (
  values: FormValues
) => FieldConfigObject<FC>;

export type FieldConfigAny = FieldConfigObject<any> | FieldConfigFunc<any>;

export interface FieldConfigBundle {
  [key: string]: FieldConfigAny;
}

export interface FieldConfig {
  type?: string;
  name: string;
  validator:
    | yup.AnySchema
    | null
    | ((values: FormValues) => yup.AnySchema | null);
  initialValue?: any;
  id?: string;
}

/**
 * Configuration definitions for form inputs.
 */

export const firstName: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "firstName",
    labelText: "First Name",
    inputType: "text",
    className: "col-5",
    validator: yup.string().required("Required"),
  },
};

export const middleInitial: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "middleInitial",
    labelText: "Middle Initial",
    inputType: "text",
    className: "col-2",
    validator: yup.string().max(1, "Max 1 character"),
  },
};

export const lastName: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "lastName",
    labelText: "Last Name",
    inputType: "text",
    className: "col-5",
    validator: yup.string().required("Required"),
  },
};

export const streetAddr: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "streetAddr",
    labelText: "Street Address",
    inputType: "text",
    className: "col-10",
    validator: yup.string().required("Required").min(5, "Min 5 characters"),
  },
};

export const city: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "city",
    labelText: "City",
    inputType: "text",
    className: "col-6",
    validator: yup.string().required("Required").min(5, "Min 5 characters"),
  },
};

export const state: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "state",
    labelText: "State",
    inputType: "text",
    className: "col-2",
    validator: yup
      .string()
      .required("Required")
      .min(2, "Use 2 characters")
      .max(2, "Use 2 characters"),
  },
};

export const yearsAtResidence: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "yearsAtResidence",
    labelText: "Years At Residence",
    inputType: "number",
    className: "col-2",
    other: {
      min: "0",
      step: "1",
      max: "99",
      noValidate: true,
    },
    validator: yup
      .number()
      .required("Required")
      .min(0, "Min 0")
      .max(99, "Max 99"),
  },
};

export const vehicleMake: FieldConfigObject<SelectFieldConfig> = {
  Component: Select,
  config: {
    name: "vehicleMake",
    labelText: "Vehicle Make",
    className: "col-6",
    options: [
      { value: "", displayValue: "", disabled: true },
      { value: "make_1", displayValue: "Make 1" },
      { value: "make_2", displayValue: "Make 2" },
      { value: "make_3", displayValue: "Make 3" },
    ],
    validator: yup.string().required("Required"),
  },
};

export const vehicleModel: FieldConfigObject<SelectFieldConfig> = {
  Component: Select,
  config: {
    name: "vehicleModel",
    labelText: "Vehicle Model",
    className: "col-6",
    options: [
      { value: "", displayValue: "", disabled: true },
      { value: "model_1", displayValue: "Model 1" },
      { value: "model_2", displayValue: "Model 2" },
      { value: "model_3", displayValue: "Model 3" },
    ],
    validator: yup.string().required("Required"),
  },
};

export const hasCoapplicant: FieldConfigFunc<CheckboxFieldConfig> = (
  values: FormValues
) => {
  return {
    Component: Checkbox,
    config: {
      name: "hasCoapplicant",
      labelText: "Has Co-Applicant",
      className: "col-12 mt-2",
      initialValue: false,
      validator: null,
    },
  };
};

const buildCoapplicantValidator = <FCP extends FieldConfig>(
  inputConfig: FieldConfigObject<FCP>
): ((values: FormValues) => yup.AnySchema | null) => {
  return (values) => {
    return values.hasCoapplicant
      ? (inputConfig.config.validator as yup.AnySchema)
      : null; // allow anything
  };
};

export const coapplicantFirstName: FieldConfigObject<InputFieldConfig> = {
  ...firstName,
  config: {
    ...firstName.config,
    name: "coapplicantFirstName",
    validator: buildCoapplicantValidator(firstName),
  },
};

export const coapplicantMiddleInitial: FieldConfigObject<InputFieldConfig> = {
  ...middleInitial,
  config: {
    ...middleInitial.config,
    name: "coapplicantMiddleInitial",
    validator: buildCoapplicantValidator(middleInitial),
  },
};

export const coapplicantLastName: FieldConfigObject<InputFieldConfig> = {
  ...lastName,
  config: {
    ...lastName.config,
    name: "coapplicantLastName",
    validator: buildCoapplicantValidator(lastName),
  },
};

export const coapplicantStreetAddr: FieldConfigObject<InputFieldConfig> = {
  ...streetAddr,
  config: {
    ...streetAddr.config,
    name: "coapplicantStreetAddr",
    validator: buildCoapplicantValidator(streetAddr),
  },
};

export const coapplicantCity: FieldConfigObject<InputFieldConfig> = {
  ...city,
  config: {
    ...city.config,
    name: "coapplicantCity",
    validator: buildCoapplicantValidator(city),
  },
};

export const coapplicantState: FieldConfigObject<InputFieldConfig> = {
  ...state,
  config: {
    ...state.config,
    name: "coapplicantState",
    validator: buildCoapplicantValidator(state),
  },
};

export const coapplicantYearsAtResidence: FieldConfigObject<InputFieldConfig> =
  {
    ...yearsAtResidence,
    config: {
      ...yearsAtResidence.config,
      name: "coapplicantYearsAtResidence",
      validator: buildCoapplicantValidator(yearsAtResidence),
    },
  };

export const hasTradeIn: FieldConfigObject<ButtonToggleFieldConfig> = {
  Component: ButtonToggle,
  config: {
    name: "hasTradeIn",
    labelText: "Has Trade In",
    validator: yup.boolean().required("Required"),
    initialValue: false,
    buttonConfigs: [
      { divClassName: "col-auto", value: false, text: "No" },
      { divClassName: "col-auto", value: true, text: "Yes" },
    ],
  },
};
