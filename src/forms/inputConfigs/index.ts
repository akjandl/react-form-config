import * as yup from "yup";

import ButtonToggle, {
  ButtonToggleFieldConfig,
} from "../../components/ButtonToggle/ButtonToggle";
import Checkbox, {
  CheckboxFieldConfig,
} from "../../components/Checkbox/Checkbox";
import { FormElementProps } from "../../components/FormElement/FormElement";
import Input, { InputFieldConfig } from "../../components/Input/Input";
import Select, { SelectFieldConfig } from "../../components/Select/Select";
import { FormValues } from "../formUtils";

export const INPUT = "INPUT";
export const SELECT = "SELECT";
export const BUTTON_TOGGLE = "BUTTON_TOGGLE";
export const CHECKBOX = "CHECKBOX";

export type FieldType =
  | typeof INPUT
  | typeof SELECT
  | typeof CHECKBOX
  | typeof BUTTON_TOGGLE;

export type FieldComponent =
  | typeof Input
  | typeof Select
  | typeof Checkbox
  | typeof ButtonToggle

export const FIELD_TYPE_TO_COMPONENT: {
  // [key in FieldType]: (props: FormElementProps<FieldConfigAny>) => JSX.Element;
  [key in FieldType]: FieldComponent;
} = {
  [INPUT]: Input,
  [SELECT]: Select,
  [CHECKBOX]: Checkbox,
  [BUTTON_TOGGLE]: ButtonToggle,
};

export interface FieldConfigBase {
  name: string;
  type: FieldType;
  validator:
    | yup.AnySchema
    | null
    | ((values: FormValues) => yup.AnySchema | null);
  initialValue?: any;
  id?: string;
}

export type FieldConfigObject =
  | InputFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | ButtonToggleFieldConfig;

export type FieldConfigFunc<ReturnType = FieldConfigObject> = (
  values: FormValues
) => ReturnType;

export type FieldConfigAny = FieldConfigObject | FieldConfigFunc;

export interface FieldConfigBundle {
  [key: string]: FieldConfigAny;
}

/**
 * Configuration definitions for form inputs.
 */

export const firstName: InputFieldConfig = {
  type: INPUT,
  name: "firstName",
  labelText: "First Name",
  inputType: "text",
  className: "col-5",
  validator: yup.string().required("Required"),
};

export const middleInitial: InputFieldConfig = {
  type: INPUT,
  name: "middleInitial",
  labelText: "Middle Initial",
  inputType: "text",
  className: "col-2",
  validator: yup.string().max(1, "Max 1 character"),
};

export const lastName: InputFieldConfig = {
  type: INPUT,
  name: "lastName",
  labelText: "Last Name",
  inputType: "text",
  className: "col-5",
  validator: yup.string().required("Required"),
};

export const streetAddr: InputFieldConfig = {
  type: INPUT,
  name: "streetAddr",
  labelText: "Street Address",
  inputType: "text",
  className: "col-10",
  validator: yup.string().required("Required").min(5, "Min 5 characters"),
};

export const city: InputFieldConfig = {
  type: INPUT,
  name: "city",
  labelText: "City",
  inputType: "text",
  className: "col-6",
  validator: yup.string().required("Required").min(5, "Min 5 characters"),
};

export const state: InputFieldConfig = {
  type: INPUT,
  name: "state",
  labelText: "State",
  inputType: "text",
  className: "col-2",
  validator: yup
    .string()
    .required("Required")
    .min(2, "Use 2 characters")
    .max(2, "Use 2 characters"),
};

export const yearsAtResidence: InputFieldConfig = {
  type: INPUT,
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
};

export const vehicleMake: SelectFieldConfig = {
  type: SELECT,
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
};

export const vehicleModel: SelectFieldConfig = {
  type: SELECT,
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
};

export const hasCoapplicant: FieldConfigFunc<CheckboxFieldConfig> = (
  values: FormValues
) => {
  return {
    type: CHECKBOX,
    name: "hasCoapplicant",
    labelText: "Has Co-Applicant",
    className: "col-12 mt-2",
    initialValue: false,
    validator: null,
  };
};

const buildCoapplicantValidator = (
  inputConfig: FieldConfigObject
): ((values: FormValues) => yup.AnySchema | null) => {
  return (values): yup.AnySchema | null => {
    return values.hasCoapplicant
      ? (inputConfig.validator as yup.AnySchema)
      : null; // allow anything
  };
};

export const coapplicantFirstName: InputFieldConfig = {
  ...firstName,
  name: "coapplicantFirstName",
  validator: buildCoapplicantValidator(firstName),
};

export const coapplicantMiddleInitial: InputFieldConfig = {
  ...middleInitial,
  name: "coapplicantMiddleInitial",
  validator: buildCoapplicantValidator(middleInitial),
};

export const coapplicantLastName: InputFieldConfig = {
  ...lastName,
  name: "coapplicantLastName",
  validator: buildCoapplicantValidator(lastName),
};

export const coapplicantStreetAddr: InputFieldConfig = {
  ...streetAddr,
  name: "coapplicantStreetAddr",
  validator: buildCoapplicantValidator(streetAddr),
};

export const coapplicantCity: InputFieldConfig = {
  ...city,
  name: "coapplicantCity",
  validator: buildCoapplicantValidator(city),
};

export const coapplicantState: InputFieldConfig = {
  ...state,
  name: "coapplicantState",
  validator: buildCoapplicantValidator(state),
};

export const coapplicantYearsAtResidence: InputFieldConfig = {
  ...yearsAtResidence,
  name: "coapplicantYearsAtResidence",
  validator: buildCoapplicantValidator(yearsAtResidence),
};

export const hasTradeIn: ButtonToggleFieldConfig = {
  type: BUTTON_TOGGLE,
  name: "hasTradeIn",
  labelText: "Has Trade In",
  validator: yup.boolean().required("Required"),
  initialValue: false,
  buttonConfigs: [
    { divClassName: "col-auto", value: false, text: "No" },
    { divClassName: "col-auto", value: true, text: "Yes" },
  ],
};
