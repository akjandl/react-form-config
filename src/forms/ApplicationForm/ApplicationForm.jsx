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
  coapplicantFirstName,
  coapplicantMiddleInitial,
  coapplicantLastName,
  coapplicantCity,
  coapplicantState,
  coapplicantStreetAddr,
  coapplicantYearsAtResidence,
} from "./inputConfigs";
import FormElement from "../../components/FormElement/FormElement";
import {
  initialValuesFromInputConfigs,
  keyFromInputConfig,
  mapFormikPropsToFieldProps,
  validationSchemaFromInputConfigs
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
  coapplicantFirstName,
  coapplicantMiddleInitial,
  coapplicantLastName,
  coapplicantStreetAddr,
  coapplicantCity,
  coapplicantState,
  coapplicantYearsAtResidence,
];

const coapplicantInputs = [
  coapplicantFirstName,
  coapplicantMiddleInitial,
  coapplicantLastName,
  coapplicantStreetAddr,
  coapplicantCity,
  coapplicantState,
  coapplicantYearsAtResidence,
];

/** array of all input configs to be rendered in the form. */
const inputsArray = [...vehicleInputs, ...applicantInputs, ...coapplicantInputs];

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
                  {coapplicantInputs.map((inputConfig) => {
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
