import { Formik, FormikHandlers } from "formik";

import {
  initialValuesFromFieldConfigs,
  validationSchemaFromFieldConfigs,
  mapFormikPropsToFieldKit,
  FormValues,
  FormActions,
} from "../../forms/formUtils";
import { FieldConfigBundle } from "../../forms/inputConfigs";

export interface FormProps {
  handleSubmit: FormikHandlers["handleSubmit"];
}

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
              fieldProps: mapFormikPropsToFieldKit(formikProps),
              formProps: { handleSubmit: formikProps.handleSubmit },
            })
          : props.children;
      }}
    </Formik>
  );
};

export default FormHelper;
