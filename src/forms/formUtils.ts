import {
  FormikProps,
  FormikValues,
  FormikTouched,
  FormikHandlers,
  FormikHelpers,
} from "formik";
import * as yup from "yup";

import {
  FieldInstructionBundle,
  FieldInstructionAny,
  FieldConfig,
} from "./fieldInstructions";

const configFromFieldInstructionAny = <FC extends FieldConfig>(
  fieldInstructionAny: FieldInstructionAny
): FC => {
  if (typeof fieldInstructionAny === "function") {
    const noOpFieldKit = {
      values: {},
      errors: {},
      touched: {},
      handleChange: () => {},
      handleBlur: () => {},
      setFieldValue: () => {},
      setFieldTouched: () => {},
      setFieldError: () => {},
    };
    return fieldInstructionAny({}, noOpFieldKit).config;
  }
  return fieldInstructionAny.config;
};

export const initialValuesFromFieldInstructionBundle = (
  fieldsBundle: FieldInstructionBundle
) => {
  const allowFalsyInitialValueTypes = ["boolean", "number"];

  const fieldNames = Object.keys(fieldsBundle);
  return fieldNames.reduce((acc: { [key: string]: any }, fieldName) => {
    const inputConfig = fieldsBundle[fieldName];
    const config = configFromFieldInstructionAny(inputConfig);
    const value = allowFalsyInitialValueTypes.includes(
      typeof config.initialValue
    )
      ? config.initialValue
      : config.initialValue || "";
    acc[fieldName] = value;
    return acc;
  }, {});
};

export type FormValues = FormikValues;
export type FormActions = FormikHelpers<FormValues>;
type FieldKitErrors = { [K in keyof FormValues]: string };

export interface FieldKit {
  values: FormValues;
  errors: FieldKitErrors;
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
    errors: formikProps.errors as FieldKitErrors,
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

export const validationSchemaFromFieldInstructionBundle = (
  fieldInstructionBundle: FieldInstructionBundle
) => {
  return yup.lazy((formValues: FormValues) => {
    return yup.object().shape(
      Object.keys(fieldInstructionBundle).reduce(
        (acc: { [key: string]: yup.AnySchema }, fieldName: string) => {
          const config: FieldConfig = configFromFieldInstructionAny(
            fieldInstructionBundle[fieldName]
          );
          acc[fieldName] =
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
