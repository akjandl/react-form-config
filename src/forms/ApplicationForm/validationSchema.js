import * as Yup from "yup";

/**
 * Validation schema used for Formik form validation.
 * The constructed Yup object should include a key for each input in the
 * related form. Keys of this object must match the `name` attribute of the
 * associated input.
 *
 * Note that inputs do not have to be required even though they have validation.
 */
export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  middleInitial: Yup.string().max(1, "Max 1 character"),
  lastName: Yup.string().required("Required"),
  streetAddr: Yup.string().required("Required").min(5, "Min 5 characters"),
  city: Yup.string().required("Required").min(5, "Min 5 characters"),
  state: Yup.string()
    .required("Required")
    .min(2, "Use 2 characters")
    .max(2, "Use 2 characters"),
  yearsAtResidence: Yup.number()
    .required("Required")
    .min(0, "Min 0")
    .max(99, "Max 99"),
  vehicleMake: Yup.string().required("Required"),
  vehicleModel: Yup.string().required("Required"),
});
