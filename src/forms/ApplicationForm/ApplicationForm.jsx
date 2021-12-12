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
import FormElement from "../../components/FormElement/FormElement";
import {
  initialValuesFromInputConfigs,
  mapFormikPropsToFieldProps,
  keyFromInputConfig,
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

const buildCoapplicantValidator = (inputConfig) => {
  return (values) => {
    return values.hasCoapplicant ? inputConfig.validator : null;
  };
};
const coappInputs = [
  {
    ...firstName,
    name: "coapplicantFirstName",
    validator: buildCoapplicantValidator(firstName),
  },
  {
    ...middleInitial,
    name: "coapplicantMiddleInitial",
    validator: buildCoapplicantValidator(middleInitial),
  },
  {
    ...lastName,
    name: "coapplicantLastName",
    validator: buildCoapplicantValidator(lastName),
  },
  {
    ...streetAddr,
    name: "coapplicantStreetAddr",
    validator: buildCoapplicantValidator(streetAddr),
  },
  {
    ...city,
    name: "coapplicantCity",
    validator: buildCoapplicantValidator(city),
  },
  {
    ...state,
    name: "coapplicantState",
    validator: buildCoapplicantValidator(state),
  },
  {
    ...yearsAtResidence,
    name: "coapplicantYearsAtResidence",
    validator: buildCoapplicantValidator(yearsAtResidence),
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
                <FormElement
                  key={keyFromInputConfig(inputConfig)}
                  inputConfig={inputConfig}
                  fieldProps={fieldProps}
                />
              ))}
            </div>

            <div className="row">
              <h3>Principal Applicant</h3>
              {applicantInputs.map((inputConfig) => (
                <FormElement
                  key={keyFromInputConfig(inputConfig)}
                  inputConfig={inputConfig}
                  fieldProps={fieldProps}
                />
              ))}

              {formikProps.values.hasCoapplicant && (
                <React.Fragment>
                  <h3>Co-Applicant</h3>
                  {coappInputs.map((inputConfig) => {
                    return (
                      <FormElement
                        key={keyFromInputConfig(inputConfig)}
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
