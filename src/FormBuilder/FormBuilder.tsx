import { Formik } from "formik";

import {
  initialValuesFromFieldInstructionBundle,
  validationSchemaFromFieldInstructionBundle,
  mapFormikPropsToFieldKit,
  mapFormikPropsToFormKit,
} from "./formUtils";
import {
  FieldInstructionBundle,
  FormValues,
  FormActions,
  FieldKit,
  FormKit,
} from "../FormBuilder";

interface FormBuilderProps {
  fieldInstructionBundle: FieldInstructionBundle;
  onSubmit: (values: FormValues, actions: FormActions) => void | Promise<any>;
  children:
    | JSX.Element
    | (({
        fieldKit,
        formKit,
      }: {
        fieldKit: FieldKit;
        formKit: FormKit;
      }) => JSX.Element);
  enableReinitialize?: boolean;
  overrideDefaultInitialValues?: FormValues;
}

const FormBuilder = (props: FormBuilderProps) => {
  const defaultInitialValues = {
    ...initialValuesFromFieldInstructionBundle(props.fieldInstructionBundle),
  };
  const initialValues = {
    ...defaultInitialValues,
    ...props.overrideDefaultInitialValues,
  };

  const validationSchema = validationSchemaFromFieldInstructionBundle(
    props.fieldInstructionBundle
  );
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
              fieldKit: mapFormikPropsToFieldKit(formikProps),
              formKit: mapFormikPropsToFormKit(formikProps),
            })
          : props.children;
      }}
    </Formik>
  );
};

export default FormBuilder;
