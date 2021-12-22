import React from "react";

import {
  vehicleInputs,
  applicantInputs,
  coapplicantInputs,
} from "./inputConfigs";
import FormGroup from "../../components/FormGroup/FormGroup";
import FormHelper from "../../components/FormHelper/FormHelper";


/** array of all input configs to be rendered in the form. */
const inputsArray = [
  ...vehicleInputs,
  ...applicantInputs,
  ...coapplicantInputs,
];

/**
 * A form composed from input configs.
 * A submit handler function is passed into this component in order separate
 * form rendering/validation logic from what is done with the form values after
 * they are submitted.
 */
const ApplicationForm = (props) => {
  return (
    <FormHelper
      inputConfigs={inputsArray}
      onSubmit={props.onSubmit}
      overrideDefaultInitialValues={{}}
    >
      {({ fieldProps, formProps }) => {
        return (
          <form onSubmit={formProps.handleSubmit}>
            <div className="row mt-3">
              <h3>Vehicle Info</h3>
              <FormGroup inputConfigs={vehicleInputs} fieldProps={fieldProps} />
            </div>

            <div className="row mt-3">
              <h3>Principal Applicant</h3>
              <FormGroup
                inputConfigs={applicantInputs}
                fieldProps={fieldProps}
              />
            </div>

            {fieldProps.values.hasCoapplicant && (
              <div className="row mt-3">
                <h3>Co-Applicant</h3>
                <FormGroup
                  inputConfigs={coapplicantInputs}
                  fieldProps={fieldProps}
                />
              </div>
            )}

            <div className="row mt-3 justify-content-left">
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        );
      }}
    </FormHelper>
  );
};

export default ApplicationForm;
