import * as yup from "yup";

import FormGroup from "../../components/FormGroup/FormGroup";
import FormHelper from "../../components/FormHelper/FormHelper";
import Input, { InputFieldConfig } from "../../components/Input/Input";
import { FieldKit, FormKit, FormValues, FormActions } from "../formUtils";
import {FieldConfigBundle, FieldConfigObject} from "../inputConfigs";
import {
  vehicleGroupInputs,
  applicantGroupInputs,
  coapplicantGroupInputs,
} from "../inputConfigs/formGroupConfigs";

const customInput: FieldConfigObject<InputFieldConfig> = {
  Component: Input,
  config: {
    name: "customInput",
    labelText: "Custom Input",
    inputType: "text",
    className: "col-5",
    validator: yup.string().required("Required"),
  }
};

const applicantInputs = { ...applicantGroupInputs, customInput, };
const vehicleInputs = { ...vehicleGroupInputs };
const coapplicantInputs = { ...coapplicantGroupInputs };

const formFieldConfigs: FieldConfigBundle = {
  ...vehicleInputs,
  ...applicantInputs,
  ...coapplicantInputs,
};

interface ApplicationFormProps {
  onSubmit: (values: FormValues, actions: FormActions) => void;
}

/**
 * A form composed from input configs.
 * A submit handler function is passed as a prop in order to separate
 * form rendering/validation logic from what is done with the form values after
 * they are submitted.
 */
const ApplicationForm = (props: ApplicationFormProps) => {
  return (
    <FormHelper
      fieldConfigs={formFieldConfigs}
      onSubmit={props.onSubmit}
      overrideDefaultInitialValues={{}}
    >
      {({
        fieldKit,
        formKit,
      }: {
        fieldKit: FieldKit;
        formKit: FormKit;
      }) => {
        return (
          <form onSubmit={formKit.handleSubmit}>
            <div className="row mt-3">
              <h3>Vehicle Info</h3>
              <FormGroup fieldConfigs={vehicleInputs} fieldKit={fieldKit} />
            </div>

            <div className="row mt-3">
              <h3>Principal Applicant</h3>
              <FormGroup
                fieldConfigs={applicantInputs}
                fieldKit={fieldKit}
              />
            </div>

            {fieldKit.values.hasCoapplicant && (
              <div className="row mt-3">
                <h3>Co-Applicant</h3>
                <FormGroup
                  fieldConfigs={coapplicantInputs}
                  fieldKit={fieldKit}
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
