/**
 * Configuration definitions for form inputs.
 */

// TODO: updated `divClass` attributes to be responsive

export const firstName = {
  name: "firstName",
  id: "firstName",
  labelText: "First Name",
  type: "text",
  divClass: "col-5",
};

export const middleInitial = {
  name: "middleInitial",
  id: "middleInitial",
  labelText: "Middle Initial",
  type: "text",
  divClass: "col-2",
};

export const lastName = {
  name: "lastName",
  id: "lastName",
  labelText: "Last Name",
  type: "text",
  divClass: "col-5",
};

export const streetAddr = {
  name: "streetAddr",
  id: "streetAddr",
  labelText: "Street Address",
  type: "text",
  divClass: "col-10",
};

export const city = {
  name: "city",
  id: "city",
  labelText: "City",
  type: "text",
  divClass: "col-6",
};

export const state = {
  name: "state",
  id: "state",
  labelText: "State",
  type: "text",
  divClass: "col-2",
};

export const yearsAtResidence = {
  name: "yearsAtResidence",
  id: "yearsAtResidence",
  labelText: "Years At Residence",
  type: "number",
  divClass: "col-2",
  other: {
    min: "0",
    step: "1",
    max: "99",
    noValidate: true,
  },
};

export const vehicleMake = {
  name: "vehicleMake",
  id: "vehicleMake",
  labelText: "Vehicle Make",
  type: "select",
  divClass: "col-6",
  options: [
    { value: "", displayValue: "", disabled: true },
    { value: "make_1", displayValue: "Make 1" },
    { value: "make_2", displayValue: "Make 2" },
    { value: "make_3", displayValue: "Make 3" },
  ],
};

export const vehicleModel = {
  name: "vehicleModel",
  id: "vehicleModel",
  labelText: "Vehicle Model",
  type: "select",
  divClass: "col-6",
  options: [
    { value: "", displayValue: "", disabled: true },
    { value: "model_1", displayValue: "Model 1" },
    { value: "model_2", displayValue: "Model 2" },
    { value: "model_3", displayValue: "Model 3" },
  ],
};
