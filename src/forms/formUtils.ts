import {
  FormikProps,
  FormikValues,
  FormikErrors,
  FormikTouched,
  FormikHandlers,
  FormikHelpers,
} from "formik";
import * as yup from "yup";

import { FieldConfigBundle, FieldConfigAny, FieldConfig } from "./fieldConfigs";

const configFromFieldConfigAny = <FCP extends FieldConfig>(
  fieldConfig: FieldConfigAny
): FCP => {
  const configObj =
    typeof fieldConfig === "function" ? fieldConfig() : fieldConfig;
  return configObj.config;
};

export const initialValuesFromFieldConfigs = (
  inputConfigs: FieldConfigBundle
) => {
  const allowFalsyInitialValueTypes = ["boolean", "number"];

  const inputsArray = Object.values(inputConfigs);
  return inputsArray.reduce((acc: { [key: string]: any }, inputConfig) => {
    const config = configFromFieldConfigAny(inputConfig);
    const value = allowFalsyInitialValueTypes.includes(
      typeof config.initialValue
    )
      ? config.initialValue
      : config.initialValue || "";
    acc[config.name] = value;
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

export interface FormKit {
  handleSubmit: FormikHandlers["handleSubmit"];
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

export const mapFormikPropsToFormKit: (
  fp: FormikProps<FormValues>
) => FormKit = (formikProps) => {
  return {
    handleSubmit: formikProps.handleSubmit,
  };
};

export const keyFromFieldConfig = (inputConfig: FieldConfigAny) => {
  const config = configFromFieldConfigAny(inputConfig);
  return config.id || config.name;
};

export const validationSchemaFromFieldConfigs = (
  fieldConfigs: FieldConfigBundle
) => {
  return yup.lazy((formValues: FormValues) => {
    return yup.object().shape(
      Object.values(fieldConfigs)
        .map((fieldConfig) => configFromFieldConfigAny(fieldConfig))
        .reduce(
          (acc: { [key: string]: yup.AnySchema }, config: FieldConfig) => {
            acc[config.name] =
              typeof config.validator === "function"
                ? config.validator(formValues)
                : config.validator ?? yup.mixed().optional();
            return acc;
          },
          {}
        )
    );
  });
};
