import React from "react";
import { Formik } from "formik";

import {
  initialValuesFromInputConfigs,
  validationSchemaFromInputConfigs,
  mapFormikPropsToFieldProps,
} from "../../forms/formUtils";

const FormHelper = (props) => {
  const defaultInitialValues = {
    ...initialValuesFromInputConfigs(props.inputConfigs),
  };
  const initialValues = {
    ...defaultInitialValues,
    ...props.overrideDefaultInitialValues,
  };

  const validationSchema = validationSchemaFromInputConfigs(props.inputConfigs);
  const enableReinitialize = props.enableReinitialize || false;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {(formikProps) => {
        return typeof props.children === "function"
          ? props.children({
              fieldProps: mapFormikPropsToFieldProps(formikProps),
              formProps: { handleSubmit: formikProps.handleSubmit },
            })
          : props.children;
      }}
    </Formik>
  );
};

export default FormHelper;
