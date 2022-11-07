import { useState } from "react";
import { FormActions } from "../../FormBuilder/formUtils";

import ApplicationForm from "../../forms/ApplicationForm/ApplicationForm";
import { FormValues } from "../../FormBuilder/formUtils";

/**
 * Component to render form and ancillary elements related to the form.
 * A submit handler function is passed from this component into the form in
 * order to keep the form agnostic as to what is done with form values.
 */
const Application = () => {
  const [submittedValues, setSubmittedValues] = useState<
    FormValues | undefined
  >();

  const onSubmit = (values: FormValues, _actions: FormActions) => {
    setSubmittedValues(values);
  };

  return (
    <div className="container mt-3">
      <h3 className="display-6 text-decoration-underline">Application</h3>
      <div className="row">
        <div className="col-10">
          <ApplicationForm onSubmit={onSubmit} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-10">
          <h5>
            {submittedValues ? (
              <span className="text-muted">
                <i>Submitted Form Values</i>
              </span>
            ) : (
              <span className="text-muted font-italic">
                <i>Submit form to see values</i>
              </span>
            )}
          </h5>
          <pre
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(submittedValues, null, 2),
            }}
          ></pre>
        </div>
      </div>
    </div>
  );
};

export default Application;
