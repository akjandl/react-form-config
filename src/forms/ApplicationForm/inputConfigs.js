import * as yup from "yup";

import Checkbox from "../../components/Checkbox/Checkbox";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";

/**
 * Configuration definitions for form inputs.
 */

// TODO: updated `divClass` attributes to be responsive

export const firstName = {
  name: "firstName",
  component: Input,
  labelText: "First Name",
  type: "text",
  divClass: "col-5",
  validator: yup.string().required("Required"),
};

export const middleInitial = {
  name: "middleInitial",
  component: Input,
  labelText: "Middle Initial",
  type: "text",
  divClass: "col-2",
  validator: yup.string().max(1, "Max 1 character"),
};

export const lastName = {
  name: "lastName",
  component: Input,
  labelText: "Last Name",
  type: "text",
  divClass: "col-5",
  validator: yup.string().required("Required"),
};

export const streetAddr = {
  name: "streetAddr",
  component: Input,
  labelText: "Street Address",
  type: "text",
  divClass: "col-10",
  validator: yup.string().required("Required").min(5, "Min 5 characters"),
};

export const city = {
  name: "city",
  component: Input,
  labelText: "City",
  type: "text",
  divClass: "col-6",
  validator: yup.string().required("Required").min(5, "Min 5 characters"),
};

export const state = {
  name: "state",
  component: Input,
  labelText: "State",
  type: "text",
  divClass: "col-2",
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
  divClass: "col-2",
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
  divClass: "col-6",
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
  divClass: "col-6",
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
    divClass: "col-12",
    initialValue: false,
  };
};
