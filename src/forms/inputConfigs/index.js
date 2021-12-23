import * as yup from "yup";
import ButtonToggle from "../../components/BottonToggle/ButtonToggle";

import Checkbox from "../../components/Checkbox/Checkbox";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";

/**
 * Configuration definitions for form inputs.
 */

// TODO: updated `className` attributes to be responsive

export const firstName = {
  name: "firstName",
  component: Input,
  labelText: "First Name",
  type: "text",
  className: "col-5",
  validator: yup.string().required("Required"),
};

export const middleInitial = {
  name: "middleInitial",
  component: Input,
  labelText: "Middle Initial",
  type: "text",
  className: "col-2",
  validator: yup.string().max(1, "Max 1 character"),
};

export const lastName = {
  name: "lastName",
  component: Input,
  labelText: "Last Name",
  type: "text",
  className: "col-5",
  validator: yup.string().required("Required"),
};

export const streetAddr = {
  name: "streetAddr",
  component: Input,
  labelText: "Street Address",
  type: "text",
  className: "col-10",
  validator: yup.string().required("Required").min(5, "Min 5 characters"),
};

export const city = {
  name: "city",
  component: Input,
  labelText: "City",
  type: "text",
  className: "col-6",
  validator: yup.string().required("Required").min(5, "Min 5 characters"),
};

export const state = {
  name: "state",
  component: Input,
  labelText: "State",
  type: "text",
  className: "col-2",
  validator: yup
    .string()
    .required("Required")
    .min(2, "Use 2 characters")
    .max(2, "Use 2 characters"),
};

export const yearsAtResidence = {
  name: "yearsAtResidence",
  component: Input,
  labelText: "Years At Residence",
  type: "number",
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

export const vehicleMake = {
  name: "vehicleMake",
  component: Select,
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

export const vehicleModel = {
  name: "vehicleModel",
  component: Select,
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

export const hasCoapplicant = (values) => {
  return {
    name: "hasCoapplicant",
    component: Checkbox,
    labelText: "Has Co-Applicant",
    className: "col-12 mt-2",
    initialValue: false,
  };
};

const buildCoapplicantValidator = (inputConfig) => {
  return (values) => {
    return values.hasCoapplicant ? inputConfig.validator : null;
  };
};

export const coapplicantFirstName = {
  ...firstName,
  name: "coapplicantFirstName",
  validator: buildCoapplicantValidator(firstName),
};

export const coapplicantMiddleInitial = {
  ...middleInitial,
  name: "coapplicantMiddleInitial",
  validator: buildCoapplicantValidator(middleInitial),
};

export const coapplicantLastName = {
  ...lastName,
  name: "coapplicantLastName",
  validator: buildCoapplicantValidator(lastName),
};

export const coapplicantStreetAddr = {
  ...streetAddr,
  name: "coapplicantStreetAddr",
  validator: buildCoapplicantValidator(streetAddr),
};

export const coapplicantCity = {
  ...city,
  name: "coapplicantCity",
  validator: buildCoapplicantValidator(city),
};

export const coapplicantState = {
  ...state,
  name: "coapplicantState",
  validator: buildCoapplicantValidator(state),
};

export const coapplicantYearsAtResidence = {
  ...yearsAtResidence,
  name: "coapplicantYearsAtResidence",
  validator: buildCoapplicantValidator(yearsAtResidence),
};

export const hasTradeIn = {
  name: "hasTradeIn",
  component: ButtonToggle,
  labelText: "Has Trade In",
  validator: yup.boolean().required("Required"),
  initialValue: false,
  buttonConfigs: [
    {divClassName: "col-auto", value: false, text: "No"},
    {divClassName: "col-auto", value: true, text: "Yes"},
  ]
};