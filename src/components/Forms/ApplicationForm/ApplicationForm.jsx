import React from "react";
import { Formik } from "formik";

import Input from "../../Input/Input";
import { firstName, lastName, streetAddr, city, state } from "./inputConfigs";
import { validationSchema } from "./validationSchema";

const applicationForm = (props) => {
  const { onSubmit } = props;
  const formInitValues = {
    firstName: "",
    lastName: "",
    streetAddr: "",
    city: "",
    state: "",
  };
  const inputsArray = [firstName, lastName, streetAddr, city, state];

  return (
    <Formik
      initialValues={formInitValues}
      onSubmit={onSubmit} // TODO: add a handler
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="row">
              {inputsArray.map((cfg) => {
                const inputName = cfg.name;
                return (
                  <Input
                    key={inputName}
                    inputConfig={cfg}
                    value={values[inputName]}
                    validationError={errors[inputName]}
                    touched={touched[inputName]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                );
              })}
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

export default applicationForm;
