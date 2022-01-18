import FormGroup from "../../components/FormGroup/FormGroup";
import FormHelper, { FormProps } from "../../components/FormHelper/FormHelper";
import { FieldKit, FormValues, FormActions } from "../formUtils";
import {
  vehicleGroupInputs,
  applicantGroupInputs,
  coapplicantGroupInputs,
} from "../inputConfigs/formGroupConfigs";

const applicantInputs = { ...applicantGroupInputs };
const vehicleInputs = { ...vehicleGroupInputs };
const coapplicantInputs = { ...coapplicantGroupInputs };
const formFieldConfigs = {
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
        fieldProps,
        formProps,
      }: {
        fieldProps: FieldKit;
        formProps: FormProps;
      }) => {
        return (
          <form onSubmit={formProps.handleSubmit}>
            <div className="row mt-3">
              <h3>Vehicle Info</h3>
              <FormGroup fieldConfigs={vehicleInputs} fieldProps={fieldProps} />
            </div>

            <div className="row mt-3">
              <h3>Principal Applicant</h3>
              <FormGroup
                fieldConfigs={applicantInputs}
                fieldProps={fieldProps}
              />
            </div>

            {fieldProps.values.hasCoapplicant && (
              <div className="row mt-3">
                <h3>Co-Applicant</h3>
                <FormGroup
                  fieldConfigs={coapplicantInputs}
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
