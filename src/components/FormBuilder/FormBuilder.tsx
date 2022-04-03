import { Formik } from "formik";

import {
  initialValuesFromFieldInstructionBundle,
  validationSchemaFromFieldInstructionBundle,
  mapFormikPropsToFieldKit,
  mapFormikPropsToFormKit,
  FormValues,
  FormActions,
} from "../../forms/formUtils";
import { FieldInstructionBundle } from "../../forms/fieldInstructions";

interface FormHelperProps {
  fieldInstructionBundle: FieldInstructionBundle;
  onSubmit: (values: FormValues, actions: FormActions) => void | Promise<any>;
  children: React.ReactNode;
  overrideDefaultInitialValues?: FormValues;
  enableReinitialize?: boolean;
}

const FormBuilder = (props: FormHelperProps) => {
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
