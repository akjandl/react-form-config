import React, { useState } from "react";

import ApplicationForm from "../../Forms/ApplicationForm/ApplicationForm";

const Application = () => {
  const [submittedValues, setSubmittedValues] = useState();

  const onSubmit = (values, _actions) => {
    setSubmittedValues(values);
  };

  return (
    <div className="container mt-3">
      <h3 className="display-6">Application</h3>
      <div className="row">
        <div className="col-10">
          <ApplicationForm onSubmit={onSubmit} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-10">
          <h5>
            {submittedValues ? (
              "Submitted Form Values"
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
