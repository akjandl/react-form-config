import * as yup from "yup";

import ButtonToggle, {
  ButtonToggleConfig,
} from "../../components/ButtonToggle/ButtonToggle";
import Checkbox, { CheckboxConfig } from "../../components/Checkbox/Checkbox";
import Input, { InputConfig } from "../../components/Input/Input";
import Select, { SelectConfig } from "../../components/Select/Select";
import {
  FormValues,
  FieldConfig,
  FieldInstruction,
  FieldInstructionCreator,
} from "../../FormBuilder";

/**
 * Utility function for copying the validator of an applicant field, for the co-applicant,
 * on a joint application. Prevents validation of coapplicant fields when
 * the application is not joint.
 */
const buildCoapplicantValidator = <FC extends FieldConfig>(
  fieldInstruction: FieldInstruction<FC>
) => {
  return (values: FormValues) => {
    if (!values.hasCoapplicant) {
      return null; // no validation when no co-applicant
    }
    return typeof fieldInstruction.config.validator === "function"
      ? fieldInstruction.config.validator(values)
      : fieldInstruction.config.validator;
  };
};

// ********************************************************************
// * Instructions for form fields.
// ********************************************************************

export const firstName: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    label: "First Name",
    inputType: "text",
    className: "col-5",
    validator: yup.string().required("Required"),
  },
};

export const middleInitial: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    label: "Middle Initial",
    inputType: "text",
    className: "col-2",
    validator: yup.string().max(1, "Max 1 character"),
  },
};

export const lastName: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    label: "Last Name",
    inputType: "text",
    className: "col-5",
    validator: yup.string().required("Required"),
  },
};

export const streetAddr: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    label: "Street Address",
    inputType: "text",
    className: "col-10",
    validator: yup.string().required("Required").min(5, "Min 5 characters"),
  },
};

export const city: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    label: "City",
    inputType: "text",
    className: "col-6",
    validator: yup.string().required("Required").min(5, "Min 5 characters"),
  },
};

export const state: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    label: "State",
    inputType: "text",
    className: "col-2",
    validator: yup
      .string()
      .required("Required")
      .min(2, "Use 2 characters")
      .max(2, "Use 2 characters"),
  },
};

export const yearsAtResidence: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    label: "Years At Residence",
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

export const vehicleMake: FieldInstruction<SelectConfig> = {
  Component: Select,
  config: {
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

export const vehicleModel: FieldInstruction<SelectConfig> = {
  Component: Select,
  config: {
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

export const coapplicantFirstName: FieldInstruction<InputConfig> = {
  ...firstName,
  config: {
    ...firstName.config,
    validator: buildCoapplicantValidator(firstName),
  },
};

export const coapplicantMiddleInitial: FieldInstruction<InputConfig> = {
  ...middleInitial,
  config: {
    ...middleInitial.config,
    validator: buildCoapplicantValidator(middleInitial),
  },
};

export const coapplicantLastName: FieldInstruction<InputConfig> = {
  ...lastName,
  config: {
    ...lastName.config,
    validator: buildCoapplicantValidator(lastName),
  },
};

export const coapplicantStreetAddr: FieldInstruction<InputConfig> = {
  ...streetAddr,
  config: {
    ...streetAddr.config,
    validator: buildCoapplicantValidator(streetAddr),
  },
};

export const coapplicantCity: FieldInstruction<InputConfig> = {
  ...city,
  config: {
    ...city.config,
    validator: buildCoapplicantValidator(city),
  },
};

export const coapplicantState: FieldInstruction<InputConfig> = {
  ...state,
  config: {
    ...state.config,
    validator: buildCoapplicantValidator(state),
  },
};

export const coapplicantYearsAtResidence: FieldInstruction<InputConfig> = {
  ...yearsAtResidence,
  config: {
    ...yearsAtResidence.config,
    validator: buildCoapplicantValidator(yearsAtResidence),
  },
};

export const hasTradeIn: FieldInstruction<ButtonToggleConfig> = {
  Component: ButtonToggle,
  config: {
    labelText: "Has Trade In",
    validator: yup.boolean().required("Required"),
    initialValue: false,
    buttonConfigs: [
      { divClassName: "col-auto", value: false, text: "No" },
      { divClassName: "col-auto", value: true, text: "Yes" },
    ],
  },
};

/**
 * This hasCoapplicant checkbox is contrived and overly complex on purpose.
 * This is meant to show how flexible field generation can be.
 */
export const hasCoapplicant: FieldInstructionCreator<CheckboxConfig> = (
  formValues,
  fieldKit
) => {
  // Adding this "scolding" message really should be accomplished
  // through validation (or not at all 😉) but the Checkbox component
  // does not allow for a validation message.
  //
  // Doing it this way is meant to demonstrate that aspects of the field
  // config can be manipulated by any data within the fieldKit.
  let scolding: JSX.Element | string = "";
  if (
    fieldKit.errors.coapplicantFirstName &&
    fieldKit.touched.coapplicantFirstName
  ) {
    scolding = (
      <i style={{ color: "pink" }}> (do you really have a Co-Applicant...?)</i>
    );
  }

  const label = formValues?.hasCoapplicant
    ? "Remove Co-Applicant"
    : "Add Co-Applicant";

  return {
    Component: Checkbox,
    config: {
      labelText: (
        <span>
          {label}
          {scolding}
        </span>
      ),
      className: "col-12 mt-2",
      initialValue: false,
      validator: null,
    },
  };
};
