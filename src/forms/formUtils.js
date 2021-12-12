import * as yup from "yup";

export const initialValuesFromInputConfigs = (inputsArray) => {
  return inputsArray.reduce((acc, inputConfig) => {
    const inp =
      typeof inputConfig === "function" ? inputConfig({}) : inputConfig;
    acc[inp.name] = inp.initialValue || "";
    return acc;
  }, {});
};

export const mapFormikPropsToFieldProps = (formikProps) => {
  return {
    values: formikProps.values,
    errors: formikProps.errors,
    touched: formikProps.touched,
    handleChange: formikProps.handleChange,
    handleBlur: formikProps.handleBlur,
  };
};

export const keyFromInputConfig = (inputConfig) => {
  const cfg = typeof inputConfig === "function" ? inputConfig({}) : inputConfig;
  return cfg.id || cfg.name;
};

export const validationSchemaFromInputConfigs = (inputConfigs) => {
  return yup.lazy((formValues) => {
    return yup.object().shape(
      inputConfigs.reduce((acc, inp) => {
        acc[inp.name] =
          typeof inp.validator === "function"
            ? inp.validator(formValues)
            : inp.validator;
        return acc;
      }, {})
    );
  });
};