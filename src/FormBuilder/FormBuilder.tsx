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
} from "./index";
import { FormBuilderProvider } from "./FormBuilderContext";

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
  validateOnMount?: boolean;
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
      validateOnMount={props.validateOnMount}
    >
      {(formikProps) => {
        const fieldKit = mapFormikPropsToFieldKit(formikProps);
        const formKit = mapFormikPropsToFormKit(formikProps);

        return (
          <FormBuilderProvider value={{ fieldKit, formKit }}>
            {
              typeof props.children === "function"
                ? props.children({ fieldKit, formKit })
                : props.children
            }
          </FormBuilderProvider>
        )
      }}
    </Formik>
  );
};

export default FormBuilder;
