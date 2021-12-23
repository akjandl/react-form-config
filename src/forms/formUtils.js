import * as yup from "yup";

const FALSY_INITIAL_VALUE_TYPES = ["boolean", "undefined"]

export const initialValuesFromInputConfigs = (inputsArray) => {
  return inputsArray.reduce((acc, inputConfig) => {
    const inp =
      typeof inputConfig === "function" ? inputConfig({}) : inputConfig;
    const value =
      FALSY_INITIAL_VALUE_TYPES.includes(typeof inp.initialValue)
        ? inp.initialValue
        : inp.initialValue || "";
    acc[inp.name] = value;
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
    setFieldValue: formikProps.setFieldValue,
    setFieldTouched: formikProps.setFieldTouched,
    setFieldError: formikProps.setFieldError,
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
