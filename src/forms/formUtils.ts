import {
  FormikProps,
  FormikValues,
  FormikErrors,
  FormikTouched,
  FormikHandlers,
  FormikHelpers,
} from "formik";
import * as yup from "yup";

import {
  FieldConfigBundle,
  FieldConfigAny,
  FieldConfigObject,
} from "./inputConfigs";

const FALSY_INITIAL_VALUE_TYPES = ["boolean"];

const configObjectFromConfig = (
  fieldConfig: FieldConfigAny
): FieldConfigObject => {
  return typeof fieldConfig === "function" ? fieldConfig({}) : fieldConfig;
};

export const initialValuesFromFieldConfigs = (
  inputConfigs: FieldConfigBundle
) => {
  const inputsArray = Object.values(inputConfigs);
  return inputsArray.reduce((acc: { [key: string]: any }, inputConfig) => {
    const inp = configObjectFromConfig(inputConfig);
    const value = FALSY_INITIAL_VALUE_TYPES.includes(typeof inp.initialValue)
      ? inp.initialValue
      : inp.initialValue || "";
    acc[inp.name] = value;
    return acc;
  }, {});
};

export type FormValues = FormikValues;
export type FormActions = FormikHelpers<FormValues>;

export interface FieldKit {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  setFieldValue: FormikHelpers<FormValues>["setFieldValue"];
  setFieldTouched: FormikHelpers<FormValues>["setFieldTouched"];
  setFieldError: FormikHelpers<FormValues>["setFieldError"];
}

export const mapFormikPropsToFieldKit: (
  fp: FormikProps<FormValues>
) => FieldKit = (formikProps) => {
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

export const keyFromFieldConfig = (inputConfig: FieldConfigAny) => {
  const cfg = configObjectFromConfig(inputConfig);
  return cfg.id || cfg.name;
};

export const validationSchemaFromFieldConfigs = (
  fieldConfigs: FieldConfigBundle
) => {
  return yup.lazy((formValues: FormValues) => {
    return yup.object().shape(
      Object.values(fieldConfigs)
        .map((fieldConfig) => configObjectFromConfig(fieldConfig))
        .reduce(
          (
            acc: { [key: string]: yup.AnySchema },
            configObject: FieldConfigObject
          ) => {
            acc[configObject.name] =
              typeof configObject.validator === "function"
                ? configObject.validator(formValues)
                : configObject.validator ?? yup.mixed().optional();
            return acc;
          },
          {}
        )
    );
  });
};
