import {
  FormikValues,
  FormikTouched,
  FormikHandlers,
  FormikHelpers,
} from "formik";
import * as yup from "yup";

export interface FieldConfigBase {
  validator?: Validator;
  initialValue?: any;
  id?: string;
}

export interface FieldProps<FC extends FieldConfigBase> {
  fieldName: string;
  fieldConfig: FC;
  fieldKit: FieldKit;
  className?: string;
}

export type ConfigFromFieldComponent<C extends FieldComponent> =
  Parameters<C>[0]["fieldConfig"];

export type FieldComponent = (props: FieldProps<any>) => JSX.Element;

export interface FieldInstruction<C extends FieldComponent> {
  Component: C;
  config: ConfigFromFieldComponent<C>;
}

export type FieldInstructionCreator<C extends FieldComponent> = (
  formValues: FormValues,
  fieldKit: FieldKit
) => FieldInstruction<C>;

export type FieldInstructionAny =
  | FieldInstruction<any>
  | FieldInstructionCreator<any>;

export interface FieldInstructionBundle {
  [key: string]: FieldInstructionAny;
}

export type Validator =
  | yup.AnySchema
  | null
  | undefined
  | ((values: FormValues) => yup.AnySchema | null | undefined);

export type FormValues = FormikValues;
export type FormActions = FormikHelpers<FormValues>;
export type FieldKitErrors = { [K in keyof FormValues]: string };

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
