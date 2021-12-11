import * as yup from "yup";

export const buildSchemaFromConfigs = (inputConfigs) => {
  return yup.object().shape(
    inputConfigs.reduce((acc, inp) => {
      acc[inp.name] = inp.validator;
      return acc;
    }, {})
  );
};
