import React from "react";
import { Formik } from "formik";

import {
  firstName,
  middleInitial,
  lastName,
  streetAddr,
  city,
  state,
  yearsAtResidence,
  vehicleMake,
  vehicleModel,
  hasCoapplicant,
} from "./inputConfigs";
import { validationSchemaFromInputConfigs } from "../formUtils";
import Field from "../../components/Field/Field";
import {
  initialValuesFromInputConfigs,
  mapFormikPropsToFieldProps,
  nameFromInputConfig,
} from "../formUtils";

const vehicleInputs = [vehicleMake, vehicleModel];

const applicantInputs = [
  firstName,
  middleInitial,
  lastName,
  streetAddr,
  city,
  state,
  yearsAtResidence,
  hasCoapplicant,
];

const buildCoappValidator = (inputName) => {
  return (values) => {
    return values.hasCoapplicant && inputName.validator;
  };
};
const coappInputs = [
  {
    ...firstName,
    name: "coapplicantFirstName",
    validator: buildCoappValidator(firstName),
  },
  {
    ...middleInitial,
    name: "coappMiddleInitial",
    validator: buildCoappValidator(middleInitial),
  },
  {
    ...lastName,
    name: "coapplicantLastName",
    validator: buildCoappValidator(lastName),
  },
  {
    ...streetAddr,
    name: "coappStreetAddr",
    validator: buildCoappValidator(streetAddr),
  },
  {
    ...city,
    name: "coappCity",
    validator: buildCoappValidator(city),
  },
  {
    ...state,
    name: "coappState",
    validator: buildCoappValidator(state),
  },
  {
    ...yearsAtResidence,
    name: "coappYearsAtResidence",
    validator: buildCoappValidator(yearsAtResidence),
  },
];

/** array of all input configs to be rendered in the form. */
const inputsArray = [...vehicleInputs, ...applicantInputs, ...coappInputs];

/**
 * A form composed from input configs.
 * A submit handler function is passed into this component in order separate
 * form rendering/validation logic from what is done with the form values after
 * they are submitted.
 */
const ApplicationForm = (props) => {
  const { onSubmit } = props;

  /** The initial form values. Keys must match the `name` attribute of inputs */
  const formInitValues = {
    ...initialValuesFromInputConfigs(inputsArray),
  };

  return (
    <Formik
      initialValues={formInitValues}
      onSubmit={onSubmit}
      validationSchema={validationSchemaFromInputConfigs(inputsArray)}
    >
      {(formikProps) => {
        const fieldProps = mapFormikPropsToFieldProps(formikProps);
        return (
          <form onSubmit={formikProps.handleSubmit}>

            <div className="row">
              <h3>Vehicle Info</h3>
              {vehicleInputs.map((inputConfig) => (
                <Field
                  key={nameFromInputConfig(inputConfig)}
                  inputConfig={inputConfig}
                  fieldProps={fieldProps}
                />
              ))}
            </div>

            <div className="row">
              <h3>Principal Applicant</h3>
              {applicantInputs.map((inputConfig) => (
                <Field
                  key={nameFromInputConfig(inputConfig)}
                  inputConfig={inputConfig}
                  fieldProps={fieldProps}
                />
              ))}

              {formikProps.values.hasCoapplicant && (
                <React.Fragment>
                  <h3>Co-Applicant</h3>
                  {coappInputs.map((inputConfig) => {
                    return (
                      <Field
                        key={nameFromInputConfig(inputConfig)}
                        inputConfig={inputConfig}
                        fieldProps={fieldProps}
                      />
                    );
                  })}
                </React.Fragment>
              )}

              <div className="col-12">
                <div className="row mt-3 justify-content-left">
                  <div className="col-auto">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ApplicationForm;
