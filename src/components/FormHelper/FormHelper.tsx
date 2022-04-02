import { Formik } from "formik";

import {
  initialValuesFromFieldConfigs,
  validationSchemaFromFieldConfigs,
  mapFormikPropsToFieldKit,
  mapFormikPropsToFormKit,
  FormValues,
  FormActions,
} from "../../forms/formUtils";
import { FieldConfigBundle } from "../../forms/fieldConfigs";

interface FormHelperProps {
  fieldConfigs: FieldConfigBundle;
  onSubmit: (values: FormValues, actions: FormActions) => void | Promise<any>;
  children: React.ReactNode;
  overrideDefaultInitialValues?: FormValues;
  enableReinitialize?: boolean;
}

const FormHelper = (props: FormHelperProps) => {
  const defaultInitialValues = {
    ...initialValuesFromFieldConfigs(props.fieldConfigs),
  };
  const initialValues = {
    ...defaultInitialValues,
    ...props.overrideDefaultInitialValues,
  };

  const validationSchema = validationSchemaFromFieldConfigs(props.fieldConfigs);
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

export default FormHelper;
