import * as yup from "yup";

import FieldGroup from "../../components/FieldGroup/FieldGroup";
import FormBuilder from "../../components/FormBuilder/FormBuilder";
import Input, { InputConfig } from "../../components/Input/Input";
import { FieldKit, FormKit, FormValues, FormActions } from "../formUtils";
import { FieldInstructionBundle, FieldInstruction } from "../fieldInstructions";
import {
  vehicleGroupInputs,
  applicantGroupInputs,
  coapplicantGroupInputs,
} from "../fieldInstructions/fieldInstructionBundles";

const customInput: FieldInstruction<InputConfig> = {
  Component: Input,
  config: {
    name: "customInput",
    labelText: <span className="text-warning">Customized Input</span>,
    inputType: "text",
    className: "col-12",
    placeholder: "adding a custom input to the principal applicant group",
    validator: yup.string().required("Required"),
  },
};

const applicantInputs = { ...applicantGroupInputs, customInput };
const vehicleInputs = { ...vehicleGroupInputs };
const coapplicantInputs = { ...coapplicantGroupInputs };

const fieldInstructionBundle: FieldInstructionBundle = {
  ...vehicleInputs,
  ...applicantInputs,
  ...coapplicantInputs,
};

interface ApplicationFormProps {
  onSubmit: (values: FormValues, actions: FormActions) => void;
}

/**
 * A form composed from field instructions.
 * A submit handler function is passed as a prop in order to separate
 * form rendering/validation logic from what is done with the form values after
 * they are submitted.
 */
const ApplicationForm = (props: ApplicationFormProps) => {
  return (
    <FormBuilder
      fieldInstructionBundle={fieldInstructionBundle}
      onSubmit={props.onSubmit}
      overrideDefaultInitialValues={{}}
    >
      {({ fieldKit, formKit }: { fieldKit: FieldKit; formKit: FormKit }) => {
        return (
          <form onSubmit={formKit.handleSubmit}>
            <div className="row mt-3">
              <h3>Vehicle Info</h3>
              <FieldGroup
                fieldInstructionBundle={vehicleInputs}
                fieldKit={fieldKit}
              />
            </div>

            <div className="row mt-3">
              <h3>Principal Applicant</h3>
              <FieldGroup
                fieldInstructionBundle={applicantInputs}
                fieldKit={fieldKit}
              />
            </div>

            {fieldKit.values.hasCoapplicant && (
              <div className="row mt-3">
                <h3>Co-Applicant</h3>
                <FieldGroup
                  fieldInstructionBundle={coapplicantInputs}
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
    </FormBuilder>
  );
};

export default ApplicationForm;
