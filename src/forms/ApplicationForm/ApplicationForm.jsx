import React from "react";
import { Formik } from "formik";

import Input from "../../components/Input/Input";
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
} from "./inputConfigs";
import { validationSchema } from "./validationSchema";

/**
 * A simple configuration of a form, defined by the inputs included.
 * A submit handler function is passed into this component in order separate
 * form rendering/validation logic from what is done with the form values after
 * they are submitted.
 */
const applicationForm = (props) => {
  const { onSubmit } = props;

  /** The initial form values. Keys must match the `name` attribute of inputs */
  const formInitValues = {
    vehicleMake: "",
    vehicleModel: "",
    firstName: "",
    middleInitial: "",
    lastName: "",
    streetAddr: "",
    city: "",
    state: "",
    yearsAtResidence: "",
  };

  /** Ordered array of input configs to be rendered in the form. */
  const inputsArray = [
    vehicleMake,
    vehicleModel,
    firstName,
    middleInitial,
    lastName,
    streetAddr,
    city,
    state,
    yearsAtResidence,
  ];

  return (
    <Formik
      initialValues={formInitValues}
      onSubmit={onSubmit}
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
